import { describe, it, expect, vi, beforeEach } from 'vitest'
import { normalizeUrl, summarize, countPages, inspectSite } from '../src/routes/site-check.js'

const { default: app } = await import('../src/index.js')

const env = { CORS_ORIGIN: 'https://sleeknexuscreative.com', PAGESPEED_API_KEY: 'test-key' }

const opp = (score, ms) => ({ score, scoreDisplayMode: 'metricSavings', details: { type: 'opportunity', overallSavingsMs: ms } })
const bin = (score) => ({ score, scoreDisplayMode: 'binary' })

// A trimmed-down PageSpeed Insights response with the fields we read.
const psi = {
  lighthouseResult: {
    finalDisplayedUrl: 'https://slow-shop.example/',
    categories: {
      performance:      { score: 0.31, auditRefs: [{ id: 'render-blocking-resources' }, { id: 'uses-optimized-images' }, { id: 'modern-image-formats' }, { id: 'unused-javascript' }, { id: 'uses-text-compression' }] },
      seo:              { score: 0.92, auditRefs: [{ id: 'meta-description' }, { id: 'document-title' }, { id: 'is-crawlable' }] },
      accessibility:    { score: 0.78, auditRefs: [{ id: 'color-contrast' }, { id: 'font-size' }] },
      'best-practices': { score: 0.96, auditRefs: [{ id: 'is-on-https' }, { id: 'errors-in-console' }] },
    },
    audits: {
      'largest-contentful-paint': { numericValue: 14200 },
      'first-contentful-paint':   { numericValue: 5100 },
      'total-byte-weight':        { numericValue: 4_800_000 },
      'render-blocking-resources': opp(0.2, 2400),
      'uses-optimized-images':     opp(0.1, 5200),
      'modern-image-formats':      opp(0.3, 1000),
      'unused-javascript':         opp(0.4, 1800),
      'uses-text-compression':     opp(1, 0),
      'meta-description': bin(0),
      'document-title':   bin(1),
      'is-crawlable':     bin(1),
      'color-contrast':   bin(0),
      'font-size':        bin(1),
      'is-on-https':      bin(1),
      'errors-in-console': bin(1),
      'diagnostics': { score: null, scoreDisplayMode: 'informative' },
    },
  },
}

// Fake web: routes by URL so Google, robots.txt, sitemaps and pages can differ.
function web(routes) {
  return vi.fn(async (input) => {
    const url = String(input)
    for (const [match, respond] of routes) {
      if (url.startsWith(match)) return typeof respond === 'function' ? respond(url) : new Response(respond.body, { status: respond.status || 200 })
    }
    return new Response('not found', { status: 404 })
  })
}
const PSI = 'https://www.googleapis.com/pagespeedonline'
const psiOk = [PSI, { body: JSON.stringify(psi) }]

const check = (q, e = env) => app.request(`/api/site-check${q}`, {}, e)

beforeEach(() => {
  vi.unstubAllGlobals()
})

describe('normalizeUrl', () => {
  it('adds https:// and keeps real domains', () => {
    expect(normalizeUrl('mybusiness.com')).toBe('https://mybusiness.com/')
    expect(normalizeUrl('http://shop.example.org/page#top')).toBe('http://shop.example.org/page')
  })
  it('rejects internal, local and malformed addresses', () => {
    for (const bad of ['', 'localhost', 'http://localhost:3000', '192.168.1.1', 'http://10.0.0.5', 'printer.local', 'not a url', 'https://user:pw@site.com']) {
      expect(normalizeUrl(bad)).toBeNull()
    }
  })
})

