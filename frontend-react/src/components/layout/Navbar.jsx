import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Img from '../ui/Img'
import SearchDialog from './SearchDialog'

// ── Nav data ──────────────────────────────────────────────────────────────────
const navLinks = [
  { label: 'Home',    to: '/' },
  { label: 'About',   to: '/about' },
  {
    label: 'Services', to: '/services',
    dropdown: [
      { icon: 'fa-code',         label: 'Web Development', to: '/services/web-dev' },
      { icon: 'fa-mobile-alt',   label: 'Mobile Apps',     to: '/services/mobile-apps' },
      { icon: 'fa-pencil-ruler', label: 'UI/UX Design',    to: '/services/ui-ux' },
      { icon: 'fa-palette',      label: 'Branding',        to: '/services/branding' },
      { icon: 'fa-laptop-code',  label: 'IT Consulting',   to: '/services/consulting' },
    ],
  },
  {
    label: 'Work', to: '/work',
    products: [
      {
        badge: 'Coming Soon',
        sector: 'Hospitality',
        icon: 'fa-hotel',
        title: 'SNCInn',
        desc: 'Hotel management built for South Sudan',
        body: "Rooms, bookings, billing, and guest requests in one platform — designed for South Sudan's hotels, with offline-first support for power and internet outages.",
        to: '/products/sncinn',
      },
    ],
  },
  { label: 'Contact', to: '/contact' },
  { label: 'Hub',     to: '/innovation-hub', highlight: true },
]

// ── Services dropdown ─────────────────────────────────────────────────────────
function DropdownMenu({ items }) {
  return (
    <motion.ul
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.16 }}
      className="absolute top-[calc(100%+10px)] left-0 bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.25)] min-w-[220px] py-2 z-50 list-none"
    >
      {items.map(({ icon, label, to }) => (
        <li key={to}>
          <Link
            to={to}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm uppercase text-dark-soft hover:text-primary hover:bg-primary/[0.06] transition-colors rounded-lg mx-1"
          >
            <i className={`fas ${icon} text-primary w-4 text-xs flex-shrink-0`} />
            {label}
          </Link>
        </li>
      ))}
    </motion.ul>
  )
}

