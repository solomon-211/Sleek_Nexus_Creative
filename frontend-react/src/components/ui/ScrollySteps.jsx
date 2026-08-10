import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AUTO_ADVANCE_MS = 2000

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Steps advance on their own on a timer — not tied to the user's scroll position,
// so the section doesn't require anyone to scroll through it to see every step.
// Hovering, or the pause button, stops the auto-advance (WCAG 2.2.2 — moving
// content needs a way to pause it); reduced-motion users start paused by default.
export default function ScrollySteps({ eyebrow, heading, subheading, steps }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(prefersReducedMotion)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setActive(i => (i + 1) % steps.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [paused, steps.length])

  const step = steps[active]

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">{eyebrow}</p>
          <h2 className="section-title">{heading}</h2>
          <p className="section-subtitle">{subheading}</p>
        </div>

        <div
          className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-16 items-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(prefersReducedMotion())}
        >
          {/* Step rail — desktop only */}
          <div className="hidden lg:block relative pl-2">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gray-200" />
            <div
              className="absolute left-[19px] top-2 w-px bg-primary transition-[height] duration-300 ease-out"
              style={{ height: steps.length > 1 ? `${(active / (steps.length - 1)) * 100}%` : '0%' }}
            />
            <ul className="space-y-8 relative">
              {steps.map(({ num, title }, i) => (
                <li key={num}>
                  <button
                    onClick={() => setActive(i)}
                    className="flex items-center gap-4 text-left w-full"
                    aria-label={`Show step ${i + 1}: ${title}`}
                    aria-current={i === active}
                  >
                    <span
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all duration-300 ${
                        i === active
                          ? 'bg-primary border-primary text-white scale-110'
                          : i < active
                            ? 'bg-primary/15 border-primary/40 text-primary'
                            : 'bg-white border-gray-200 text-muted'
                      }`}
                    >
                      {i < active ? <i className="fas fa-check text-xs" /> : num}
                    </span>
                    <span className={`text-sm font-semibold transition-colors duration-300 ${i === active ? 'text-dark' : 'text-muted'}`}>{title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Active step panel */}
          <div className="relative min-h-[300px] sm:min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="card p-8 sm:p-10"
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-5xl sm:text-6xl font-heading font-black text-primary/10">{step.num}</span>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <i className={`fas ${step.icon} text-primary text-xl`} />
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-black text-dark mb-3">{step.title}</h3>
                <p className="text-muted leading-relaxed">{step.desc}</p>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots — mobile only, also tappable */}
            <div className="flex lg:hidden items-center justify-center gap-2 mt-6">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Show step ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-primary' : 'w-1.5 bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