describe('summarize', () => {
  const s = summarize(psi)

  it('reports speed figures and the four category scores', () => {
    expect(s).toMatchObject({ url: 'https://slow-shop.example/', score: 31, visibleSeconds: 14.2, firstPaintSeconds: 5.1, pageMegabytes: 4.8, slow3gSeconds: 98 })
    expect(s.scores).toEqual({ speed: 31, seo: 92, accessibility: 78, bestPractices: 96 })
  })

  it('lists weaknesses, speed first by time saved, each label once, with no how-to', () => {
    expect(s.weaknesses).toEqual([
      'Oversized images make the page slow to open on mobile data',
      'Blocking files keep visitors staring at a blank screen',
      'Visitors download code the page never uses',
      'No description in Google search results, so fewer people click',
      'Some text is hard to read',
    ])
  })

  it('does not report speed fine-tuning as weaknesses on a site that is already fast', () => {
    const fast = structuredClone(psi)
    fast.lighthouseResult.categories.performance.score = 0.95
    expect(summarize(fast).weaknesses).toEqual([
      'No description in Google search results, so fewer people click',
      'Some text is hard to read',
    ])
  })

  it('lists strengths: strong categories first, then passed checks', () => {
    expect(s.strengths).toEqual([
      'Strong basics for Google search',
      'Built to modern web standards',
      'Secure connection (HTTPS)',
      'Google can find and index it',
      'Has a page title for search results',
    ])
  })
})

describe('inspectSite', () => {
  const bare = '<html><head><title>Shop</title></head><body><h2>Welcome</h2><p>We help families find the right school and apply online. We help families find the right school and apply online. We help families find the right school and apply online. We help families find the right school and apply online. We help families find the right school and apply online. We help families find the right school and apply online. We help families find the right school and apply online. We help families find the right school and apply online. </p><p>© 2021 Shop</p></body></html>'
  const good = `<html><head>
      <link rel="icon" href="/favicon.png">
      <meta property="og:image" content="/share.jpg">
      <script type="application/ld+json">{"@context":"https://schema.org","@type":"LocalBusiness","name":"Shop"}</script>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-1"></script>
    </head><body><h1>Shop</h1><p>We help families find the right school and apply online. We help families find the right school and apply online. We help families find the right school and apply online. We help families find the right school and apply online. We help families find the right school and apply online. We help families find the right school and apply online. We help families find the right school and apply online. We help families find the right school and apply online. </p>
      <a href="https://wa.me/211900000000">WhatsApp</a> <a href="tel:+211900000000">Call</a>
      <a href="mailto:hi@shop.example">Email</a> <a href="https://instagram.com/shop">Instagram</a>
      <a href="/privacy">Privacy</a> <p>© 2026 Shop</p></body></html>`

  it('flags the business gaps on a basic site', () => {
    const r = inspectSite(bare, { hasSitemap: false, year: 2026 })
    expect(r.strengths).toEqual([])
    expect(r.weaknesses).toEqual([
      'Links shared on WhatsApp and Facebook show no preview image',
      'No browser tab icon, so the site looks unfinished',
      'Google has no structured business details to show (logo, contacts, hours)',
      'No visitor analytics, so you cannot see who visits or what they do',
      'No sitemap, so Google may miss some pages',
      'No one-tap WhatsApp contact for customers',
      'No tap-to-call phone number',
      'No contact form or email link on the home page',
      'No links to social media profiles, which weakens trust',
      'No privacy policy, which weakens trust',
      'The footer still says © 2021, so the site looks out of date',
      'The home page has no main heading for Google',
    ])
  })

  it('credits a site that gets them right', () => {
    const r = inspectSite(good, { hasSitemap: true, year: 2026 })
    expect(r.weaknesses).toEqual([])
    expect(r.strengths).toEqual([
      'Shows a preview image when shared on WhatsApp and Facebook',
      'Gives Google structured business details',
      'Customers can reach you on WhatsApp in one tap',
      'Links to its social media profiles',
    ])
  })

  it('skips content checks on pages built by JavaScript, where they would be untrue', () => {
    const spa = '<html><head><link rel="icon" href="/i.png"><meta property="og:image" content="/s.jpg"></head><body><div id="root"></div><script src="/app.js"></script></body></html>'
    const r = inspectSite(spa, { hasSitemap: true, year: 2026 })
    expect(r.weaknesses).toEqual([
      'Google has no structured business details to show (logo, contacts, hours)',
      'No visitor analytics, so you cannot see who visits or what they do',
    ])
  })
})

