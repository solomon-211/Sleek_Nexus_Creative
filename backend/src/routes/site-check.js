import { Hono } from 'hono'

// GET /api/site-check?url=example.com
//
// The homepage "Network Test". Runs Google PageSpeed Insights (mobile,
// throttled network; speed, SEO, accessibility and best-practice checks) on a
// visitor's website, counts its pages, and returns a short report in plain
// language: scores, strengths, and the weaknesses SNC can fix.
// Calling Google from here keeps the API key out of the browser, and lets us
// cache results and rate-limit per visitor.

const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const CATEGORIES = ['performance', 'seo', 'accessibility', 'best-practices']
const RATE_LIMIT = 5             // checks
const RATE_WINDOW_SECONDS = 60   // per IP, per window
const CACHE_SECONDS = 6 * 60 * 60
const CACHE_VERSION = 'v2'
const FETCH_HEADERS = { 'User-Agent': 'Mozilla/5.0 (compatible; SNC-NetworkTest/1.0; +https://sleeknexuscreative.com)' }

// A slow 3G connection (~400 kbps) — the "worst common case" used for the
// download-time estimate. Plus ~1.5 s for DNS, connection and TLS set-up.
const SLOW_3G_BITS_PER_SECOND = 400_000
const SLOW_3G_SETUP_SECONDS = 1.5

// Weaknesses: Lighthouse finding → the problem and what it costs the business.
// Deliberately no how-to: the report says what's wrong, and SNC fixes it.
// Several findings share a label; each label is shown once.
const IMAGES = 'Oversized images make the page slow to open on mobile data'
const BLOCK  = 'Blocking files keep visitors staring at a blank screen'
const UNUSED = 'Visitors download code the page never uses'
const MINIFY = 'Uncompressed code makes every visit slower'
const SERVER = 'A slow server delays every single page'
const CACHE  = 'Returning visitors re-download the whole site every time'
const FONTS  = 'Text stays invisible while fonts load'
const THIRD  = 'Third-party scripts drag the page down'
const HEAVY  = 'The page overloads phones with too much work'
const LEGACY = 'Outdated code adds weight for every visitor'
const DOM    = 'An overbuilt page slows phones down'
const NAMES  = 'Buttons and links are unreadable to screen readers'
const TAP    = 'Buttons are too small to tap, frustrating phone users'
const DUPE   = 'Google may treat your pages as duplicates'

export const WEAKNESSES = {
  // Speed
  'render-blocking-resources': BLOCK, 'render-blocking-insight': BLOCK,
  'uses-optimized-images': IMAGES, 'modern-image-formats': IMAGES, 'image-delivery-insight': IMAGES, 'uses-responsive-images': IMAGES,
  'offscreen-images': 'Images load before visitors need them, wasting their data',
  'unused-javascript': UNUSED, 'unused-css-rules': UNUSED,
  'unminified-javascript': MINIFY, 'unminified-css': MINIFY,
  'uses-text-compression': 'Files travel uncompressed, wasting visitors\' data',
  'server-response-time': SERVER, 'document-latency-insight': SERVER,
  'total-byte-weight': 'The page is too heavy for mobile data',
  'uses-long-cache-ttl': CACHE, 'cache-insight': CACHE,
  'font-display': FONTS, 'font-display-insight': FONTS,
  'third-party-summary': THIRD, 'third-parties-insight': THIRD,
  'bootup-time': HEAVY, 'mainthread-work-breakdown': HEAVY,
  'legacy-javascript': LEGACY, 'legacy-javascript-insight': LEGACY,
  'redirects': 'Extra redirects delay the page before it even starts',
  'dom-size': DOM, 'dom-size-insight': DOM,
  'lcp-discovery-insight': 'The main image loads too late',
  // Google visibility
  'meta-description': 'No description in Google search results, so fewer people click',
  'document-title': 'No page title, so Google has little to show',
  'is-crawlable': 'Search engines are blocked from this page',
  'robots-txt': 'Errors in robots.txt can hide the site from Google',
  'crawlable-anchors': 'Google cannot follow some of the links',
  'link-text': 'Vague links like "click here" weaken search ranking',
  'image-alt': 'Images are invisible to Google and screen readers',
  'canonical': DUPE, 'hreflang': DUPE,
  'http-status-code': 'The page answers with an error',
  // Accessibility
  'color-contrast': 'Some text is hard to read',
  'target-size': TAP, 'tap-targets': TAP,
  'font-size': 'Text is too small to read on phones',
  'button-name': NAMES, 'link-name': NAMES,
  'html-has-lang': 'The page language is not declared',
  'label': 'Form fields have no labels',
  // Best practices
  'is-on-https': 'The site is not secure, so browsers warn visitors away',
  'viewport': 'The site is not built for phone screens',
  'errors-in-console': 'The page throws errors in the browser',
  'image-aspect-ratio': 'Images look stretched or squashed',
  'image-size-responsive': 'Images look blurry on phone screens',
  'deprecations': 'The site relies on outdated browser features',
}

