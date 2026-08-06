import { useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * SpotlightCard — a card with a radial spotlight that tracks the cursor.
 * The spotlight is painted via a CSS custom property so it never triggers
 * a React re-render on every mousemove — only the inline style string changes.
 */
export default function SpotlightCard({ children, className = '', spotlightColor = 'rgba(254,127,45,0.12)', ...motionProps }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ref.current.style.setProperty('--sx', `${x}px`)
    ref.current.style.setProperty('--sy', `${y}px`)
    ref.current.style.setProperty('--sc', spotlightColor)
  }

  const handleMouseLeave = () => {
    ref.current.style.setProperty('--sx', '-9999px')
    ref.current.style.setProperty('--sy', '-9999px')
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        '--sx': '-9999px',
        '--sy': '-9999px',
        '--sc': spotlightColor,
      }}
      {...motionProps}
    >
      {/* Spotlight layer — sits above bg, below content */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(400px circle at var(--sx) var(--sy), var(--sc), transparent 70%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
