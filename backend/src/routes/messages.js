import { Hono } from 'hono'
import { z } from 'zod'
import { getSupabase } from '../lib/supabase.js'
import { notifyTeam } from '../lib/notify.js'

const schema = z.object({
  type:     z.enum(['contact', 'get_started']),
  name:     z.string().trim().min(2, 'Full name is required').max(200),
  email:    z.string().trim().email('A valid email is required').max(200),
  phone:    z.string().trim().max(50).optional().or(z.literal('')),
  company:  z.string().trim().max(200).optional().or(z.literal('')),
  service:  z.string().trim().max(200).optional().or(z.literal('')),
  budget:   z.string().trim().max(100).optional().or(z.literal('')),
  timeline: z.string().trim().max(100).optional().or(z.literal('')),
  message:  z.string().trim().min(10, 'Message must be at least 10 characters').max(5000),
  // Honeypot — a hidden field real visitors never fill in. Any value here
  // means the submission came from a bot. Deliberately NOT validated as
  // empty here: a 400 would tell the bot which field gave it away. The
  // handler below answers a filled honeypot with a fake success instead.
  website:  z.string().max(2000).optional(),
})

const MAX_BODY_BYTES     = 20_000
const RATE_LIMIT         = 10  // requests
const RATE_WINDOW_SECONDS = 60 // per IP, per window

export const messagesRoute = new Hono()

messagesRoute.post('/', async (c) => {
  // 415 — wrong content type
  const contentType = c.req.header('content-type') || ''
  if (!contentType.includes('application/json')) {
    return c.json({ error: 'Content-Type must be application/json' }, 415)
  }

  // 413 — body too large
  const contentLength = Number(c.req.header('content-length') || 0)
  if (contentLength > MAX_BODY_BYTES) {
    return c.json({ error: 'Request body too large' }, 413)
  }

  // 503 — backend not configured yet (missing Supabase secrets)
  const supabase = getSupabase(c.env)
  if (!supabase) {
    return c.json({ error: 'Service temporarily unavailable' }, 503)
  }

  // 429 — per-IP rate limit (skipped gracefully if KV isn't bound)
  if (c.env.RATE_LIMIT_KV) {
    const ip = c.req.header('CF-Connecting-IP') || 'unknown'
    const key = `ratelimit:${ip}`
    const current = Number((await c.env.RATE_LIMIT_KV.get(key)) || 0)
    if (current >= RATE_LIMIT) {
      return c.json(
        { error: 'Too many requests — please try again in a minute' },
        429,
        { 'Retry-After': String(RATE_WINDOW_SECONDS) }
      )
    }
    await c.env.RATE_LIMIT_KV.put(key, String(current + 1), { expirationTtl: RATE_WINDOW_SECONDS })
  }

  // 413 again, on the real payload — Content-Length is client-supplied and
  // absent on chunked requests, so the header check above is only a fast path.
  const raw = await c.req.text()
  if (raw.length > MAX_BODY_BYTES) {
    return c.json({ error: 'Request body too large' }, 413)
  }

  // 400 — malformed JSON
  let body
  try {
    body = JSON.parse(raw)
  } catch {
    return c.json({ error: 'Malformed JSON body' }, 400)
  }

  // 400 — failed validation
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return c.json({ error: parsed.error.issues[0]?.message || 'Invalid submission' }, 400)
  }

  const { type, name, email, phone, company, service, budget, timeline, message, website } = parsed.data

  // Honeypot tripped — pretend success so bots don't learn to adapt.
  // `notified: true` also stops the frontend from firing its own fallback
  // email for this submission.
  if (website) return c.json({ ok: true, notified: true }, 201)

  const { error } = await supabase.from('messages').insert({
    form_type: type,
    name,
    email,
    phone:    phone || null,
    company:  company || null,
    service:  service || null,
    budget:   budget || null,
    timeline: timeline || null,
    message,
  })

  // 502 — upstream (Supabase) failure
  if (error) {
    console.error('Supabase insert failed:', error)
    return c.json({ error: 'Could not save your message right now — please try again shortly' }, 502)
  }

  // Saved. Now alert the team — `notified` tells the frontend whether it
  // still needs to send its own fallback email (false when Resend isn't
  // configured yet, or rejected the send).
  const notified = await notifyTeam(c.env, { type, name, email, phone, company, service, budget, timeline, message })

  // 201 — created
  return c.json({ ok: true, notified }, 201)
})

// 405 — any other method on this path
messagesRoute.all('/', (c) => c.json({ error: 'Method not allowed' }, 405))
