import { useRef, cloneElement } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * MagneticButton — wraps a button/link so it subtly pulls toward the cursor on
 * hover, then springs back on leave. Meant for a small number of hero-level CTAs,
 * not every interactive element — overused, this reads as jumpy rather than premium.
 *
 * `liquid` layers a gooey, asymmetric border-radius wobble (see .liquid-hover in
 * index.css) onto the actual child element via cloneElement — reserved for an
 * even smaller set of signature CTAs than the magnetic pull alone.
 */
export default function MagneticButton({ children, className = '', strength = 0.35, liquid = false }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.5 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const content = liquid
    ? cloneElement(children, { className: `${children.props.className || ''} liquid-hover` })
    : children

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {content}
    </motion.div>
  )
}
