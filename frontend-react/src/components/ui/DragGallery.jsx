import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * DragGallery — a momentum-based, draggable horizontal strip. Wrap fixed-width
 * items (e.g. `w-[320px] flex-shrink-0`) as children; drag constraints are
 * measured from the actual rendered content width, so it works with any
 * number/size of children without hardcoding a scroll distance.
 */
export default function DragGallery({ children, className = '' }) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const [constraint, setConstraint] = useState(0)

  useEffect(() => {
    const update = () => {
      if (!containerRef.current || !trackRef.current) return
      setConstraint(Math.min(0, containerRef.current.offsetWidth - trackRef.current.scrollWidth))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [children])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div
        ref={trackRef}
        className="flex gap-6 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: constraint, right: 0 }}
        dragElastic={0.08}
        dragTransition={{ power: 0.25, timeConstant: 200 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
