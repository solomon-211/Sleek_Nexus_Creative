// What the site search can find. Built from the same data the pages use —
// SEO descriptions, FAQ answers, live products — so it stays current as
// that content changes, with no separate list to maintain.

import { pageSeo } from './seo-data'
import { liveProducts } from './work-data'

// Friendly names and icons for each route; descriptions come from seo-data.
const PAGES = [
  { to: '/',                     title: 'Home',                     icon: 'fa-house',            group: 'Pages' },
  { to: '/about',                title: 'About Us',                 icon: 'fa-circle-info',      group: 'Pages' },
  { to: '/services',             title: 'All Services & Packages',  icon: 'fa-layer-group',      group: 'Pages' },
  { to: '/work',                 title: 'Our Work',                 icon: 'fa-briefcase',        group: 'Pages' },
  { to: '/innovation-hub',       title: 'Innovation Hub',           icon: 'fa-lightbulb',        group: 'Pages' },
  { to: '/get-started',          title: 'Start a Project',          icon: 'fa-paper-plane',      group: 'Pages' },
  { to: '/contact',              title: 'Contact Us',               icon: 'fa-envelope',         group: 'Pages' },
  { to: '/services/web-dev',     title: 'Web Development',          icon: 'fa-code',             group: 'Services' },
  { to: '/services/mobile-apps', title: 'Mobile App Development',   icon: 'fa-mobile-screen',    group: 'Services' },
  { to: '/services/ui-ux',       title: 'UI/UX Design',             icon: 'fa-pencil-ruler',     group: 'Services' },
  { to: '/services/branding',    title: 'Branding & Identity',      icon: 'fa-palette',          group: 'Services' },
  { to: '/services/consulting',  title: 'IT Consulting',            icon: 'fa-laptop-code',      group: 'Services' },
  { to: '/services#edtech',      title: 'Educational Technology',   icon: 'fa-graduation-cap',   group: 'Services', desc: 'Learning platforms, course delivery, and student records for schools and training programmes.' },
  { to: '/privacy',              title: 'Privacy Policy',           icon: 'fa-shield-halved',    group: 'Pages' },
  { to: '/terms',                title: 'Terms of Service',         icon: 'fa-file-contract',    group: 'Pages' },
]

export const searchIndex = [
  ...PAGES.map((p) => {
    const seo = pageSeo[p.to.split('#')[0]] || {}
    return { ...p, desc: p.desc || seo.description || '', keywords: seo.keywords || '' }
  }),
  ...liveProducts.map((p) => ({
    title: p.title,
    desc: p.short,
    keywords: `${p.sector} ${p.tagline} live product platform`,
    icon: p.icon,
    group: 'Live Products',
    href: p.url,
  })),
  ...Object.entries(pageSeo).flatMap(([route, seo]) =>
    (seo.faq || []).map(({ q, a }) => ({ title: q, desc: a, keywords: '', icon: 'fa-circle-question', group: 'Questions', to: route })),
  ),
]

// Every word typed must appear somewhere; title hits rank above description hits.
export function search(query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return []
  return searchIndex
    .map((item) => {
      const title = item.title.toLowerCase()
      const body = `${item.desc} ${item.keywords}`.toLowerCase()
      let score = 0
      for (const w of words) {
        if (title.startsWith(w)) score += 6
        else if (title.includes(w)) score += 4
        else if (body.includes(w)) score += 1
        else return null
      }
      return { item, score }
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ item }) => item)
}
