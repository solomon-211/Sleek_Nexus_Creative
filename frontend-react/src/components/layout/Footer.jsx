import { Link, useLocation } from 'react-router-dom'
import Img from '../ui/Img'
import FooterBand from './FooterBand'
import { GA_ID, OPEN_SETTINGS_EVENT } from '../../lib/analytics'
import { socials, EMAIL, PHONE_DISPLAY, PHONE_E164, whatsappUrl } from '../../lib/site'
import { HEALTHHUB_URL } from '../../lib/work-data'

// ── Data ──────────────────────────────────────────────────────────────────────

const navColumns = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us',       to: '/about' },
      { label: 'Our Work',       to: '/work' },
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
]

// The ways to reach us — the most useful thing in the footer, so they get the
// most room: large, tappable rows rather than a list of small print.
const reach = [
  { icon: 'fa-envelope', iconSet: 'fas', label: 'Email us',      value: EMAIL,         href: `mailto:${EMAIL}` },
  { icon: 'fa-phone',    iconSet: 'fas', label: 'Call us',       value: PHONE_DISPLAY, href: `tel:${PHONE_E164}` },
  { icon: 'fa-whatsapp', iconSet: 'fab', label: 'WhatsApp',      value: 'Chat with the team', href: whatsappUrl(), external: true },
]

const legal = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms',   to: '/terms' },
]

const headingClass = 'text-xs font-bold uppercase tracking-widest text-white/50 mb-5'

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear()
  const { pathname } = useLocation()

  return (
    <footer className="bg-dark text-white" aria-label="Site footer">
      <FooterBand />

      <div className="container-page pt-14 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 pb-12 border-b border-white/10">

          {/* ── Brand ── */}
          <div className="col-span-2 lg:col-span-4 flex flex-col gap-6">
            <Link to="/" className="inline-flex items-center gap-3 w-fit" aria-label="Home">
              <Img
                src="/images/snc-logo.png"
                alt="Sleek Nexus Creative"
                sizes="44px"
                loading="lazy"
                className="h-11 w-auto object-contain"
              />
              <span className="font-heading font-extrabold text-base whitespace-nowrap text-white">
                Sleek Nexus Creative
              </span>
            </Link>

            {/* The company's slogan: the one line a funder or partner should
                remember. */}
            <div className="max-w-sm">
              <p className="font-heading font-black text-white text-2xl leading-tight" style={{ letterSpacing: '-0.01em' }}>
                <span className="block">Where the network ends,</span>
                <span className="block text-primary">our work begins.</span>
              </p>
              <p className="mt-3 text-white/60 text-sm leading-relaxed">
                We design and build websites, apps and business systems that people actually use.
              </p>
            </div>

            {/* Real, shipped proof to back the slogan up. */}
            <a
              href={HEALTHHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 w-fit rounded-2xl bg-white/[0.06] hover:bg-white/10 px-4 py-3 transition-colors"
            >
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>
              <span className="text-sm leading-snug">
                <span className="block text-white/50 text-xs">Live now</span>
                <span className="font-semibold text-white group-hover:text-primary transition-colors">
                  HealthHub Bridge
                </span>
              </span>
            </a>

            <div className="flex flex-wrap gap-2.5">
              {socials.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-11 h-11 rounded-[28%] bg-white/10 hover:bg-primary flex items-center justify-center text-white text-sm transition-colors"
                >
                  <i className={`fab ${icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Contact — first on phones, where it matters most ── */}
          <div className="col-span-2 lg:col-span-4 lg:order-last">
            <p className={headingClass}>Get in touch</p>
            <ul className="space-y-3">
              {reach.map(({ icon, iconSet, label, value, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-4 rounded-2xl bg-white/[0.06] hover:bg-white/10 p-3 transition-colors"
                  >
                    <span className="w-11 h-11 rounded-[28%] bg-primary flex items-center justify-center flex-shrink-0 shadow-[0_6px_14px_-6px_rgba(254,127,45,0.55)]">
                      <i className={`${iconSet} ${icon} text-white`} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-white/50">{label}</span>
                      <span className="block font-semibold text-white text-sm sm:text-base truncate group-hover:text-primary transition-colors">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-white/60 leading-relaxed">
              <i className="fas fa-location-dot text-primary mr-2" />
              Based in Juba, South Sudan · working with clients worldwide, remotely.
            </p>
            <p className="mt-1.5 text-sm text-white/60">
              <i className="fas fa-clock text-primary mr-2" />
              Mon–Fri 9AM–6PM, Sat 10AM–4PM (EAT)
            </p>
          </div>

          {/* ── Link columns ── */}
          {navColumns.map(({ heading, links }) => (
            <nav key={heading} aria-label={heading} className="col-span-1 lg:col-span-2">
              <p className={headingClass}>{heading}</p>
              <ul className="space-y-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className={`text-sm transition-colors hover:text-primary ${
                        pathname === to ? 'text-primary font-semibold' : 'text-white/75'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© {year} Sleek Nexus Creative</p>
          <div className="flex items-center gap-6">
            {legal.map(({ label, to }) => (
              <Link key={to} to={to} className="hover:text-white transition-colors">{label}</Link>
            ))}
            {/* Lets a visitor revisit their analytics choice. Hidden when no
                analytics is configured — there'd be nothing to change. */}
            {GA_ID && (
              <button
                onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
                className="hover:text-white transition-colors"
              >
                Cookies
              </button>
            )}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-primary hover:text-white px-4 py-2 text-white/80 transition-colors"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
