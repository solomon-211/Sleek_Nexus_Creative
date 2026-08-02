import { useEffect, useRef, useState } from 'react'

// Counts up to `value` once it scrolls into view. Re-triggerable per mount (each
// accordion open remounts this via key), so it counts up again every time a case
// study is opened rather than only once ever.
export default function AnimatedMetric({ value, suffix = '', label, duration = 1200 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const steps = 40
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) { setCount(value); clearInterval(timer) }
        else setCount(Math.floor(current))
      }, duration / steps)
    }, { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-4xl font-heading font-black text-primary leading-none mb-1">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-muted text-xs font-medium">{label}</p>
    </div>
  )
}
