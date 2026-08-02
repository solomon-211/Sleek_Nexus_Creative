import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * FlipCard — a 3D card that flips over on hover to reveal `back`, with a subtle
 * cursor-tracked nodding tilt layered on top (rotateX, driven by vertical mouse
 * position) so the flip itself doesn't read as a flat, mechanical rotation. The
 * flip lives on the Y axis and the tilt lives on the X axis, so the two never
 * fight over the same transform. Also flips on tap/click for touch devices.
 *
 * Requires an explicit height on `className` (e.g. "h-60") since both faces are
 * absolutely positioned and don't contribute to normal document flow height.
 */
export default function FlipCard({ front, back, className = '', ...motionProps }) {
  const ref = useRef(null)
  const [flipped, setFlipped] = useState(false)

  const tiltX = useMotionValue(0)
  const springTiltX = useSpring(tiltX, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const py = (e.clientY - rect.top) / rect.height - 0.5
    tiltX.set(py * -10)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ perspective: 1200 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setFlipped(false); tiltX.set(0) }}
      onClick={() => setFlipped(f => !f)}
      {...motionProps}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d', rotateX: springTiltX }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
          {front}
        </div>
        <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          {back}
        </div>
      </motion.div>
    </motion.div>
  )
}
