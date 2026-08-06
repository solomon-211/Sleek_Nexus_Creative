import { lazy, Suspense, useState } from 'react'

const GlobeScene = lazy(() => import('../three/GlobeScene'))

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Desktop-only decorative WebGL globe. Lazy-loaded so the three.js bundle is
// never fetched on mobile or for anyone with reduced-motion set.
export default function GlobeAccent({ className = '' }) {
  const [enabled] = useState(() => !prefersReducedMotion())

  if (!enabled) return null

  return (
    <div className={`hidden lg:flex pointer-events-none ${className}`} aria-hidden="true">
      <div className="w-full h-full">
        <Suspense fallback={null}>
          <GlobeScene />
        </Suspense>
      </div>
    </div>
  )
}
