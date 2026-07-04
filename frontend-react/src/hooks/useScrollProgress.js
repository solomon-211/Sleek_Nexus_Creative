import { useState, useEffect } from 'react'

/**
 * useScrollProgress — returns a 0–100 number representing how far
 * the user has scrolled down the page. Updates on each scroll event
 * via requestAnimationFrame for smooth performance.
 *
 * @returns {number} scroll progress 0–100
 *
 * @example
 * const progress = useScrollProgress()
 * return <div style={{ width: `${progress}%` }} className="progress-bar" />
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const update = () => {
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop
      const maxScroll = doc.scrollHeight - window.innerHeight
      setProgress(maxScroll > 0 ? Math.min((scrollTop / maxScroll) * 100, 100) : 0)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update() // initial value
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return progress
}

/**
 * useScrollDirection — returns 'up' | 'down' | null based on scroll direction.
 * Useful for hiding/showing the navbar on scroll.
 *
 * @param {number} threshold - pixels to scroll before direction registers (default 5)
 * @returns {'up'|'down'|null}
 */
export function useScrollDirection(threshold = 5) {
  const [direction, setDirection] = useState(null)

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      const diff = y - lastY
      if (Math.abs(diff) >= threshold) {
        setDirection(diff > 0 ? 'down' : 'up')
        lastY = y
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return direction
}