// Strengths: passed check → what it means for the business, in priority order.
export const STRENGTHS = [
  ['is-on-https', 'Secure connection (HTTPS)'],
  ['viewport', 'Set up for phone screens'],
  ['is-crawlable', 'Google can find and index it'],
  ['document-title', 'Has a page title for search results'],
  ['meta-description', 'Has a description for Google'],
  ['font-size', 'Text is readable on phones'],
  ['image-alt', 'Images are described for Google and screen readers'],
  ['color-contrast', 'Text is easy to read'],
  ['uses-text-compression', 'Files are compressed for faster loading'],
  ['errors-in-console', 'No errors in the browser'],
  ['html-has-lang', 'Page language is declared'],
]

const CATEGORY_STRENGTHS = {
  performance: 'Loads fast on mobile networks',
  seo: 'Strong basics for Google search',
  accessibility: 'Accessible to people with disabilities',
  'best-practices': 'Built to modern web standards',
}

export function normalizeUrl(input) {
  let raw = String(input || '').trim()
  if (!raw) return null
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`
  let url
  try {
    url = new URL(raw)
  } catch {
    return null
  }
  const host = url.hostname.toLowerCase()
  // Public websites only: a real domain with a dot, no IP addresses or local
  // names, so the check can't be pointed at anything internal.
  if (!host.includes('.') || host.endsWith('.local') || host === 'localhost') return null
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.includes(':')) return null
  if (url.username || url.password) return null
  url.hash = ''
  return url.toString()
}

const round1 = (n) => Math.round(n * 10) / 10
const ASSET = /\.(jpe?g|png|gif|webp|svg|ico|pdf|zip|css|js|json|xml|txt|mp4|mp3|woff2?)(\?|$)/i

async function getText(url, ms = 8000) {
  try {
    const res = await fetch(url, { headers: FETCH_HEADERS, redirect: 'follow', signal: AbortSignal.timeout(ms) })
    if (!res.ok) return null
    return { text: await res.text(), url: res.url || url }
  } catch {
    return null
  }
}

const locs = (xml) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1])

// Business checks Google's test doesn't cover, read straight from the home
// page's HTML. Head checks (preview image, icon, business details,
// analytics) are always reliable. Content checks (WhatsApp, phone, social,
// privacy, copyright, heading) only run when the page's text is actually in
// the HTML: on sites that build their page with JavaScript the raw HTML is
// nearly empty, and flagging "no WhatsApp link" there would be untrue.
export function inspectSite(html, { hasSitemap, year = new Date().getUTCFullYear() } = {}) {
  const strengths = []
  const weaknesses = []
  const has = (re) => re.test(html)
  const head = (html.match(/<head[\s\S]*?<\/head>/i) || [''])[0]
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<head[\s\S]*?<\/head>/i, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const rendered = text.length >= 300

  if (has(/<meta[^>]+property=["']og:image["']/i)) strengths.push('Shows a preview image when shared on WhatsApp and Facebook')
  else weaknesses.push('Links shared on WhatsApp and Facebook show no preview image')

  if (!/<link[^>]+rel=["'][^"']*(icon|apple-touch-icon)[^"']*["']/i.test(head)) weaknesses.push('No browser tab icon, so the site looks unfinished')

  if (has(/application\/ld\+json[\s\S]*?"@type"\s*:\s*"(Organization|LocalBusiness|ProfessionalService|Corporation|Store|Restaurant|Hotel|MedicalBusiness|EducationalOrganization|NGO)"/i)) {
    strengths.push('Gives Google structured business details')
  } else {
    weaknesses.push('Google has no structured business details to show (logo, contacts, hours)')
  }

  if (!has(/googletagmanager\.com|google-analytics\.com|gtag\(|fbq\(|plausible\.io|clarity\.ms|matomo|umami|cloudflareinsights/i)) {
    weaknesses.push('No visitor analytics, so you cannot see who visits or what they do')
  }

  if (hasSitemap === false) weaknesses.push('No sitemap, so Google may miss some pages')

  if (rendered) {
    if (has(/wa\.me\/|api\.whatsapp\.com|whatsapp:\/\//i)) strengths.push('Customers can reach you on WhatsApp in one tap')
    else weaknesses.push('No one-tap WhatsApp contact for customers')

    if (!has(/href=["']tel:/i)) weaknesses.push('No tap-to-call phone number')

    if (!has(/href=["']mailto:/i) && !has(/<form\b/i)) weaknesses.push('No contact form or email link on the home page')

    if (has(/(facebook|instagram|linkedin|tiktok|youtube|twitter|x)\.com\//i)) strengths.push('Links to its social media profiles')
    else weaknesses.push('No links to social media profiles, which weakens trust')

    if (!has(/privacy/i)) weaknesses.push('No privacy policy, which weakens trust')

    const years = [...text.matchAll(/(?:©|&copy;|copyright)\s*(?:\d{4}\s*[-–]\s*)?(\d{4})/gi)].map((m) => Number(m[1]))
    if (years.length && Math.max(...years) < year - 1) {
      weaknesses.push(`The footer still says © ${Math.max(...years)}, so the site looks out of date`)
    }

    if (!has(/<h1\b/i)) weaknesses.push('The home page has no main heading for Google')
  }

  return { strengths, weaknesses }
}

// How many pages the site has: from its sitemap when it publishes one,
// otherwise the distinct pages its home page links to. Pass the home page if
// it has already been fetched, to save a request.
export async function countPages(siteUrl, prefetchedHome) {
  const origin = new URL(siteUrl).origin
  const robots = await getText(`${origin}/robots.txt`, 5000)
  const declared = robots ? [...robots.text.matchAll(/^\s*sitemap:\s*(\S+)/gim)].map((m) => m[1]) : []
  const candidates = [...new Set([...declared, `${origin}/sitemap.xml`, `${origin}/sitemap_index.xml`])].slice(0, 4)

  for (const sm of candidates) {
    const got = await getText(sm)
    if (!got || !/<(urlset|sitemapindex)/i.test(got.text)) continue
    if (/<sitemapindex/i.test(got.text)) {
      // A sitemap of sitemaps: add up the pages in the first few.
      const all = locs(got.text)
      const children = all.slice(0, 8)
      const parts = await Promise.all(children.map((c) => getText(c)))
      const pages = new Set(parts.flatMap((p) => (p ? locs(p.text) : [])))
      // Only the first few parts are read, so a bigger index is a minimum.
      if (pages.size) return { count: pages.size, source: 'sitemap', ...(all.length > children.length ? { atLeast: true } : {}) }
    } else {
      const pages = new Set(locs(got.text))
      if (pages.size) return { count: pages.size, source: 'sitemap' }
    }
  }

  const home = prefetchedHome === undefined ? await getText(siteUrl) : prefetchedHome
  if (!home) return null
  const base = new URL(home.url)
  const paths = new Set([base.pathname.replace(/\/$/, '') || '/'])
  for (const m of home.text.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"'#]+)["']/gi)) {
    const href = m[1].trim()
    if (/^(mailto|tel|javascript|whatsapp|sms):/i.test(href) || ASSET.test(href)) continue
    let u
    try { u = new URL(href, base) } catch { continue }
    if (u.hostname.replace(/^www\./, '') !== base.hostname.replace(/^www\./, '')) continue
    paths.add(u.pathname.replace(/\/$/, '') || '/')
  }
  return { count: paths.size, source: 'links' }
}

export function summarize(psi) {
  const lh = psi.lighthouseResult
  const audits = lh.audits || {}
  const cats = lh.categories || {}
  const num = (id) => audits[id]?.numericValue ?? null
  const score = (id) => (cats[id]?.score == null ? null : Math.round(cats[id].score * 100))
  const bytes = num('total-byte-weight')
  const lcp = num('largest-contentful-paint')
  const fcp = num('first-contentful-paint')

  // Which category each finding belongs to, so weaknesses can be ordered:
  // speed first (biggest time savings first), then Google, security, access.
  const categoryOf = {}
  for (const [cat, c] of Object.entries(cats)) for (const ref of c.auditRefs || []) categoryOf[ref.id] = cat
  const rank = { performance: 0, seo: 1, 'best-practices': 2, accessibility: 3 }

  const failing = Object.entries(audits)
    .filter(([id, a]) => WEAKNESSES[id] && a.score !== null && a.score !== undefined && a.score < 0.9 &&
      !['informative', 'notApplicable', 'manual'].includes(a.scoreDisplayMode))
    .map(([id, a]) => ({
      id,
      cat: rank[categoryOf[id]] ?? (id in { 'is-on-https': 1, viewport: 1 } ? -1 : 2),
      savings: a.details?.overallSavingsMs ?? a.metricSavings?.LCP ?? a.metricSavings?.FCP ?? 0,
    }))
    .sort((x, y) => x.cat - y.cat || y.savings - x.savings)
  const seen = new Set()
  const weaknesses = []
  for (const f of failing) {
    const issue = WEAKNESSES[f.id]
    if (seen.has(issue)) continue
    seen.add(issue)
    weaknesses.push(issue)
    if (weaknesses.length === 5) break
  }

  const strengths = []
  for (const [cat, label] of Object.entries(CATEGORY_STRENGTHS)) if (score(cat) >= 90) strengths.push(label)
  for (const [id, label] of STRENGTHS) {
    if (strengths.length >= 5) break
    if (audits[id]?.score === 1) strengths.push(label)
  }

  return {
    url: lh.finalDisplayedUrl || lh.finalUrl || lh.requestedUrl,
    score: score('performance') ?? 0,
    scores: { speed: score('performance'), seo: score('seo'), accessibility: score('accessibility'), bestPractices: score('best-practices') },
    // When the main content appears, on Google's simulated mobile network.
    visibleSeconds: lcp === null ? null : round1(lcp / 1000),
    firstPaintSeconds: fcp === null ? null : round1(fcp / 1000),
    pageMegabytes: bytes === null ? null : round1(bytes / 1_000_000),
    // Rough time just to download the page on a slow 3G connection.
    slow3gSeconds: bytes === null ? null : Math.round((bytes * 8) / SLOW_3G_BITS_PER_SECOND + SLOW_3G_SETUP_SECONDS),
    strengths: strengths.slice(0, 5),
    weaknesses,
  }
}

export const siteCheckRoute = new Hono()

siteCheckRoute.get('/', async (c) => {
  // 400 — missing or unusable address
  const url = normalizeUrl(c.req.query('url'))
  if (!url) {
    return c.json({ error: 'Enter a website address, like yourbusiness.com' }, 400)
  }

  // 200 — cached result (Workers Cache API; absent in tests and local dev)
  const cache = typeof caches !== 'undefined' ? caches.default : null
  const cacheKey = new Request(`https://site-check.cache/${CACHE_VERSION}/${encodeURIComponent(url)}`)
  if (cache) {
    const hit = await cache.match(cacheKey)
    if (hit) return c.json(await hit.json(), 200)
  }

  // 429 — per-IP rate limit (skipped gracefully if KV isn't bound)
  if (c.env.RATE_LIMIT_KV) {
    const ip = c.req.header('CF-Connecting-IP') || 'unknown'
    const key = `sitecheck:${ip}`
    const current = Number((await c.env.RATE_LIMIT_KV.get(key)) || 0)
    if (current >= RATE_LIMIT) {
      return c.json({ error: 'You have run a few checks already. Please try again in a minute.' }, 429,
        { 'Retry-After': String(RATE_WINDOW_SECONDS) })
    }
    await c.env.RATE_LIMIT_KV.put(key, String(current + 1), { expirationTtl: RATE_WINDOW_SECONDS })
  }

  const params = new URLSearchParams({ url, strategy: 'mobile' })
  for (const cat of CATEGORIES) params.append('category', cat)
  if (c.env.PAGESPEED_API_KEY) params.set('key', c.env.PAGESPEED_API_KEY)

  // Google's test and the page count run side by side.
  // Fetch the home page once: it feeds both the page count and the business checks.
  const homePromise = getText(url)
  const pagesPromise = homePromise.then((home) => countPages(url, home)).catch(() => null)
  let res
  try {
    res = await fetch(`${PSI_ENDPOINT}?${params}`, { signal: AbortSignal.timeout(60_000) })
  } catch {
    // 504 — Google took too long
    return c.json({ error: 'That website took too long to test. Please try again.' }, 504)
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const message = body?.error?.message || ''
    // 422 — Google couldn't open the site (doesn't exist, down, blocks bots)
    if (res.status === 400 || /FAILED_DOCUMENT_REQUEST|ERRORED_DOCUMENT_REQUEST|DNS_FAILURE|NO_FCP|unable to resolve/i.test(message)) {
      return c.json({ error: 'We could not open that website. Check the address and try again.' }, 422)
    }
    // 503 — out of quota, or Google is having trouble
    console.error('PageSpeed error', res.status, message)
    return c.json({ error: 'The test is busy right now. Please try again shortly.' }, 503)
  }

  const report = summarize(await res.json())
  const [pages, home] = await Promise.all([pagesPromise, homePromise])
  const site = home ? inspectSite(home.text, { hasSitemap: pages ? pages.source === 'sitemap' : undefined }) : { strengths: [], weaknesses: [] }
  const summary = {
    ...report,
    pages,
    // Google's findings first (worst first), then the business checks.
    strengths: [...report.strengths, ...site.strengths].slice(0, 6),
    weaknesses: [...report.weaknesses.slice(0, 4), ...site.weaknesses, ...report.weaknesses.slice(4)].slice(0, 9),
  }

  if (cache) {
    const toCache = new Response(JSON.stringify(summary), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': `public, max-age=${CACHE_SECONDS}` },
    })
    c.executionCtx?.waitUntil?.(cache.put(cacheKey, toCache))
  }

  return c.json(summary, 200)
})

siteCheckRoute.all('/', (c) => c.json({ error: 'Method not allowed' }, 405))
