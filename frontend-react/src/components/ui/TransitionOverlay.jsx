import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { TransitionContext } from '../../lib/transitionContext'

// Mounted once in Layout. Holds the click origin that triggers the overlay
// below, and clears it shortly after the route actually changes so the
// circle has time to fully cover the viewport before receding.
export function TransitionProvider({ children }) {
  const [origin, setOrigin] = useState(null)
  const location = useLocation()

  useEffect(() => {
    if (!origin) return
    const t = setTimeout(() => setOrigin(null), 550)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <TransitionContext.Provider value={(x, y) => setOrigin({ x, y })}>
      {children}
      <AnimatePresence>
        {origin && (
          <motion.div
            className="fixed inset-0 z-[10001] bg-primary pointer-events-none"
            initial={{ clipPath: `circle(0% at ${origin.x}px ${origin.y}px)` }}
            animate={{ clipPath: `circle(150% at ${origin.x}px ${origin.y}px)` }}
            exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  )
}