describe('countPages', () => {
  it('counts pages from the sitemap declared in robots.txt', async () => {
    vi.stubGlobal('fetch', web([
      ['https://shop.example/robots.txt', { body: 'User-agent: *\nSitemap: https://shop.example/pages.xml' }],
      ['https://shop.example/pages.xml', { body: '<urlset><url><loc>https://shop.example/</loc></url><url><loc>https://shop.example/about</loc></url><url><loc>https://shop.example/menu</loc></url></urlset>' }],
    ]))
    expect(await countPages('https://shop.example/')).toEqual({ count: 3, source: 'sitemap' })
  })

  it('adds up a sitemap index', async () => {
    vi.stubGlobal('fetch', web([
      ['https://big.example/sitemap.xml', { body: '<sitemapindex><sitemap><loc>https://big.example/a.xml</loc></sitemap><sitemap><loc>https://big.example/b.xml</loc></sitemap></sitemapindex>' }],
      ['https://big.example/a.xml', { body: '<urlset><url><loc>https://big.example/1</loc></url><url><loc>https://big.example/2</loc></url></urlset>' }],
      ['https://big.example/b.xml', { body: '<urlset><url><loc>https://big.example/3</loc></url></urlset>' }],
    ]))
    expect(await countPages('https://big.example/')).toEqual({ count: 3, source: 'sitemap' })
  })

  it('falls back to the pages the home page links to', async () => {
    vi.stubGlobal('fetch', web([
      ['https://tiny.example/', (url) => url === 'https://tiny.example/'
        ? new Response('<a href="/about">About</a><a href="/about/">About</a><a href="contact">C</a><a href="https://other.example/x">X</a><a href="/logo.png">L</a><a href="mailto:a@b.c">M</a><a href="#top">T</a>')
        : new Response('nope', { status: 404 })],
    ]))
    // Home, /about and /contact. External links, files, email and anchors are ignored.
    expect(await countPages('https://tiny.example/')).toEqual({ count: 3, source: 'links' })
  })
})

describe('GET /api/site-check', () => {
  it('400s without a usable address', async () => {
    expect((await check('')).status).toBe(400)
    expect((await check('?url=localhost')).status).toBe(400)
  })

  it('asks Google for all four categories on mobile, and adds the page count', async () => {
    const fetchMock = web([psiOk, ['https://slow-shop.example/sitemap.xml', { body: '<urlset><url><loc>https://slow-shop.example/</loc></url><url><loc>https://slow-shop.example/shop</loc></url></urlset>' }]])
    vi.stubGlobal('fetch', fetchMock)
    const res = await check('?url=slow-shop.example')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.score).toBe(31)
    expect(body.pages).toEqual({ count: 2, source: 'sitemap' })
    const called = new URL(fetchMock.mock.calls.find(([u]) => String(u).startsWith(PSI))[0])
    expect(called.searchParams.get('url')).toBe('https://slow-shop.example/')
    expect(called.searchParams.get('strategy')).toBe('mobile')
    expect(called.searchParams.getAll('category')).toEqual(['performance', 'seo', 'accessibility', 'best-practices'])
    expect(called.searchParams.get('key')).toBe('test-key')
  })

  it('still answers when the pages cannot be counted', async () => {
    vi.stubGlobal('fetch', web([psiOk]))
    const res = await check('?url=slow-shop.example')
    expect(res.status).toBe(200)
    expect((await res.json()).pages).toBeNull()
  })

  it('422s when Google cannot open the site', async () => {
    vi.stubGlobal('fetch', web([[PSI, { status: 500, body: JSON.stringify({ error: { message: 'Lighthouse returned error: FAILED_DOCUMENT_REQUEST' } }) }]]))
    expect((await check('?url=does-not-exist.example')).status).toBe(422)
  })

  it('503s when Google is out of quota', async () => {
    vi.stubGlobal('fetch', web([[PSI, { status: 429, body: JSON.stringify({ error: { message: 'Quota exceeded' } }) }]]))
    expect((await check('?url=example.com')).status).toBe(503)
  })

  it('rate-limits per visitor when KV is bound', async () => {
    vi.stubGlobal('fetch', web([psiOk]))
    const store = new Map()
    const kv = { get: async (k) => store.get(k) ?? null, put: async (k, v) => { store.set(k, v) } }
    const e = { ...env, RATE_LIMIT_KV: kv }
    for (let i = 0; i < 5; i++) expect((await check('?url=example.com', e)).status).toBe(200)
    expect((await check('?url=example.com', e)).status).toBe(429)
  })
})
