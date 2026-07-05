import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// ── Nav data ──────────────────────────────────────────────────────────────────
const navLinks = [
  { label: 'Home', to: '/' },
  {
    label: 'About', to: '/about',
    dropdown: [
      { icon: 'fa-book-open',    label: 'Our Story',       to: '/about/our-story' },
      { icon: 'fa-users',        label: 'Team',             to: '/about/team' },
      { icon: 'fa-bullseye',     label: 'Mission & Vision', to: '/about/mission-vision' },
      { icon: 'fa-briefcase',    label: 'Careers',          to: '/careers' },
    ],
  },
  {
    label: 'Services', to: '/services',
    dropdown: [
      { icon: 'fa-code',          label: 'Web Development',      to: '/services/web-dev' },
      { icon: 'fa-mobile-alt',    label: 'Mobile Apps',          to: '/services/mobile-apps' },
      { icon: 'fa-pencil-ruler',  label: 'UI/UX Design',         to: '/services/ui-ux' },
      { icon: 'fa-graduation-cap',label: 'E-Learning Solutions',  to: '/services/elearning' },
      { icon: 'fa-palette',       label: 'Branding',             to: '/services/branding' },
      { icon: 'fa-laptop-code',   label: 'Digital Consulting',   to: '/services/consulting' },
    ],
  },
  {
    label: 'Projects', to: '/projects',
    dropdown: [
      { icon: 'fa-th',        label: 'Portfolio',             to: '/projects/portfolio' },
      { icon: 'fa-chart-bar', label: 'Case Studies',          to: '/projects/case-studies' },
      { icon: 'fa-trophy',    label: 'Client Success Stories', to: '/projects/client-success' },
    ],
  },
  {
    label: 'Courses', to: '/courses',
    dropdown: [
      { icon: 'fa-search',    label: 'Browse Courses',   to: '/courses/browse' },
      { icon: 'fa-gift',      label: 'Free Resources',   to: '/courses/free-resources' },
      { icon: 'fa-certificate',label: 'Certifications',  to: '/courses/certifications' },
      { icon: 'fa-flask',     label: 'Student Projects', to: '/courses/student-projects' },
    ],
  },
  {
    label: 'Resources', to: '/blog',
    dropdown: [
      { icon: 'fa-rss',           label: 'Blog',      to: '/blog' },
      { icon: 'fa-map',           label: 'Guides',    to: '/guides' },
      { icon: 'fa-question-circle',label: 'FAQs',     to: '/faqs' },
      { icon: 'fa-download',      label: 'Downloads', to: '/downloads' },
    ],
  },
  {
    label: 'Contact', to: '/contact',
    dropdown: [
      { icon: 'fa-envelope',          label: 'Contact Us',        to: '/contact' },
      { icon: 'fa-file-invoice-dollar',label: 'Get a Quote',      to: '/quote' },
      { icon: 'fa-calendar-check',    label: 'Book Consultation', to: '/book-consultation' },
    ],
  },
  {
    label: 'Join Us', to: '/join',
    dropdown: [
      { icon: 'fa-briefcase',        label: 'Careers',            to: '/careers' },
      { icon: 'fa-user-graduate',    label: 'Internships',        to: '/internships' },
      { icon: 'fa-hands-helping',    label: 'Volunteer',          to: '/volunteer' },
      { icon: 'fa-chalkboard-teacher',label: 'Become a Trainer',  to: '/trainer' },
      { icon: 'fa-user-tie',         label: 'Become a Mentor',    to: '/mentor' },
      { icon: 'fa-users',            label: 'Join Our Community', to: '/community' },
      { icon: 'fa-graduation-cap',   label: 'Alumni Network',     to: '/alumni' },
      { icon: 'fa-door-open',        label: 'Open Positions',     to: '/open-positions' },
    ],
  },
  { label: 'Hub', to: '/innovation-hub', highlight: true },
]

