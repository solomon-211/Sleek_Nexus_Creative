import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedCounter from '../ui/AnimatedCounter'

// ── Data ──────────────────────────────────────────────────────────────────────

const columns = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us',       to: '/about' },
      { label: 'Innovation Hub', to: '/innovation-hub', highlight: true },
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
  { href: 'https://www.facebook.com/share/183ufB9mqx/?mibextid=wwXIfr',                                 icon: 'fab fa-facebook-f',  label: 'Facebook',    bg: '#1877f2' },
  { href: 'https://twitter.com/SNC',                                                                     icon: 'fab fa-x-twitter',   label: 'X / Twitter', bg: '#000000' },
  { href: 'https://www.linkedin.com/company/sleek-nexus-creative/',                                     icon: 'fab fa-linkedin-in', label: 'LinkedIn',    bg: '#0a66c2' },
  { href: 'https://wa.me/211925277700',                                                                  icon: 'fab fa-whatsapp',    label: 'WhatsApp',    bg: '#25d366' },
  { href: 'https://www.instagram.com/sleek_nexus_creative?igsh=bmdpanczdzcwNm04&utm_source=qr',        icon: 'fab fa-instagram',   label: 'Instagram',   bg: '#e1306c' },
  { href: 'https://www.tiktok.com/@SNC',                                                                icon: 'fab fa-tiktok',      label: 'TikTok',      bg: '#010101' },
  { href: 'https://www.youtube.com/@SNC',                                                               icon: 'fab fa-youtube',     label: 'YouTube',     bg: '#ff0000' },
]

const contact = [
  { icon: 'fa-envelope',     label: 'info@sleeknexuscreative.com', href: 'mailto:info@sleeknexuscreative.com' },
  { icon: 'fa-phone',        label: '+211 925 277 700',            href: 'tel:+211925277700' },
  { icon: 'fa-location-dot', label: 'Juba, South Sudan',           href: 'https://www.google.com/maps/search/?api=1&query=Juba%2C+South+Sudan', external: true },
  { icon: 'fa-clock',        label: 'Mon–Fri, 9AM–6PM (EAT)',      href: null },
]

const stats = [
  { icon: 'fa-project-diagram', value: 10, suffix: '+', label: 'Projects' },
  { icon: 'fa-user-graduate',   value: 50, suffix: '+', label: 'Learners' },
  { icon: 'fa-handshake',       value: 5,  suffix: '+', label: 'Partners' },
  { icon: 'fa-clock',           value: 24, suffix: 'h', label: 'Response' },
]

// ── Newsletter ─────────────────────────────────────────────────────────────────

