import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PAGES = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Web Development', to: '/services/web-dev' },
  { label: 'Mobile App Development', to: '/services/mobile-apps' },
  { label: 'UI/UX Design', to: '/services/ui-ux' },
  { label: 'Branding & Identity', to: '/services/branding' },
  { label: 'IT Consulting', to: '/services/consulting' },
  { label: 'Contact', to: '/contact' },
  { label: 'Innovation Hub', to: '/innovation-hub' },
  { label: 'Get Started', to: '/get-started' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
]

// A plain, always-visible search input with a lightweight results dropdown —
// no keyboard-shortcut modal/overlay, just an inline bar in the navbar.
export default function SearchBar({ className = '', onNavigate }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const wrapRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()
  const resultsId = useId()

  const q = query.trim().toLowerCase()
  const results = q ? PAGES.filter(p => p.label.toLowerCase().includes(q)) : []

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const go = (to) => {
    setQuery('')
    setOpen(false)
    navigate(to)
    onNavigate?.()
  }

  const onChange = (val) => {
    setQuery(val)
    setActiveIndex(0)
    setOpen(true)
  }

  const clear = () => {
    setQuery('')
    setActiveIndex(0)
  }

  const onKeyDown = (e) => {
    if (!open || results.length === 0) {
      if (e.key === 'Escape') e.currentTarget.blur()
      return
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); go(results[activeIndex].to) }
    else if (e.key === 'Escape') { setOpen(false); e.currentTarget.blur() }
  }

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <div className={`flex items-center gap-2 bg-white/10 rounded-lg border border-white/15 px-3 py-1.5 transition-colors focus-within:border-primary/60 focus-within:bg-white/[0.14] ${open && q ? 'bg-white/[0.14]' : ''}`}>
        <i className="fas fa-magnifying-glass text-white/50 text-xs flex-shrink-0" />
        <input
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => q && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search pages…"
          className="appearance-none border-0 bg-transparent outline-none shadow-none ring-0 focus:ring-0 focus:outline-none text-xs text-white placeholder:text-white/40 w-full min-w-0"
          aria-label="Search pages"
          role="combobox"
          aria-expanded={open && q.length > 0}
          aria-controls={resultsId}
          aria-autocomplete="list"
        />
        {query && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear search"
            className="flex-shrink-0 text-white/50 hover:text-white transition-colors"
          >
            <i className="fas fa-xmark text-xs" />
          </button>
        )}
      </div>

      {open && q && (
        <ul
          id={resultsId}
          ref={listRef}
          role="listbox"
          className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.25)] border border-gray-100 py-2 z-50 max-h-72 overflow-y-auto list-none"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-muted text-center">No matches for "{query}"</li>
          ) : (
            results.map((item, i) => (
              <li key={item.to} role="option" aria-selected={i === activeIndex} data-active={i === activeIndex}>
                <button
                  onClick={() => go(item.to)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    i === activeIndex ? 'bg-primary/[0.08] text-primary' : 'text-dark-soft'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
