import { Link, useLocation } from 'react-router-dom'

// ── Data ──────────────────────────────────────────────────────────────────────

const navColumns = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us',       to: '/about' },
      { label: 'Innovation Hub', to: '/innovation-hub' },
      { label: 'Get Started',    to: '/get-started' },
      { label: 'Contact Us',     to: '/contact' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Web Development',   to: '/services/web-dev' },
      { label: 'Mobile Apps',       to: '/services/mobile-apps' },
      { label: 'UI/UX Design',      to: '/services/ui-ux' },
      { label: 'Branding & Design', to: '/services/branding' },
      { label: 'IT Consulting',     to: '/services/consulting' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy',   to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  },
]

const socials = [
  { href: 'https://www.facebook.com/share/183ufB9mqx/?mibextid=wwXIfr',                           icon: 'fab fa-facebook-f',  label: 'Facebook',  bg: '#1877f2' },
  { href: 'https://twitter.com/SNC',                                                               icon: 'fab fa-x-twitter',   label: 'Twitter',   bg: '#1D2128' },
  { href: 'https://www.linkedin.com/company/sleek-nexus-creative/',                               icon: 'fab fa-linkedin-in', label: 'LinkedIn',  bg: '#0a66c2' },
  { href: 'https://www.instagram.com/sleek_nexus_creative?igsh=bmdpanczdzcwNm04&utm_source=qr', icon: 'fab fa-instagram',   label: 'Instagram', bg: '#e1306c' },
  { href: 'https://www.youtube.com/@SNC',                                                         icon: 'fab fa-youtube',     label: 'YouTube',   bg: '#ff0000' },
]

const contact = [
  { icon: 'fa-envelope',     label: 'info@sleeknexuscreative.com', href: 'mailto:info@sleeknexuscreative.com' },
  { icon: 'fa-phone',        label: '+211 925 277 700',            href: 'tel:+211925277700' },
  { icon: 'fa-location-dot', label: 'Juba, South Sudan',           href: null },
  { icon: 'fa-clock',        label: 'Mon–Fri, 9AM–6PM (EAT)',      href: null },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear()
  const { pathname } = useLocation()

  return (
    <footer className="bg-[#215E61] text-white" aria-label="Site footer">

      {/* ── CTA band ── */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-16">
          <div className="grid sm:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Work With Us</p>
              <h2 className="font-heading font-black uppercase text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3">
                Have a Project?
              </h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                Tell us what you need. We'll assess it honestly, scope it clearly, and build it right.
              </p>
            </div>
            <div className="sm:text-right">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary hover:bg-[#e88e1a] text-white font-bold text-sm px-8 py-4 rounded-lg transition-colors"
              >
                Get in Touch <i className="fas fa-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main body ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* ── Brand column ── */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            <Link to="/" className="inline-flex items-center gap-3 w-fit" aria-label="Home">
              <img
                src="/images/snc-logo.png"
                alt="Sleek Nexus Creative"
                className="h-10 w-auto object-contain"
              />
              <span className="flex flex-col leading-none">
                <span className="font-heading font-extrabold text-sm whitespace-nowrap text-white">
                  Sleek Nexus Creative
                </span>
                <span className="text-[0.6rem] text-white/50 uppercase tracking-widest mt-0.5">Technology &amp; Innovation</span>
              </span>
            </Link>

            <p className="text-white/70 text-sm leading-relaxed">
              Building digital products that work in the real world — for businesses, schools, and organisations in South Sudan and beyond.
            </p>

            {/* Contact info */}
            <ul className="space-y-2.5">
              {contact.map(({ icon, label, href }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <i className={`fas ${icon} text-primary text-xs w-4 flex-shrink-0`} />
                  {href
                    ? <a href={href} className="text-white/70 text-xs hover:text-white transition-colors">{label}</a>
                    : <span className="text-white/70 text-xs">{label}</span>
                  }
                </li>
              ))}
            </ul>
          </div>

          {/* ── 2x2 grid: Company | Services on row 1, Legal | Follow Us on row 2.
               A plain CSS grid (not two independent flex columns) so each row's
               height comes from its tallest cell — that's what keeps Legal and
               Follow Us starting on the same line as each other, the same way
               Company and Services already do as row 1. ── */}
          <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-2 gap-x-8 gap-y-8">
            {navColumns.map(({ heading, links }) => (
              <div key={heading}>
                <p className="text-xs font-bold uppercase tracking-widest text-white mb-4 border-b border-white/10 pb-2">
                  {heading}
                </p>
                <ul className="space-y-2.5">
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className={`text-sm transition-colors hover:text-primary ${
                          pathname === to ? 'text-primary font-semibold' : 'text-white/70'
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white mb-4 border-b border-white/10 pb-2">
                Follow Us
              </p>
              <div className="flex flex-wrap gap-2">
                {socials.map(({ href, icon, label, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs transition-opacity hover:opacity-80"
                    style={{ backgroundColor: bg }}
                  >
                    <i className={icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {year} <Link to="/" className="hover:text-white transition-colors text-white/70 font-medium">Sleek Nexus Creative</Link>. All rights reserved. Juba, South Sudan.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms"   className="hover:text-white transition-colors">Terms</Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              aria-label="Back to top"
            >
              <i className="fas fa-arrow-up text-white text-xs" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
