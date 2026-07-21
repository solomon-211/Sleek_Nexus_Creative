import { Link } from 'react-router-dom'
import NewsletterForm from '../ui/NewsletterForm'

// ── Data ──────────────────────────────────────────────────────────────────────

const columns = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us',         to: '/about' },
      { label: 'Our Story',        to: '/about/our-story' },
      { label: 'Mission & Vision', to: '/about/mission-vision' },
      { label: 'Innovation Hub',   to: '/innovation-hub', highlight: true },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Web Development',  to: '/services/web-dev' },
      { label: 'Mobile Apps',      to: '/services/mobile-apps' },
      { label: 'UI/UX Design',     to: '/services/ui-ux' },
      { label: 'Branding & Design',to: '/services/branding' },
      { label: 'IT Consulting',    to: '/services/consulting' },
    ],
  },
  {
    heading: 'Projects',
    links: [
      { label: 'Portfolio',              to: '/projects/portfolio' },
      { label: 'Case Studies',           to: '/projects/case-studies' },
      { label: 'Client Success Stories', to: '/projects/client-success' },
    ],
  },
  {
    heading: 'Work With Us',
    links: [
      { label: 'Get a Quote',       to: '/quote' },
      { label: 'Book Consultation', to: '/book-consultation' },
      { label: 'Get Started',       to: '/get-started' },
      { label: 'Privacy Policy',    to: '/privacy' },
      { label: 'Terms of Service',  to: '/terms' },
    ],
  },
]

const socials = [
  { href: 'https://www.facebook.com/share/183ufB9mqx/?mibextid=wwXIfr',                                          icon: 'fab fa-facebook-f',  label: 'Facebook',    bg: 'bg-[#1877f2]' },
  { href: 'https://twitter.com/SNC',                                                                               icon: 'fab fa-x-twitter',   label: 'X / Twitter', bg: 'bg-black' },
  { href: 'https://www.linkedin.com/company/sleek-nexus-creative/',                                               icon: 'fab fa-linkedin-in', label: 'LinkedIn',    bg: 'bg-[#0a66c2]' },
  { href: 'https://wa.me/211925277700',                                                                            icon: 'fab fa-whatsapp',    label: 'WhatsApp',    bg: 'bg-[#25d366]' },
  { href: 'https://www.instagram.com/sleek_nexus_creative?igsh=bmdpanczdzcwNm04&utm_source=qr',                  icon: 'fab fa-instagram',   label: 'Instagram',   bg: 'bg-[#e1306c]' },
  { href: 'https://www.tiktok.com/@SNC',                                                                          icon: 'fab fa-tiktok',      label: 'TikTok',      bg: 'bg-[#010101]' },
  { href: 'https://www.youtube.com/@SNC',                                                                         icon: 'fab fa-youtube',     label: 'YouTube',     bg: 'bg-[#ff0000]' },
]

const contact = [
  { icon: 'fa-envelope',     label: 'info@sleeknexuscreative.com', href: 'mailto:info@sleeknexuscreative.com' },
  { icon: 'fa-phone',        label: '+211 925 277 700',            href: 'tel:+211925277700' },
  { icon: 'fa-location-dot', label: 'Juba, South Sudan',           href: null },
  { icon: 'fa-globe',        label: 'sleeknexuscreative.com',      href: 'https://sleeknexuscreative.com' },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#080c18] text-white" aria-label="Site footer">

      {/* Brand accent stripe */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Innovation Hub Banner */}
      <div className="bg-gradient-to-r from-[#1a0a10] to-[#0f1520] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="fas fa-bolt text-accent text-sm" />
            </div>
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-accent mb-0.5">
                Flagship Initiative · Vision 2040
              </p>
              <p className="text-sm font-semibold text-white leading-tight">
                SNC Innovation Hub — Technology &amp; Digital Solutions for South Sudan and Africa
              </p>
            </div>
          </div>
          <Link
            to="/innovation-hub"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-primary/20 border border-primary/40 hover:bg-primary hover:border-primary text-white text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-lg transition-all"
          >
            <i className="fas fa-rocket text-[0.65rem]" /> Explore the Hub
          </Link>
        </div>
      </div>

      {/* Main body */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-12 sm:pt-14 pb-8 sm:pb-10">

        {/* ── Main grid: brand col + 4 nav cols ── */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-white/6">

          {/* ── Brand column ── */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">

            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-3 group w-fit" aria-label="Home">
              <img
                src="/images/snc-logo.png"
                alt="Sleek Nexus Creative"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="flex flex-col leading-none">
                <span className="font-heading font-extrabold text-sm whitespace-nowrap">
                  <span className="text-primary">Sleek </span>
                  <span className="text-accent">Nexus</span>
                  <span className="text-white"> Creative</span>
                </span>
                <span className="text-[0.6rem] text-white/40 uppercase tracking-widest mt-0.5">Technology &amp; Innovation</span>
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-gray-400 text-xs leading-relaxed">
              Building digital products and software solutions that work in the real world — for businesses, startups, and organisations across South Sudan and Africa.
            </p>

            {/* Contact */}
            <ul className="space-y-2.5">
              {contact.map(({ icon, label, href }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <i className={`fas ${icon} text-primary text-xs w-3.5 flex-shrink-0`} />
                  {href
                    ? <a href={href} className="text-gray-400 text-xs hover:text-white transition-colors">{label}</a>
                    : <span className="text-gray-400 text-xs">{label}</span>}
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-widest text-gray-500 mb-2">Follow Us</p>
              <div className="flex flex-wrap gap-1.5">
                {socials.map(({ href, icon, label, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-white transition-all hover:-translate-y-0.5 hover:brightness-110 ${bg}`}
                  >
                    <i className={`${icon} text-[0.65rem]`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── 4 nav columns ── */}
          {columns.map(({ heading, links }) => (
            <div key={heading} className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-0.5 h-3.5 bg-primary rounded-full flex-shrink-0" />
                <h4 className="text-[0.65rem] font-bold uppercase tracking-widest text-white">{heading}</h4>
              </div>
              <ul className="space-y-2.5">
                {links.map(({ label, to, highlight }) => (
                  <li key={label}>
                    {highlight ? (
                      <Link to={to} className="text-xs text-accent font-semibold hover:text-white transition-colors flex items-center gap-1">
                        <i className="fas fa-bolt text-[0.55rem]" />{label}
                      </Link>
                    ) : (
                      <Link to={to} className="text-xs text-gray-400 hover:text-white hover:pl-1 transition-all duration-150 block">
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Newsletter ── */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 items-center py-6 sm:py-8 border-b border-white/6">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-primary mb-1">Stay Updated</p>
            <h3 className="text-lg font-heading font-bold text-white mb-1">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Monthly updates on projects, digital insights, and SNC news.
            </p>
          </div>
          <div className="max-w-md w-full md:ml-auto">
            <NewsletterForm id="footer-newsletter-form" dark />
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © {year}{' '}
            <Link to="/" className="hover:text-white transition-colors font-medium">
              Sleek Nexus Creative
            </Link>
            . All rights reserved. Juba, South Sudan.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms"   className="hover:text-white transition-colors">Terms of Service</Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
              aria-label="Back to top"
            >
              <i className="fas fa-arrow-up text-xs" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
