import { Link } from 'react-router-dom'
import NewsletterForm from '../ui/NewsletterForm'

// ── Data ──────────────────────────────────────────────────────────────────────

const columns = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us',             to: '/about' },
      { label: 'Our Story',            to: '/about/our-story' },
      { label: 'Mission & Vision',     to: '/about/mission-vision' },
      { label: 'Our Team',             to: '/about/team' },
      { label: 'Careers',              to: '/careers' },
      { label: 'Open Positions',       to: '/open-positions' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Web Development',      to: '/services/web-dev' },
      { label: 'Mobile Apps',          to: '/services/mobile-apps' },
      { label: 'UI/UX Design',         to: '/services/ui-ux' },
      { label: 'E-Learning Solutions', to: '/services/elearning' },
      { label: 'Branding & Design',    to: '/services/branding' },
      { label: 'IT Consulting',        to: '/services/consulting' },
    ],
  },
  {
    heading: 'Programs',
    links: [
      { label: '⚡ Innovation Hub',     to: '/innovation-hub', highlight: true },
      { label: 'Browse Courses',       to: '/courses/browse' },
      { label: 'Certifications',       to: '/courses/certifications' },
      { label: 'Alumni Network',       to: '/alumni' },
      { label: 'Internships',          to: '/internships' },
      { label: 'Mentor Program',       to: '/mentor' },
      { label: 'Volunteer',            to: '/volunteer' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog',                 to: '/blog' },
      { label: 'Guides',               to: '/guides' },
      { label: 'FAQs',                 to: '/faqs' },
      { label: 'Free Resources',       to: '/courses/free-resources' },
      { label: 'Downloads',            to: '/downloads' },
      { label: 'Get a Quote',          to: '/quote' },
      { label: 'Book Consultation',    to: '/book-consultation' },
    ],
  },
]

const socials = [
  { href: 'https://www.facebook.com/SNC',         icon: 'fab fa-facebook-f',  label: 'Facebook',    hover: 'hover:bg-[#1877f2]' },
  { href: 'https://twitter.com/SNC',              icon: 'fab fa-x-twitter',   label: 'X / Twitter', hover: 'hover:bg-black' },
  { href: 'https://www.linkedin.com/company/SNC', icon: 'fab fa-linkedin-in', label: 'LinkedIn',    hover: 'hover:bg-[#0a66c2]' },
  { href: 'https://wa.me/211925277700',           icon: 'fab fa-whatsapp',    label: 'WhatsApp',    hover: 'hover:bg-[#25d366]' },
  { href: 'https://www.instagram.com/SNC',        icon: 'fab fa-instagram',   label: 'Instagram',   hover: 'hover:bg-[#e1306c]' },
  { href: 'https://www.tiktok.com/@SNC',          icon: 'fab fa-tiktok',      label: 'TikTok',      hover: 'hover:bg-[#010101]' },
  { href: 'https://www.youtube.com/@SNC',         icon: 'fab fa-youtube',     label: 'YouTube',     hover: 'hover:bg-[#ff0000]' },
]

const contact = [
  { icon: 'fa-envelope',     label: 'info@SNC.ss',       href: 'mailto:info@SNC.ss' },
  { icon: 'fa-phone',        label: '+211 925 277 700',  href: 'tel:+211925277700' },
  { icon: 'fa-location-dot', label: 'Juba, South Sudan', href: null },
  { icon: 'fa-globe',        label: 'www.SNC.ss',        href: 'https://SNC.ss' },
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
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="fas fa-bolt text-accent text-sm" />
            </div>
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-accent mb-0.5">
                Flagship Initiative · Vision 2030
              </p>
              <p className="text-sm font-semibold text-white leading-tight">
                SNC Innovation &amp; Leadership Hub — empowering 10,000–20,000 individuals across South Sudan
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
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-14 pb-10">

        {/* ── Row 1: Brand + 4 nav columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-10 pb-10 border-b border-white/6">

          {/* Brand + contact + social */}
          <div className="xl:col-span-1 flex flex-col gap-5">

            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-3 group w-fit" aria-label="Home">
              <span className="flex items-center justify-center w-11 h-11 bg-white rounded-xl border-2 border-primary/20 shadow-lg text-[0.75rem] font-black font-heading tracking-wide transition-transform group-hover:scale-105">
                <span className="text-primary">S</span>
                <span className="text-accent">N</span>
                <span className="text-primary">C</span>
              </span>
              <span className="font-heading font-extrabold leading-none">
                <span className="text-primary text-base">Sleek </span>
                <span className="text-accent text-base">Nexus</span>
                <span className="text-primary text-base"> Creative</span>
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-gray-400 text-sm leading-relaxed">
              Technology, innovation, and leadership — empowering the next generation of innovators and changemakers across South Sudan and Africa.
            </p>

            {/* Hiring badge */}
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-xs font-semibold text-primary border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors w-fit"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              We're Hiring
              <i className="fas fa-arrow-right text-[0.6rem]" />
            </Link>

            {/* Contact details */}
            <ul className="space-y-2.5">
              {contact.map(({ icon, label, href }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm text-gray-400">
                  <i className={`fas ${icon} text-primary w-4 flex-shrink-0`} />
                  {href
                    ? <a href={href} className="hover:text-white transition-colors">{label}</a>
                    : <span>{label}</span>}
                </li>
              ))}
            </ul>

            {/* Social links */}
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-gray-500 mb-2.5">Follow Us</p>
              <div className="flex flex-wrap gap-2">
                {socials.map(({ href, icon, label, hover }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={`w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:-translate-y-0.5 hover:shadow-md ${hover}`}
                  >
                    <i className={`${icon} text-xs`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 4 navigation columns — each clearly separated */}
          {columns.map(({ heading, links }) => (
            <div key={heading} className="xl:col-span-1">
              {/* Column heading with left accent */}
              <div className="flex items-center gap-2 mb-5">
                <span className="w-0.5 h-4 bg-primary rounded-full flex-shrink-0" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-white">{heading}</h4>
              </div>
              {/* Links */}
              <ul className="space-y-3">
                {links.map(({ label, to, highlight }) => (
                  <li key={label}>
                    {highlight ? (
                      <Link
                        to={to}
                        className="text-sm text-accent font-semibold hover:text-white transition-colors flex items-center gap-1.5"
                      >
                        {label}
                      </Link>
                    ) : (
                      <Link
                        to={to}
                        className="text-sm text-gray-400 hover:text-white hover:pl-1 transition-all duration-150 block"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Row 2: Newsletter ── */}
        <div className="grid md:grid-cols-2 gap-8 items-center py-8 border-b border-white/6">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-primary mb-1">Stay Updated</p>
            <h3 className="text-lg font-heading font-bold text-white mb-1">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Monthly updates on programs, opportunities, events, and SNC news.
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
