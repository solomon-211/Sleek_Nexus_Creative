// Post-build step: bakes route-specific <head> content (title, meta, OG/Twitter tags,
// JSON-LD) into a real dist/<route>/index.html per page, using src/lib/seo-data.js —
// the exact same data the live React app feeds into <SEO> via react-helmet-async.
//
// Why: this app is a client-rendered SPA. Without this step every route serves the
// same static dist/index.html until JS runs, so crawlers/link-preview bots that don't
// execute JS (and some that do, before first paint) only ever see the homepage's title
// and description. GitHub Pages (the deploy target — see .github/workflows/deploy.yml)
// natively serves dist/<route>/index.html for a request to /<route>, so this alone is
// enough to fix it — no server, no SSR framework, no new runtime dependency.
//
// Tag-building logic here must stay in sync with src/components/ui/SEO.jsx — both take
// the same props and must produce equivalent tags.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pageSeo } from '../src/lib/seo-data.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST_DIR = join(__dirname, '..', 'dist')
const TEMPLATE_PATH = join(DIST_DIR, 'index.html')

const BASE_URL = 'https://sleeknexuscreative.com'
const DEFAULT_IMAGE = `${BASE_URL}/images/snc-logo.png`
const SITE_NAME = 'Sleek Nexus Creative'

const START_MARKER = '<!-- SEO:PAGE:START'
const END_MARKER = '<!-- SEO:PAGE:END -->'

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function jsonLdScript(obj) {
  // Guard against a literal "</script" inside a string value prematurely closing the tag.
  const json = JSON.stringify(obj).replace(/<\/script/gi, '<\\/script')
  return `    <script type="application/ld+json">${json}</script>`
}

function buildHeadBlock(seo) {
  const fullTitle = seo.title ? `${seo.title} | ${SITE_NAME}` : `${SITE_NAME} — Technology & Innovation for South Sudan`
  const url = seo.canonical ? `${BASE_URL}${seo.canonical}` : BASE_URL
  const image = seo.image || DEFAULT_IMAGE
  const alt = seo.imageAlt || seo.title || SITE_NAME

  const lines = [
    START_MARKER + ' -->',
    `    <title>${escapeAttr(fullTitle)}</title>`,
  ]
  if (seo.description) lines.push(`    <meta name="description" content="${escapeAttr(seo.description)}" />`)
  if (seo.keywords) lines.push(`    <meta name="keywords" content="${escapeAttr(seo.keywords)}" />`)
  lines.push(`    <link rel="canonical" href="${escapeAttr(url)}" />`)

  lines.push(
    '',
    '    <!-- Open Graph (Facebook, LinkedIn, WhatsApp previews) -->',
    `    <meta property="og:type" content="${escapeAttr(seo.type || 'website')}" />`,
    `    <meta property="og:site_name" content="${SITE_NAME}" />`,
    `    <meta property="og:title" content="${escapeAttr(fullTitle)}" />`,
  )
  if (seo.description) lines.push(`    <meta property="og:description" content="${escapeAttr(seo.description)}" />`)
  lines.push(
    `    <meta property="og:url" content="${escapeAttr(url)}" />`,
    `    <meta property="og:image" content="${escapeAttr(image)}" />`,
    `    <meta property="og:image:width" content="1200" />`,
    `    <meta property="og:image:height" content="630" />`,
    `    <meta property="og:image:alt" content="${escapeAttr(alt)}" />`,
    `    <meta property="og:locale" content="en_US" />`,
    '',
    '    <!-- Twitter / X Card -->',
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:site" content="@SNC" />`,
    `    <meta name="twitter:title" content="${escapeAttr(fullTitle)}" />`,
  )
  if (seo.description) lines.push(`    <meta name="twitter:description" content="${escapeAttr(seo.description)}" />`)
  lines.push(
    `    <meta name="twitter:image" content="${escapeAttr(image)}" />`,
    `    <meta name="twitter:image:alt" content="${escapeAttr(alt)}" />`,
  )

  if (seo.breadcrumbs?.length) {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        ...seo.breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 2, name: b.name, item: `${BASE_URL}${b.url}` })),
      ],
    }
    lines.push('', jsonLdScript(breadcrumbSchema))
  }

  if (seo.faq?.length) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: seo.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    }
    lines.push('', jsonLdScript(faqSchema))
  }

  if (seo.schema) {
    const schemas = Array.isArray(seo.schema) ? seo.schema : [seo.schema]
    lines.push('')
    for (const s of schemas) lines.push(jsonLdScript(s))
  }

  lines.push('    ' + END_MARKER)
  return lines.join('\n')
}

function outputPathFor(route) {
  if (route === '/') return join(DIST_DIR, 'index.html')
  const segments = route.split('/').filter(Boolean)
  const dir = join(DIST_DIR, ...segments)
  return join(dir, 'index.html')
}

function run() {
  let template
  try {
    template = readFileSync(TEMPLATE_PATH, 'utf8')
  } catch {
    console.error(`[generate-seo-html] Could not read ${TEMPLATE_PATH} — run "vite build" first.`)
    process.exit(1)
  }

  const startIdx = template.indexOf(START_MARKER)
  const endIdx = template.indexOf(END_MARKER)
  if (startIdx === -1 || endIdx === -1) {
    console.error('[generate-seo-html] SEO:PAGE:START/END markers not found in dist/index.html — check index.html.')
    process.exit(1)
  }
  const before = template.slice(0, startIdx)
  const after = template.slice(endIdx + END_MARKER.length)

  const routes = Object.keys(pageSeo)
  for (const route of routes) {
    const seo = pageSeo[route]
    const headBlock = buildHeadBlock(seo)
    const html = before + headBlock + after
    const outPath = outputPathFor(route)
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, html)
  }

  console.log(`[generate-seo-html] Generated ${routes.length} static HTML files with page-specific SEO:`)
  for (const route of routes) console.log(`  ${route === '/' ? '/' : route} -> dist${outputPathFor(route).slice(DIST_DIR.length).replace(/\\/g, '/')}`)
}

run()
