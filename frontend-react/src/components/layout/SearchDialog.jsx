import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { search } from '../../lib/search-index'

/**
 * SearchDialog — a plain site search: type, see matching pages, click one.
 */
export default function SearchDialog({ open, onClose }) {
  return <AnimatePresence>{open && <SearchPanel onClose={onClose} />}</AnimatePresence>
}

// Mounted only while open, so every opening starts with an empty search.
function SearchPanel({ onClose }) {
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const results = search(query)

  // Focus the input, close on Escape, and stop the page scrolling behind.
  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = overflow }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[10001] flex items-start justify-center px-4 pt-[12vh]"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
    >
      <div className="absolute inset-0 bg-dark/70" onClick={onClose} aria-hidden="true" />

      <div role="dialog" aria-modal="true" aria-label="Search the site" className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 border-b border-gray-200">
          <i className="fas fa-magnifying-glass text-gray-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the site…"
            className="flex-1 py-4 text-base text-dark placeholder:text-gray-400 bg-transparent border-0 focus:ring-0 focus:outline-none"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="text-gray-400 hover:text-dark">
            <i className="fas fa-xmark" />
          </button>
        </div>

        {query.trim() && (
          <ul className="max-h-[50vh] overflow-y-auto p-2">
            {results.length ? results.map((item) => {
              const body = (
                <>
                  <span className="block text-sm font-semibold text-dark">{item.title}</span>
                  <span className="block text-xs text-muted line-clamp-1">{item.desc}</span>
                </>
              )
              return (
                <li key={`${item.title}-${item.to || item.href}`}>
                  {item.href
                    ? <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClose} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50">{body}</a>
                    : <Link to={item.to} onClick={onClose} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50">{body}</Link>}
                </li>
              )
            }) : (
              <li className="px-3 py-6 text-center text-sm text-muted">No results for “{query}”.</li>
            )}
          </ul>
        )}
      </div>
    </motion.div>
  )
}
