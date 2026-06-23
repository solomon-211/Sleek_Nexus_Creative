import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', to: '/' },
  {
    label: 'About', to: '/about',
    dropdown: [
      { icon: 'fa-book-open', label: 'Our Story', to: '/about/our-story' },
      { icon: 'fa-users', label: 'Team', to: '/about/team' },
      { icon: 'fa-bullseye', label: 'Mission & Vision', to: '/about/mission-vision' },
      { icon: 'fa-briefcase', label: 'Careers', to: '/careers' },
    ],
  },
  {
    label: 'Services', to: '/services',
    dropdown: [
      { icon: 'fa-code', label: 'Web Development', to: '/services/web-dev' },
      { icon: 'fa-mobile-alt', label: 'Mobile Apps', to: '/services/mobile-apps' },
      { icon: 'fa-pencil-ruler', label: 'UI/UX Design', to: '/services/ui-ux' },
      { icon: 'fa-graduation-cap', label: 'E-Learning Solutions', to: '/services/elearning' },
      { icon: 'fa-palette', label: 'Branding', to: '/services/branding' },
      { icon: 'fa-laptop-code', label: 'Digital Consulting', to: '/services/consulting' },
    ],
  },
  {
    label: 'Projects', to: '/projects',
    dropdown: [
      { icon: 'fa-th', label: 'Portfolio', to: '/projects/portfolio' },
      { icon: 'fa-chart-bar', label: 'Case Studies', to: '/projects/case-studies' },
      { icon: 'fa-trophy', label: 'Client Success Stories', to: '/projects/client-success' },
    ],
  },
  {
    label: 'Courses', to: '/courses',
    dropdown: [
      { icon: 'fa-search', label: 'Browse Courses', to: '/courses/browse' },
      { icon: 'fa-gift', label: 'Free Resources', to: '/courses/free-resources' },
      { icon: 'fa-certificate', label: 'Certifications', to: '/courses/certifications' },
      { icon: 'fa-flask', label: 'Student Projects', to: '/courses/student-projects' },
    ],
  },
  {
    label: 'Resources', to: '/resources',
    dropdown: [
      { icon: 'fa-rss', label: 'Blog', to: '/blog' },
      { icon: 'fa-map', label: 'Guides', to: '/guides' },
      { icon: 'fa-question-circle', label: 'FAQs', to: '/faqs' },
      { icon: 'fa-download', label: 'Downloads', to: '/downloads' },
    ],
  },
  {
    label: 'Contact', to: '/contact',
    dropdown: [
      { icon: 'fa-envelope', label: 'Contact Us', to: '/contact' },
      { icon: 'fa-file-invoice-dollar', label: 'Get a Quote', to: '/quote' },
      { icon: 'fa-calendar-check', label: 'Book Consultation', to: '/book-consultation' },
    ],
  },
  {
    label: 'Join Us', to: '/join',
    dropdown: [
      { icon: 'fa-briefcase', label: 'Careers', to: '/careers' },
      { icon: 'fa-user-graduate', label: 'Internships', to: '/internships' },
      { icon: 'fa-hands-helping', label: 'Volunteer', to: '/volunteer' },
      { icon: 'fa-chalkboard-teacher', label: 'Become a Trainer', to: '/trainer' },
      { icon: 'fa-user-tie', label: 'Become a Mentor', to: '/mentor' },
      { icon: 'fa-users', label: 'Join Our Community', to: '/community' },
      { icon: 'fa-door-open', label: 'Open Positions', to: '/open-positions' },
    ],
  },
]

