import { describe, it, expect, vi, beforeEach } from 'vitest'

const insert = vi.fn()

vi.mock('../src/lib/supabase.js', () => ({
  getSupabase: (env) => (env.SUPABASE_URL ? { from: () => ({ insert }) } : null),
}))

const { default: app } = await import('../src/index.js')

const env = {
  SUPABASE_URL: 'https://example.supabase.co',
  SUPABASE_SERVICE_ROLE_KEY: 'test',
  CORS_ORIGIN: 'https://sleeknexuscreative.com',
}

const valid = {
  type: 'contact',
  name: 'Jane Doe',
  email: 'jane@example.com',
  message: 'We need a school management system.',
}

function post(body, { headers = {}, env: e = env } = {}) {
  return app.request(
    '/api/messages',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    },
    e,
  )
}

beforeEach(() => {
  insert.mockReset()
  insert.mockResolvedValue({ error: null })
  vi.unstubAllGlobals()
})

describe('POST /api/messages', () => {
  it('saves a valid submission', async () => {
    const res = await post(valid)
    expect(res.status).toBe(201)
    expect(await res.json()).toEqual({ ok: true, notified: false })
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({
      form_type: 'contact',
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: null,
    }))
  })

  it('rejects a missing email with the validation message', async () => {
    const res = await post({ ...valid, email: 'not-an-email' })
    expect(res.status).toBe(400)
    expect((await res.json()).error).toMatch(/valid email/i)
    expect(insert).not.toHaveBeenCalled()
  })

  it('rejects an unknown form type', async () => {
    const res = await post({ ...valid, type: 'newsletter' })
    expect(res.status).toBe(400)
  })

  it('rejects malformed JSON', async () => {
    const res = await post('{not json')
    expect(res.status).toBe(400)
  })

  it('rejects a non-JSON content type', async () => {
    const res = await post(valid, { headers: { 'Content-Type': 'text/plain' } })
    expect(res.status).toBe(415)
  })

  it('rejects an oversized body even without a Content-Length hint', async () => {
    const res = await post({ ...valid, message: 'x'.repeat(25_000) })
    expect(res.status).toBe(413)
    expect(insert).not.toHaveBeenCalled()
  })

  it('swallows honeypot submissions without saving or emailing', async () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    // A fake success, so the bot can't tell which field gave it away.
    const res = await post({ ...valid, website: 'http://spam.example' })
    expect(res.status).toBe(201)
    expect(await res.json()).toEqual({ ok: true, notified: true })
    expect(insert).not.toHaveBeenCalled()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('returns 503 when Supabase is not configured', async () => {
    const res = await post(valid, { env: { CORS_ORIGIN: env.CORS_ORIGIN } })
    expect(res.status).toBe(503)
  })

  it('returns 502 when the insert fails', async () => {
    insert.mockResolvedValue({ error: { message: 'boom' } })
    const res = await post(valid)
    expect(res.status).toBe(502)
  })

  it('enforces the per-IP rate limit when KV is bound', async () => {
    const store = new Map()
    const kv = {
      get: async (k) => store.get(k) ?? null,
      put: async (k, v) => { store.set(k, v) },
    }
    const limited = { ...env, RATE_LIMIT_KV: kv }
    for (let i = 0; i < 10; i++) {
      expect((await post(valid, { env: limited })).status).toBe(201)
    }
    const res = await post(valid, { env: limited })
    expect(res.status).toBe(429)
    expect(res.headers.get('Retry-After')).toBe('60')
  })
})

describe('lead notification', () => {
  const notifyEnv = {
    ...env,
    RESEND_API_KEY: 're_test',
    NOTIFY_TO: 'info@sleeknexuscreative.com',
    NOTIFY_FROM: 'SNC Website <noreply@sleeknexuscreative.com>',
  }

  it('emails the team after saving and reports notified: true', async () => {
    const fetchSpy = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }))
    vi.stubGlobal('fetch', fetchSpy)

    const res = await post({ ...valid, name: '<b>Jane</b>' }, { env: notifyEnv })
    expect(await res.json()).toEqual({ ok: true, notified: true })

    const [url, init] = fetchSpy.mock.calls[0]
    expect(url).toBe('https://api.resend.com/emails')
    const sent = JSON.parse(init.body)
    expect(sent.to).toEqual(['info@sleeknexuscreative.com'])
    expect(sent.reply_to).toBe('jane@example.com')
    // Visitor-supplied text must be escaped in the HTML body.
    expect(sent.html).toContain('&lt;b&gt;Jane&lt;/b&gt;')
    expect(sent.html).not.toContain('<b>Jane</b>')
  })

  it('still reports the save when the email provider fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')))
    const res = await post(valid, { env: notifyEnv })
    expect(res.status).toBe(201)
    expect(await res.json()).toEqual({ ok: true, notified: false })
  })
})

describe('routing', () => {
  it('answers the health check', async () => {
    const res = await app.request('/api/health', {}, env)
    expect(await res.json()).toEqual({ ok: true })
  })

  it('rejects other methods on /api/messages', async () => {
    const res = await app.request('/api/messages', { method: 'GET' }, env)
    expect(res.status).toBe(405)
  })

  it('only echoes CORS for allowed origins', async () => {
    const ok = await post(valid, { headers: { Origin: 'https://sleeknexuscreative.com' } })
    expect(ok.headers.get('Access-Control-Allow-Origin')).toBe('https://sleeknexuscreative.com')
    const bad = await post(valid, { headers: { Origin: 'https://evil.example' } })
    expect(bad.headers.get('Access-Control-Allow-Origin')).toBeNull()
  })
})
