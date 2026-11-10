import { Link, useLocation } from 'react-router-dom'

// What the band says depends on where the visitor is, so it is never a
// second copy of the call-to-action they just scrolled past.
//   - On the Work page they've already seen the proof → point to the Hub.
//   - Everywhere else → offer the proof.
const VARIANTS = {
  default: {
    label: 'Not Ready Yet?',
    title: "See what we've built before you decide.",
    cta: 'View Our Work',
    to: '/work',
  },
  '/work': {
    label: 'Want to Go Further?',
    title: 'Partner with us through the Innovation Hub.',
    cta: 'Explore the Hub',
    to: '/innovation-hub',
  },
}

/**
 * FooterBand — the orange band that separates every page from the footer.
 */
export default function FooterBand() {
  const { pathname } = useLocation()
  const v = VARIANTS[pathname] || VARIANTS.default

  return (
    <section className="relative overflow-hidden bg-primary text-white" aria-label={v.label}>
      <div className="absolute inset-0 bg-motif-light opacity-[0.12] pointer-events-none" />
      <div className="relative container-page py-10 sm:py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">{v.label}</p>
          <h2 className="font-heading font-black uppercase text-white text-2xl sm:text-3xl leading-tight" style={{ letterSpacing: '-0.02em' }}>
            {v.title}
          </h2>
        </div>
        <Link to={v.to} className="btn-light whitespace-nowrap flex-shrink-0">
          {v.cta}
        </Link>
      </div>
    </section>
  )
}
