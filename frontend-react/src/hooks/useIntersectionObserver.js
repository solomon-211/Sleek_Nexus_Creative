import { useState, useEffect, useRef } from 'react'

/**
 * useIntersectionObserver — returns whether an element is in the viewport.
 * Useful for triggering animations, lazy-loading, or counter start.
 *
 * @param {IntersectionObserverInit} options
 * @returns {{ ref: RefObject, isIntersecting: boolean }}
 *
 * @example
 * const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 })
 * return <div ref={ref}>{isIntersecting ? 'Visible!' : 'Hidden'}</div>
 */
export function useIntersectionObserver(options = {}) {
  const ref = useRef(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, { threshold: 0.1, ...options })

    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return { ref, isIntersecting }
}

/**
 * useOnceIntersecting — like useIntersectionObserver but only fires once.
 * After the element enters the viewport the observer disconnects.
 * Perfect for "animate in once" effects.
 */
export function useOnceIntersecting(options = {}) {
  const ref = useRef(null)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || hasEntered) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasEntered(true)
        observer.disconnect()
      }
    }, { threshold: 0.1, ...options })

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasEntered, options])

  return { ref, hasEntered }
}
