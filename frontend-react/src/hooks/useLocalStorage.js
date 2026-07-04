import { useState, useEffect, useCallback } from 'react'

/**
 * useLocalStorage — synced useState that persists to localStorage.
 * Safe in SSR (returns initialValue if localStorage is unavailable).
 *
 * @param {string} key          - localStorage key
 * @param {any}    initialValue - Default value when key not set yet
 * @returns {[any, Function, Function]} [value, setValue, removeValue]
 *
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'light')
 */
export function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    try {
      const next = value instanceof Function ? value(stored) : value
      setStored(next)
      window.localStorage.setItem(key, JSON.stringify(next))
    } catch (err) {
      console.warn(`[useLocalStorage] Failed to set "${key}":`, err)
    }
  }, [key, stored])

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStored(initialValue)
    } catch (err) {
      console.warn(`[useLocalStorage] Failed to remove "${key}":`, err)
    }
  }, [key, initialValue])

  // Keep in sync across tabs
  useEffect(() => {
    const handler = (e) => {
      if (e.key === key) {
        try {
          setStored(e.newValue ? JSON.parse(e.newValue) : initialValue)
        } catch {
          setStored(initialValue)
        }
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [key, initialValue])

  return [stored, setValue, removeValue]
}
