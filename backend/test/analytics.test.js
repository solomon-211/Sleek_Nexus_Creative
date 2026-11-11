import { describe, it, expect, vi, beforeEach } from 'vitest'

const inserts = []
vi.mock('../src/lib/supabase.js', () => ({
  getSupabase: (env) => (env.SUPABASE_URL
    ? { from: (table) => ({ insert: async (row) => { inserts.push({ table, row }); return { error: null } } }) }
    : null),
}))

const { default: app } = await import('../src/index.js')
const { cleanPath, cleanReferrer } = await import('../src/routes/track.js')
const { deviceOf, isBot } = await import('../src/lib/analytics.js')

const env = { SUPABASE_URL: 'https://example.supabase.co', SUPABASE_SERVICE_ROLE_KEY: 'x', CORS_ORIGIN: 'https://sleeknexuscreative.com', PAGESPEED_API_KEY: 'k' }
const PHONE = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/131 Mobile Safari/537.36'
const LAPTOP = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131 Safari/537.36'

const track = (body, { ua = PHONE, country = 'SS' } = {}) => app.request('/api/track', {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain', 'User-Agent': ua, 'CF-IPCountry': country },
  body: typeof body === 'string' ? body : JSON.stringify(body),
}, env)

beforeEach(() => {
  inserts.length = 0
  vi.unstubAllGlobals()
})

describe('helpers', () => {
  it('keeps only the page path, never query strings or admin pages', () => {
    expect(cleanPath('/services/web-dev?utm_source=fb#top')).toBe('/services/web-dev')
    expect(cleanPath('/about/')).toBe('/about')
    expect(cleanPath('/')).toBe('/')
    expect(cleanPath('/admin')).toBeNull()
    expect(cleanPath('https://evil.example/')).toBeNull()
    expect(cleanPath('/' + 'x'.repeat(400))).toBeNull()
  })

  it('keeps only the referring site, and ignores our own site', () => {
    expect(cleanReferrer('https://www.google.com/search?q=juba+web+design')).toBe('google.com')
    expect(cleanReferrer('https://sleeknexuscreative.com/about')).toBeNull()
    expect(cleanReferrer('not a url')).toBeNull()
    expect(cleanReferrer('')).toBeNull()
  })

  it('tells devices and bots apart', () => {
    expect(deviceOf(PHONE)).toBe('mobile')
    expect(deviceOf(LAPTOP)).toBe('desktop')
    expect(deviceOf('Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)')).toBe('tablet')
    expect(isBot('Googlebot/2.1')).toBe(true)
    expect(isBot('Mozilla/5.0 Chrome-Lighthouse')).toBe(true)
    expect(isBot('')).toBe(true)
    expect(isBot(PHONE)).toBe(false)
  })
})

describe('POST /api/track', () => {
  it('records an anonymous page view', async () => {
    const res = await track({ path: '/services?x=1', ref: 'https://www.facebook.com/somepost' })
    expect(res.status).toBe(204)
    expect(inserts).toEqual([{ table: 'page_views', row: { path: '/services', referrer: 'facebook.com', country: 'SS', device: 'mobile' } }])
  })

  it('ignores bots, junk and admin pages, but always answers 204', async () => {
    for (const [body, opts] of [
      [{ path: '/' }, { ua: 'Googlebot/2.1' }],
      ['not json', {}],
      [{ path: '/admin' }, {}],
      [{ nope: true }, {}],
    ]) {
      expect((await track(body, opts)).status).toBe(204)
    }
    expect(inserts).toEqual([])
  })
})

describe('Network Test logging', () => {
  const psi = { lighthouseResult: { finalDisplayedUrl: 'https://www.shop.example/', categories: { performance: { score: 0.42, auditRefs: [] } }, audits: { 'meta-description': { score: 0, scoreDisplayMode: 'binary' } } } }

  it('records each test with its score, weaknesses and pages', async () => {
    vi.stubGlobal('fetch', vi.fn(async (u) => (String(u).startsWith('https://www.googleapis.com')
      ? new Response(JSON.stringify(psi))
      : new Response('nope', { status: 404 }))))
    const res = await app.request('/api/site-check?url=shop.example', { headers: { 'User-Agent': LAPTOP, 'CF-IPCountry': 'KE' } }, env)
    expect(res.status).toBe(200)
    const row = inserts.find((i) => i.table === 'site_checks')?.row
    expect(row).toMatchObject({ url: 'https://www.shop.example/', host: 'shop.example', score: 42, country: 'KE', cached: false })
    expect(row.weaknesses).toBeGreaterThan(0)
  })
})
