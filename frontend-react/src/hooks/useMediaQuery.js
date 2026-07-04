import { useState, useEffect } from 'react'

/**
 * useMediaQuery — returns true when the given CSS media query matches.
 * Re-evaluates on resize. Safe to call during SSR (returns false).
 *
 * @param {string} query - CSS media query string
 * @returns {boolean}
 *
 * @example
 * const isMobile  = useMediaQuery('(max-width: 768px)')
 * const isDark    = useMediaQuery('(prefers-color-scheme: dark)')
 * const isTablet  = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia(query)
    const handler = (e) => setMatches(e.matches)

    // Modern API
    if (mq.addEventListener) {
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    } else {
      // Legacy Safari fallback
      mq.addListener(handler)
      return () => mq.removeListener(handler)
    }
  }, [query])

  return matches
}

// ── Convenience exports ───────────────────────────────────────────────────────

/** true on screens ≤ 768px */
export const useIsMobile  = () => useMediaQuery('(max-width: 768px)')

/** true on screens between 769px and 1024px */
export const useIsTablet  = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)')

/** true on screens ≥ 1025px */
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)')

/** true when the user prefers reduced motion */
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