// ── Products dropdown — rich card per product ─────────────────────────────────
function ProductsDropdown({ items, parentTo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.16 }}
      className="absolute top-[calc(100%+10px)] left-0 bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.25)] w-[340px] p-3 z-50"
    >
      <Link
        to={parentTo}
        className="flex items-center justify-between px-3 py-2 mb-1 text-xs font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors rounded-lg hover:bg-primary/[0.05]"
      >
        All Work <i className="fas fa-arrow-right text-[0.6rem]" />
      </Link>
      <div className="h-px bg-gray-100 mb-2" />
      {items.map(({ badge, sector, icon, title, desc, body, to: pto }) => (
        <div key={pto} className="rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 bg-dark px-4 py-3">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <i className={`fas ${icon} text-primary text-sm`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-sm">{title}</span>
                {badge && (
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </div>
              <div className="text-white/50 text-xs uppercase tracking-widest">{sector}</div>
            </div>
          </div>
          <div className="px-4 py-3">
            <p className="text-xs font-semibold text-dark mb-1">{desc}</p>
            <p className="text-xs text-muted leading-relaxed mb-3">{body}</p>
            <Link
              to={pto}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary hover:gap-2.5 transition-all"
            >
              Learn More <i className="fas fa-arrow-right text-[0.6rem]" />
            </Link>
          </div>
        </div>
      ))}
    </motion.div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileOpen,   setMobileOpen]   = useState(null)
  const [scrolled,     setScrolled]     = useState(false)
  const [searchOpen,   setSearchOpen]   = useState(false)
  const location = useLocation()
  const navRef   = useRef(null)

  const [lastLocationKey, setLastLocationKey] = useState(location.key)
  if (lastLocationKey !== location.key) {
    setLastLocationKey(location.key)
    setMenuOpen(false)
    setOpenDropdown(null)
    setMobileOpen(null)
    setSearchOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenDropdown(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const linkClass = ({ isActive }) =>
    `text-sm font-medium uppercase px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
      isActive
        ? 'text-primary font-semibold'
        : 'text-white/80 hover:text-white hover:bg-white/[0.08]'
    }`

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 bg-dark ${
        scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.25)]' : ''
      }`}
    >
      <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/40" />

      <div className="container-page">
        <div className="flex items-center justify-between h-[72px] gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group" aria-label="Sleek Nexus Creative Home">
            <Img
              src="/images/snc-logo.png"
              alt=""
              sizes="46px"
              className="h-[46px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="flex flex-col leading-none">
              <span className="text-[0.8rem] sm:text-[0.95rem] font-extrabold font-heading uppercase whitespace-nowrap">
                <span className="text-[#FF8A3D]">Sleek Nexus Creative</span>
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5 ml-auto mr-3">
            {navLinks.map(({ label, to, dropdown, products, highlight }) => (
              <li
                key={to}
                className={`relative${highlight ? ' ml-3' : ''}`}
                onMouseEnter={() => (dropdown || products) && setOpenDropdown(label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {highlight ? (
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 text-sm font-bold uppercase px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap border ${
                        isActive
                          ? 'bg-accent text-white border-accent'
                          : 'text-accent border-accent/50 hover:bg-accent hover:text-white hover:border-accent'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ) : dropdown || products ? (
                  <button
                    className={`flex items-center gap-1 text-sm font-medium uppercase px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                      openDropdown === label
                        ? 'text-white bg-white/[0.12] shadow-[inset_0_-2px_0_0_#FE7F2D]'
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
                  {products && openDropdown === label && <ProductsDropdown items={products} parentTo={to} />}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* Search + Get Started */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search the site"
              className="flex items-center gap-2 h-10 px-3 rounded-lg bg-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.14] transition-all"
            >
              <i className="fas fa-magnifying-glass text-sm" />
              <span className="text-sm hidden xl:inline">Search</span>
            </button>
            <Link to="/get-started" className="btn-primary text-sm uppercase">
              Get Started
            </Link>
          </div>

          {/* Mobile search */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search the site"
            className="lg:hidden ml-auto w-11 h-11 rounded-[10px] border-[1.5px] bg-white/10 border-white/20 text-white flex items-center justify-center touch-manipulation"
          >
            <i className="fas fa-magnifying-glass" />
          </button>

          {/* Hamburger */}
          <button
            type="button"
            className={`lg:hidden flex flex-col items-center justify-center gap-[5px] w-11 h-11 rounded-[10px] border-[1.5px] transition-all duration-200 cursor-pointer touch-manipulation ${
              menuOpen ? 'bg-primary border-primary' : 'bg-white/10 border-white/20'
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

      {/* Mobile backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-dark/60"
            style={{ top: '72px', zIndex: 9997 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{ zIndex: 9998 }}
            className="lg:hidden relative border-t border-white/10 bg-dark shadow-[0_16px_40px_rgba(0,0,0,0.2)] max-h-[calc(100vh-72px)] overflow-y-auto"
          >
            <ul className="py-2">
              {navLinks.map(({ label, to, dropdown, products, highlight }) => (
                <li key={to}>
                  {dropdown ? (
                    <>
                      <button
                        className="w-full flex items-center justify-between px-6 py-3.5 text-base font-medium uppercase border-b border-white/[0.06] text-white/80 hover:text-white hover:bg-white/[0.05] transition-colors"
                        onClick={() => setMobileOpen(mobileOpen === label ? null : label)}
                      >
                        {label}
                        <i className={`fas fa-chevron-down text-accent text-xs transition-transform duration-200 ${mobileOpen === label ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileOpen === label && (
                          <motion.ul
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="bg-white/10 list-none overflow-hidden"
                          >
                            {dropdown.map(({ icon, label: dl, to: dt }) => (
                              <li key={dt}>
                                <Link
                                  to={dt}
                                  onClick={() => setMenuOpen(false)}
                                  className="flex items-center gap-2.5 px-10 py-3 text-sm uppercase text-white/65 hover:text-white hover:bg-white/[0.06] border-b border-white/[0.04] transition-colors"
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
                  ) : products ? (
                    <>
                      <button
                        className="w-full flex items-center justify-between px-6 py-3.5 text-base font-medium uppercase border-b border-white/[0.06] text-white/80 hover:text-white hover:bg-white/[0.05] transition-colors"
                        onClick={() => setMobileOpen(mobileOpen === label ? null : label)}
                      >
                        {label}
                        <i className={`fas fa-chevron-down text-accent text-xs transition-transform duration-200 ${mobileOpen === label ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileOpen === label && (
                          <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="bg-white/5 border-b border-white/[0.06]"
                          >
                            <Link
                              to={to}
                              onClick={() => setMenuOpen(false)}
                              className="flex items-center justify-between px-6 py-3 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-primary transition-colors"
                            >
                              All Work <i className="fas fa-arrow-right text-[0.6rem]" />
                            </Link>
                            {products.map(({ badge, sector, icon, title, body, to: pto }) => (
                              <div key={pto} className="mx-4 mb-4 rounded-xl border border-white/10 overflow-hidden">
                                <div className="flex items-center gap-3 bg-white/10 px-4 py-3">
                                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                                    <i className={`fas ${icon} text-primary text-xs`} />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-white font-bold text-sm">{title}</span>
                                      {badge && <span className="text-[0.6rem] font-bold uppercase bg-primary/20 text-primary px-2 py-0.5 rounded-full">{badge}</span>}
                                    </div>
                                    <div className="text-white/40 text-xs uppercase tracking-widest">{sector}</div>
                                  </div>
                                </div>
                                <div className="px-4 py-3">
                                  <p className="text-white/60 text-xs leading-relaxed mb-3">{body}</p>
                                  <Link
                                    to={pto}
                                    onClick={() => setMenuOpen(false)}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary"
                                  >
                                    Learn More <i className="fas fa-arrow-right text-[0.6rem]" />
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : highlight ? (
                    <NavLink
                      to={to}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 w-full px-6 py-3.5 text-base font-bold uppercase border-b border-white/[0.06] transition-colors ${
                          isActive ? 'text-accent bg-accent/10' : 'text-accent hover:bg-accent/10'
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
                        `block w-full px-6 py-3.5 text-base font-medium uppercase border-b border-white/[0.06] transition-colors ${
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

              <li className="px-6 py-4">
                <Link to="/get-started" className="btn-primary text-sm uppercase w-full justify-center">
                  Get Started
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  )
}