// ── Dropdown panel — white card on dark navbar ────────────────────────────────
function DropdownMenu({ items }) {
  return (
    <motion.ul
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.16 }}
      className="absolute top-[calc(100%+10px)] left-0 bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.25)] border border-white/10 min-w-[220px] py-2 z-50 list-none"
    >
      {items.map(({ icon, label, to }) => (
        <li key={to}>
          <Link
            to={to}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1e293b] hover:text-primary hover:bg-primary/[0.06] transition-colors rounded-lg mx-1"
          >
            <i className={`fas ${icon} text-primary w-4 text-xs flex-shrink-0`} />
            {label}
          </Link>
        </li>
      ))}
    </motion.ul>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileOpen,   setMobileOpen]   = useState(null)
  const [scrolled,     setScrolled]     = useState(false)
  const [progress,     setProgress]     = useState(0)
  const location = useLocation()
  const navRef   = useRef(null)

  // Close menus on route change
  useEffect(() => { setMenuOpen(false); setOpenDropdown(null); setMobileOpen(null) }, [location])

  // Scroll progress bar + scrolled shadow
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const scrollTop = window.scrollY
      const max = doc.scrollHeight - window.innerHeight || 1
      setProgress(Math.min((scrollTop / max) * 100, 100))
      setScrolled(scrollTop > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenDropdown(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Desktop link style
  const linkClass = ({ isActive }) =>
    `text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
      isActive
        ? 'text-white bg-white/[0.12] font-semibold'
        : 'text-white/80 hover:text-white hover:bg-white/[0.08]'
    }`

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        scrolled
          ? 'bg-[#080c18] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-[#0f172a]'
      }`}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-primary to-accent rounded-r-sm transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />

      {/* Bottom border — subtle maroon accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px] gap-4">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-3 flex-shrink-0 group"
            aria-label="Sleek Nexus Creative Home"
          >
            <img
              src="/images/snc-logo.png"
              alt="Sleek Nexus Creative"
              className="h-[46px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="text-[0.95rem] font-extrabold font-heading whitespace-nowrap">
                <span className="text-accent">Sleek </span>
                <span className="text-primary">Nexus</span>
                <span className="text-accent"> Creative</span>
              </span>
              <span className="text-[0.6rem] text-white/50 uppercase tracking-widest mt-0.5">Technology &amp; Innovation</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ label, to, dropdown, highlight }) => (
              <li
                key={to}
                className="relative"
                onMouseEnter={() => dropdown && setOpenDropdown(label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {highlight ? (
                  /* ⚡ Hub — flagship pill */
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap border ${
                        isActive
                          ? 'bg-primary text-white border-primary shadow-[0_0_16px_rgba(196,30,58,0.4)]'
                          : 'text-accent border-accent/50 hover:bg-accent hover:text-white hover:border-accent hover:shadow-[0_0_16px_rgba(255,140,66,0.3)]'
                      }`
                    }
                  >
                    <i className="fas fa-bolt text-[0.65rem]" /> {label}
                  </NavLink>
                ) : dropdown ? (
                  <button
                    className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                      openDropdown === label
                        ? 'text-white bg-white/[0.12]'
                        : 'text-white/80 hover:text-white hover:bg-white/[0.08]'
                    }`}
                    onClick={() => setOpenDropdown(openDropdown === label ? null : label)}
                  >
                    {label}
                    <i className={`fas fa-chevron-down text-[0.6rem] ml-0.5 transition-transform duration-200 ${openDropdown === label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <NavLink to={to} className={linkClass} end={to === '/'}>{label}</NavLink>
                )}

                <AnimatePresence>
                  {dropdown && openDropdown === label && <DropdownMenu items={dropdown} />}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* ── Get Started CTA ── */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <Link
              to="/get-started"
              className="btn-primary text-sm shadow-[0_0_20px_rgba(196,30,58,0.3)] hover:shadow-[0_0_28px_rgba(196,30,58,0.45)]"
            >
              Get Started
            </Link>
          </div>

          {/* ── Hamburger ── */}
          <button
            type="button"
            className={`lg:hidden flex flex-col items-center justify-center gap-[5px] w-11 h-11 rounded-[10px] border-[1.5px] transition-all duration-200 cursor-pointer touch-manipulation ${
              menuOpen
                ? 'bg-primary border-primary'
                : 'bg-white/10 border-white/20'
            }`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span className={`w-[22px] h-[2.5px] rounded-sm transition-all duration-300 ${menuOpen ? 'bg-white rotate-45 translate-y-[7px]' : 'bg-white'}`} />
            <span className={`w-[22px] h-[2.5px] rounded-sm transition-all duration-300 ${menuOpen ? 'bg-white opacity-0 scale-x-0' : 'bg-white'}`} />
            <span className={`w-[22px] h-[2.5px] rounded-sm transition-all duration-300 ${menuOpen ? 'bg-white -rotate-45 -translate-y-[7px]' : 'bg-white'}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile menu backdrop ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/50"
            style={{ top: '72px', zIndex: 9997 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{ zIndex: 9998 }}
            className="lg:hidden relative border-t border-white/10 bg-[#0d1526] shadow-[0_16px_40px_rgba(0,0,0,0.4)] max-h-[calc(100vh-72px)] overflow-y-auto"
          >
            <ul className="py-2">
              {navLinks.map(({ label, to, dropdown, highlight }) => (
                <li key={to}>
                  {dropdown ? (
                    <>
                      {/* Dropdown toggle */}
                      <button
                        className="w-full flex items-center justify-between px-6 py-3.5 text-base font-medium border-b border-white/[0.06] text-white/80 hover:text-white hover:bg-white/[0.05] transition-colors"
                        onClick={() => setMobileOpen(mobileOpen === label ? null : label)}
                      >
                        {label}
                        <i className={`fas fa-chevron-down text-accent text-xs transition-transform duration-200 ${mobileOpen === label ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Sub-items */}
                      <AnimatePresence>
                        {mobileOpen === label && (
                          <motion.ul
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="bg-black/20 list-none overflow-hidden"
                          >
                            {dropdown.map(({ icon, label: dl, to: dt }) => (
                              <li key={dt}>
                                <Link
                                  to={dt}
                                  onClick={() => setMenuOpen(false)}
                                  className="flex items-center gap-2.5 px-10 py-3 text-sm text-white/65 hover:text-white hover:bg-white/[0.06] border-b border-white/[0.04] transition-colors"
                                >
                                  <i className={`fas ${icon} text-accent w-4 text-xs flex-shrink-0`} />
                                  {dl}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : highlight ? (
                    /* Hub flagship */
                    <NavLink
                      to={to}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 w-full px-6 py-3.5 text-base font-bold border-b border-white/[0.06] transition-colors ${
                          isActive
                            ? 'text-accent bg-accent/10'
                            : 'text-accent hover:bg-accent/10'
                        }`
                      }
                    >
                      <i className="fas fa-bolt text-xs" />
                      {label}
                      <span className="ml-auto text-[0.65rem] bg-accent/20 text-accent px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
                        Flagship
                      </span>
                    </NavLink>
                  ) : (
                    <NavLink
                      to={to}
                      end={to === '/'}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block w-full px-6 py-3.5 text-base font-medium border-b border-white/[0.06] transition-colors ${
                          isActive
                            ? 'text-white bg-white/[0.08] border-l-[3px] border-l-primary pl-[calc(1.5rem-3px)]'
                            : 'text-white/75 hover:text-white hover:bg-white/[0.05]'
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  )}
                </li>
              ))}

              {/* Get Started in mobile menu */}
              <li className="px-6 py-4">
                <Link to="/get-started" className="btn-primary text-sm w-full justify-center">
                  Get Started
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
