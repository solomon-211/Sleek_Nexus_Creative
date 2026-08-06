import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const PAGES = [
  { icon: 'fa-house', label: 'Home', hint: 'Overview & featured work', to: '/' },
  { icon: 'fa-users', label: 'About Us', hint: 'Our story, mission, and team', to: '/about' },
  { icon: 'fa-layer-group', label: 'Services', hint: 'Everything we build', to: '/services' },
  { icon: 'fa-code', label: 'Web Development', hint: 'Custom websites & web apps', to: '/services/web-dev' },
  { icon: 'fa-mobile-alt', label: 'Mobile App Development', hint: 'iOS, Android & cross-platform', to: '/services/mobile-apps' },
  { icon: 'fa-pencil-ruler', label: 'UI/UX Design', hint: 'Research, wireframes, interfaces', to: '/services/ui-ux' },
  { icon: 'fa-palette', label: 'Branding & Identity', hint: 'Logos, brand systems', to: '/services/branding' },
  { icon: 'fa-laptop-code', label: 'IT Consulting', hint: 'Strategy & digital transformation', to: '/services/consulting' },
  { icon: 'fa-envelope', label: 'Contact', hint: 'Get in touch with the team', to: '/contact' },
  { icon: 'fa-bolt', label: 'Innovation Hub', hint: 'Real projects, SDG alignment & our mission', to: '/innovation-hub' },
  { icon: 'fa-rocket', label: 'Get Started', hint: 'Start your project', to: '/get-started' },
  { icon: 'fa-shield-halved', label: 'Privacy Policy', hint: 'Legal', to: '/privacy' },
  { icon: 'fa-file-contract', label: 'Terms of Service', hint: 'Legal', to: '/terms' },
]

const ACTIONS = [
  { icon: 'fab fa-whatsapp', label: 'Chat on WhatsApp', hint: 'Message us directly', href: 'https://wa.me/211925277700?text=' + encodeURIComponent("Hi Sleek Nexus Creative! I'd like to talk about a project."), external: true },
  { icon: 'fa-phone', label: 'Call Us', hint: '+211 925 277 700', href: 'tel:+211925277700', external: true },
  { icon: 'fa-envelope', label: 'Email Us', hint: 'info@sleeknexuscreative.com', href: 'mailto:info@sleeknexuscreative.com', external: true },
  { icon: 'fa-graduation-cap', label: 'Visit EduPortal Live', hint: 'Our live education platform', href: 'https://eduportalss.solomonleek.tech', external: true },
]

const ALL_ITEMS = [
  ...PAGES.map(p => ({ ...p, group: 'Pages' })),
  ...ACTIONS.map(a => ({ ...a, group: 'Quick Actions' })),
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const openRef = useRef(false)
  const navigate = useNavigate()

  useEffect(() => { openRef.current = open }, [open])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL_ITEMS
    return ALL_ITEMS.filter(item =>
      item.label.toLowerCase().includes(q) || item.hint?.toLowerCase().includes(q)
    )
  }, [query])

  // Opens the palette and resets its search state together, in direct response
  // to a real user event (keyboard shortcut or trigger button) — not reactively
  // via an effect watching `open`, which would call setState synchronously as
  // soon as the effect body runs.
  const revealPalette = () => {
    setQuery('')
    setActiveIndex(0)
    setOpen(true)
  }

  // Global ⌘K / Ctrl+K to toggle, Esc to close
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (openRef.current) setOpen(false)
        else revealPalette()
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Lets a visible trigger button (e.g. in the Navbar) open the palette without
  // prop-drilling or a dedicated context — CommandPalette mounts once in Layout.
  useEffect(() => {
    window.addEventListener('snc-open-command-palette', revealPalette)
    return () => window.removeEventListener('snc-open-command-palette', revealPalette)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const t = setTimeout(() => inputRef.current?.focus(), 10)
      return () => { clearTimeout(t); document.body.style.overflow = '' }
    }
  }, [open])

  const onQueryChange = (val) => {
    setQuery(val)
    setActiveIndex(0)
  }

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const go = (item) => {
    if (!item) return
    setOpen(false)
    if (item.external) window.open(item.href, '_blank', 'noopener,noreferrer')
    else navigate(item.to)
  }

  const onInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); go(results[activeIndex]) }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[10002] bg-dark/70 backdrop-blur-sm flex items-start justify-center px-4 pt-[12vh]"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-xl bg-white rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.45)] border border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              <i className="fas fa-magnifying-glass text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search pages, services, or quick actions…"
                className="flex-1 bg-transparent outline-none text-dark placeholder:text-muted text-sm sm:text-base"
                aria-label="Search"
              />
              <kbd className="hidden sm:inline-block text-[0.65rem] font-semibold text-muted bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5">Esc</kbd>
            </div>

            <div ref={listRef} className="max-h-[60vh] overflow-y-auto py-2">
              {results.length === 0 && (
                <p className="text-center text-muted text-sm py-10">No matches for "{query}"</p>
              )}
              {results.map((item, i) => {
                const showGroupLabel = i === 0 || results[i - 1].group !== item.group
                return (
                  <div key={item.label}>
                    {showGroupLabel && (
                      <p className="px-5 pt-3 pb-1 text-[0.65rem] font-bold uppercase tracking-widest text-muted/70">{item.group}</p>
                    )}
                    <button
                      data-active={i === activeIndex}
                      onClick={() => go(item)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${i === activeIndex ? 'bg-primary/8' : ''}`}
                    >
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${i === activeIndex ? 'bg-primary text-white' : 'bg-gray-100 text-primary'}`}>
                        <i className={item.icon.startsWith('fa') && !item.icon.startsWith('fab') ? `fas ${item.icon}` : item.icon} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-dark truncate">{item.label}</span>
                        {item.hint && <span className="block text-xs text-muted truncate">{item.hint}</span>}
                      </span>
                      {item.external && <i className="fas fa-arrow-up-right-from-square text-muted text-xs ml-auto flex-shrink-0" />}
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="hidden sm:flex items-center gap-4 px-5 py-2.5 border-t border-gray-100 text-[0.7rem] text-muted">
              <span className="flex items-center gap-1"><kbd className="bg-gray-100 border border-gray-200 rounded px-1.5">↑↓</kbd> Navigate</span>
              <span className="flex items-center gap-1"><kbd className="bg-gray-100 border border-gray-200 rounded px-1.5">Enter</kbd> Select</span>
              <span className="flex items-center gap-1"><kbd className="bg-gray-100 border border-gray-200 rounded px-1.5">Esc</kbd> Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