function DropdownMenu({ items }) {
  return (
    <motion.ul
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="absolute top-[calc(100%+8px)] left-0 bg-white rounded-xl shadow-[0_8px_32px_rgba(15,23,42,0.13)] border border-dark/[0.07] min-w-[210px] py-2 z-50 list-none"
    >
      {items.map(({ icon, label, to }) => (
        <li key={to}>
          <Link
            to={to}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-dark-soft hover:text-primary hover:bg-primary/[0.05] transition-colors rounded-lg mx-1"
          >
            <i className={`fas ${icon} text-primary w-4 text-xs`} />
            {label}
          </Link>
        </li>
      ))}
    </motion.ul>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const location = useLocation()
  const navRef = useRef(null)

  // Close any open menus when the route changes (navigation is an external event here).
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMenuOpen(false); setOpenDropdown(null) }, [location])

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
    const handler = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setOpenDropdown(null) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const linkClass = ({ isActive }) =>
    `text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap ${isActive ? 'text-primary bg-primary/[0.07] font-semibold' : 'text-dark-soft hover:text-primary hover:bg-primary/[0.06]'}`

  return (
    <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-[9999] bg-white transition-shadow duration-300 ${scrolled ? 'shadow-[0_2px_0_rgba(196,30,58,0.15),0_8px_32px_rgba(15,23,42,0.1)]' : 'shadow-[0_1px_0_rgba(15,23,42,0.08)]'}`}>
      <div className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-primary to-accent rounded-r-sm transition-[width] duration-100" style={{ width: `${progress}%` }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px] gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group" aria-label="Sleek Nexus Creative Home">
            <span className="flex items-center justify-center w-[46px] h-[46px] bg-white rounded-full border-2 border-primary/20 shadow-[0_2px_10px_rgba(196,30,58,0.25)] text-[0.78rem] font-black font-heading tracking-wide transition-transform duration-300 group-hover:scale-110">
              <span className="text-primary">S</span>
              <span className="text-accent">N</span>
              <span className="text-primary">C</span>
            </span>
            <span className="text-[1.05rem] font-extrabold font-heading leading-none whitespace-nowrap">
              <span className="text-primary">Sleek </span>
              <span className="text-accent">Nexus</span>
              <span className="text-primary"> Creative</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ label, to, dropdown }) => (
              <li key={to} className="relative"
                onMouseEnter={() => dropdown && setOpenDropdown(label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {dropdown ? (
                  <button
                    className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap ${openDropdown === label ? 'text-primary bg-primary/[0.07]' : 'text-dark-soft hover:text-primary hover:bg-primary/[0.06]'}`}
                    onClick={() => setOpenDropdown(openDropdown === label ? null : label)}
                  >
                    {label}
                    <i className={`fas fa-chevron-down text-[0.6rem] transition-transform duration-200 ${openDropdown === label ? 'rotate-180' : ''}`} />
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

          {/* Partner + Donate */}
          <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
            <Link to="/get-started" className="btn-primary text-sm">Get Started</Link>
          </div>

          {/* Hamburger */}
          <button
            className={`lg:hidden flex flex-col items-center justify-center gap-[5px] w-11 h-11 rounded-[10px] border-[1.5px] transition-all duration-200 ${menuOpen ? 'bg-primary border-primary' : 'bg-primary/[0.08] border-primary/20'}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span className={`w-[22px] h-[2.5px] rounded-sm transition-all duration-300 ${menuOpen ? 'bg-white rotate-45 translate-y-[7px]' : 'bg-primary'}`} />
            <span className={`w-[22px] h-[2.5px] rounded-sm transition-all duration-300 ${menuOpen ? 'bg-white opacity-0 scale-x-0' : 'bg-primary'}`} />
            <span className={`w-[22px] h-[2.5px] rounded-sm transition-all duration-300 ${menuOpen ? 'bg-white -rotate-45 -translate-y-[7px]' : 'bg-primary'}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-dark/[0.07] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.08)] max-h-[80vh] overflow-y-auto"
          >
            <ul className="py-2">
              {navLinks.map(({ label, to, dropdown }) => (
                <li key={to}>
                  {dropdown ? (
                    <>
                      <button
                        className="w-full flex items-center justify-between px-6 py-3.5 text-base font-medium border-b border-dark/[0.05] text-dark-soft"
                        onClick={() => setMobileOpen(mobileOpen === label ? null : label)}
                      >
                        {label}
                        <i className={`fas fa-chevron-down text-primary text-xs transition-transform duration-200 ${mobileOpen === label ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileOpen === label && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-primary/[0.03] list-none"
                          >
                            {dropdown.map(({ icon, label: dl, to: dt }) => (
                              <li key={dt}>
                                <Link to={dt} className="flex items-center gap-2.5 px-10 py-2.5 text-sm text-muted hover:text-primary border-b border-dark/[0.04]">
                                  <i className={`fas ${icon} text-primary w-4 text-xs`} /> {dl}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink
                      to={to}
                      end={to === '/'}
                      className={({ isActive }) =>
                        `block w-full px-6 py-3.5 text-base font-medium border-b border-dark/[0.05] transition-colors ${isActive ? 'text-primary border-l-[3px] border-l-primary pl-[calc(1.5rem-3px)]' : 'text-dark-soft hover:text-primary hover:bg-primary/[0.04]'}`
                      }
                    >
                      {label}
                    </NavLink>
                  )}
                </li>
              ))}
              <li className="px-6 py-4">
                <Link to="/get-started" className="btn-primary text-sm w-full justify-center">Get Started</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
