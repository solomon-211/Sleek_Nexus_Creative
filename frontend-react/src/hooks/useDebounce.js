import { useState, useEffect } from 'react'

/**
 * useDebounce — delays updating a value until `delay` ms have passed
 * since the last change. Useful for search inputs to avoid firing on
 * every keystroke.
 *
 * @param {any}    value - The value to debounce
 * @param {number} delay - Milliseconds to wait (default 300)
 * @returns {any}  The debounced value
 *
 * @example
 * const debouncedQuery = useDebounce(searchInput, 300)
 * useEffect(() => { fetchResults(debouncedQuery) }, [debouncedQuery])
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