function NewsletterInline() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) { setSent(true); setEmail('') }
  }

  return sent ? (
    <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
      <i className="fas fa-check-circle" /> You're in — thanks for subscribing!
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 min-w-0 bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors"
      />
      <button type="submit" className="flex-shrink-0 bg-primary hover:bg-accent text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(254,127,45,0.35)]">
        Subscribe
      </button>
    </form>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear()
  const { pathname } = useLocation()

  return (
    <footer className="relative overflow-hidden bg-dark text-white" aria-label="Site footer">

      {/* ── Pre-footer CTA band ── */}
      <div className="relative overflow-hidden bg-dark border-b-4 border-primary">
        {/* Animated orange sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/10 pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/15 rounded-full blur-[100px] pointer-events-none" />
        {/* Giant ghost text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-heading uppercase leading-none whitespace-nowrap"
            style={{ fontSize: 'clamp(5rem, 18vw, 16rem)', WebkitTextStroke: '1px rgba(254,127,45,0.08)', color: 'transparent' }}
          >LET'S BUILD</span>
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-primary text-sm font-black uppercase tracking-widest mb-3">Ready to start?</p>
            <h2
              className="font-heading uppercase leading-none text-white"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontWeight: 800, textShadow: '3px 3px 0 #FE7F2D, 6px 6px 0 rgba(254,127,45,0.3)' }}
            >Let's Build Something Real.</h2>
          </div>
          <Link
            to="/contact"
            className="flex-shrink-0 inline-flex items-center gap-3 bg-primary hover:bg-accent text-white font-black uppercase tracking-widest text-sm px-10 py-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_32px_rgba(254,127,45,0.45)] hover:shadow-[0_16px_48px_rgba(254,127,45,0.6)]"
          >
            Start a Project <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>

      {/* ── Ambient background glows ── */}
      <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-primary/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-[5%] w-[400px] h-[400px] bg-accent/[0.05] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="absolute inset-0 bg-dots-light opacity-[0.03] pointer-events-none" />

      {/* ── Hub banner ── */}
      <div className="relative border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-bolt text-primary text-xs" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-[0.15em] text-primary">Flagship</span>
              <p className="text-white/80 text-xs font-semibold leading-tight">SNC Innovation Hub — Technology &amp; Digital Solutions, Juba-Based &amp; Beyond</p>
            </div>
          </div>
          <Link
            to="/innovation-hub"
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-[0.7rem] font-black uppercase tracking-widest text-primary border border-primary/30 hover:bg-primary hover:text-white hover:border-primary px-4 py-1.5 rounded-lg transition-all duration-200"
          >
            <i className="fas fa-rocket text-[0.6rem]" /> Explore the Hub
          </Link>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="relative border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map(({ icon, value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 group-hover:bg-primary/20 border border-primary/20 flex items-center justify-center flex-shrink-0 transition-colors">
                <i className={`fas ${icon} text-primary text-xs`} />
              </div>
              <div>
                <strong className="block text-lg font-heading font-black text-white leading-none">
                  <AnimatedCounter value={value} suffix={suffix} />
                </strong>
                <span className="text-white/70 text-[0.65rem] uppercase tracking-wide">{label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Main body ── */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-14 pb-10">

        {/* ── Top grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">

          {/* Brand col — spans 4 */}
          <div className="col-span-2 lg:col-span-4 flex flex-col gap-6">
            <Link to="/" className="inline-flex items-center gap-3 group w-fit" aria-label="Home">
              <img src="/images/snc-logo.png" alt="Sleek Nexus Creative" className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
              <span className="flex flex-col leading-none">
                <span className="font-heading font-extrabold text-base whitespace-nowrap">
                  <span className="text-primary">Sleek </span>
                  <span className="text-accent">Nexus</span>
                  <span className="text-white"> Creative</span>
                </span>
                <span className="text-[0.65rem] text-white/60 uppercase tracking-widest mt-0.5">Technology &amp; Innovation</span>
              </span>
            </Link>

            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Building digital products and software solutions that work in the real world — for businesses, startups, and organisations in South Sudan and beyond.
            </p>

            {/* Live product badge */}
            <a
              href="https://eduportalss.solomonleek.tech"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-primary/30 rounded-xl px-4 py-3 transition-all duration-200 w-fit group"
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <div>
                <p className="text-white text-xs font-bold leading-none mb-0.5">EduPortal South Sudan</p>
                <p className="text-white/70 text-[0.6rem]">Live product we built &amp; deployed</p>
              </div>
              <i className="fas fa-arrow-up-right-from-square text-white/20 group-hover:text-primary text-[0.6rem] ml-auto transition-colors" />
            </a>

            {/* Contact info */}
            <ul className="space-y-2.5">
              {contact.map(({ icon, label, href, external }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <i className={`fas ${icon} text-primary text-xs w-4 flex-shrink-0`} />
                  {href
                    ? <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="text-white/80 text-xs hover:text-white transition-colors">{label}</a>
                    : <span className="text-white/80 text-xs">{label}</span>
                  }
                </li>
              ))}
            </ul>
          </div>

          {/* Nav cols — spans 5 */}
          <div className="col-span-2 lg:col-span-5 grid grid-cols-3 gap-8">
            {columns.map(({ heading, links }) => (
              <div key={heading}>
                <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.15em] text-white mb-4">
                  <span className="w-3 h-0.5 bg-primary rounded-full flex-shrink-0" /> {heading}
                </p>
                <ul className="space-y-3">
                  {links.map(({ label, to, highlight }) => (
                    <li key={label}>
                      {highlight ? (
                        <Link to={to} className="inline-flex items-center gap-1.5 text-xs text-primary font-bold hover:text-accent transition-colors">
                          <i className="fas fa-bolt text-[0.5rem]" />{label}
                        </Link>
                      ) : (
                        <Link
                          to={to}
                          className={`text-xs transition-all duration-150 hover:text-white hover:translate-x-0.5 inline-block ${pathname === to ? 'text-white font-semibold' : 'text-white/80'}`}
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

          {/* Social + newsletter col — spans 3 */}
          <div className="col-span-2 lg:col-span-3 flex flex-col gap-6">
            <div>
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.15em] text-white mb-4">
                <span className="w-3 h-0.5 bg-primary rounded-full flex-shrink-0" /> Follow Us
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
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
                    style={{ backgroundColor: bg }}
                  >
                    <i className={icon} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.15em] text-white mb-2">
                <span className="w-3 h-0.5 bg-primary rounded-full flex-shrink-0" /> Newsletter
              </p>
              <p className="text-white/80 text-xs mb-3 leading-relaxed">Monthly updates on tech, insights, and SNC news.</p>
              <NewsletterInline />
            </div>
          </div>
        </div>

        {/* ── Giant 3D wordmark ── */}
        <div className="py-12 sm:py-16 text-center overflow-hidden select-none">
          <h2
            className="font-heading uppercase leading-none"
            style={{
              fontSize: 'clamp(2rem, 10vw, 9rem)',
              fontWeight: 900,
              letterSpacing: '0.02em',
              color: '#FFFFFF',
              textShadow:
                '3px 3px 0px rgba(254,127,45,0.5), 6px 6px 0px rgba(254,127,45,0.3), 9px 9px 0px rgba(254,127,45,0.15), 14px 14px 26px rgba(0,0,0,0.7)',
            }}
          >
            Sleek Nexus Creative
          </h2>
          <p className="text-white/80 text-xs sm:text-sm font-semibold uppercase tracking-[0.4em] mt-5">
            Built in Juba. Deployed Across South Sudan.
          </p>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.7rem] text-white/70">
          <p>
            © {year}{' '}
            <Link to="/" className="hover:text-white transition-colors font-semibold text-white">Sleek Nexus Creative</Link>
            . All rights reserved. Juba, South Sudan.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms"   className="hover:text-white transition-colors">Terms of Service</Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 rounded-xl bg-white/[0.04] hover:bg-primary border border-white/10 hover:border-primary flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(254,127,45,0.5)] hover:-translate-y-0.5"
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
