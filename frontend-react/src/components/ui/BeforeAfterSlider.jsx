import { useRef, useState, useCallback } from 'react'

// A drag-to-reveal comparison slider — the classic before/after image-slider
// mechanic, adapted to render two content panels instead of two photos (we
// don't have literal "before" screenshots for these projects, but we do have
// real challenge/solution copy, which is what's rendered on each side).
export default function BeforeAfterSlider({ before, after }) {
  const containerRef = useRef(null)
  const [position, setPosition] = useState(50)
  const dragging = useRef(false)

  const updateFromClientX = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  const onPointerDown = (e) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromClientX(e.clientX)
  }
  const onPointerMove = (e) => { if (dragging.current) updateFromClientX(e.clientX) }
  const onPointerUp = () => { dragging.current = false }

  return (
    <div ref={containerRef} className="relative w-full h-full select-none overflow-hidden rounded-xl">
      {/* After — base layer, always fully visible */}
      <div className="absolute inset-0">{after}</div>

      {/* Before — clipped overlay, purely visual so it never affects layout */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        {before}
      </div>

      {/* Drag handle */}
      <div
        role="slider"
        aria-label="Drag to compare before and after"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        className="absolute top-0 bottom-0 w-1 bg-white/90 touch-none cursor-pointer"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPosition(p => Math.max(0, p - 5))
          if (e.key === 'ArrowRight') setPosition(p => Math.min(100, p + 5))
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center">
          <i className="fas fa-arrows-left-right text-dark text-xs" />
        </div>
      </div>
    </div>
  )
}
