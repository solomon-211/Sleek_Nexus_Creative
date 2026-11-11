import { Hono } from 'hono'
import { isBot, deviceOf, countryOf, afterResponse, insertRow } from '../lib/analytics.js'

// POST /api/track — one anonymous page view from the public website.
//
// The site sends it with navigator.sendBeacon as text/plain (a "simple"
// request, so no CORS preflight), with a JSON body: { path, ref }.
// Stored: the page path, the referring site's domain, country and device.
// Not stored: IP address, full referrer URL, query strings, cookies.
// Always answers 204, whatever happens, so it never affects the visitor.

const MAX_BODY = 2000
const SITE_HOSTS = /(^|\.)sleeknexuscreative\.com$|\.workers\.dev$|^localhost$/i

export function cleanPath(path) {
  if (typeof path !== 'string' || !path.startsWith('/') || path.length > 300) return null
  const clean = path.split(/[?#]/)[0].replace(/\/{2,}/g, '/')
  if (clean.startsWith('/admin')) return null
  return clean.length > 1 ? clean.replace(/\/$/, '') : '/'
}

export function cleanReferrer(ref) {
  if (!ref || typeof ref !== 'string') return null
  try {
    const host = new URL(ref).hostname.replace(/^www\./, '').toLowerCase()
    return SITE_HOSTS.test(host) ? null : host.slice(0, 100)
  } catch {
    return null
  }
}

export const trackRoute = new Hono()

trackRoute.post('/', async (c) => {
  const ua = c.req.header('User-Agent') || ''
  if (isBot(ua)) return c.body(null, 204)

  const raw = await c.req.text().catch(() => '')
  if (!raw || raw.length > MAX_BODY) return c.body(null, 204)
  let body
  try { body = JSON.parse(raw) } catch { return c.body(null, 204) }

  const path = cleanPath(body?.path)
  if (!path) return c.body(null, 204)

  await afterResponse(c, insertRow(c.env, 'page_views', {
    path,
    referrer: cleanReferrer(body?.ref),
    country: countryOf(c),
    device: deviceOf(ua),
  }))
  return c.body(null, 204)
})

trackRoute.all('/', (c) => c.json({ error: 'Method not allowed' }, 405))
