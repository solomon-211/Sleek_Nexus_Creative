import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * TiltCard — wraps a card so it tilts in 3D toward the cursor on hover, and
 * forwards standard framer-motion entrance props (variants/initial/whileInView/
 * viewport/transition) so it can also handle its own scroll-in reveal.
 *
 * Inert on touch devices — mousemove simply never fires there, so the card just
 * sits flat, no special-casing needed.
 */
export default function TiltCard({ children, className = '', max = 8, ...motionProps }) {
  const ref = useRef(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width - 0.5)
    py.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}
