import { lazy, Suspense, useState } from 'react'

const HeroScene = lazy(() => import('../three/HeroScene'))

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Desktop-only decorative WebGL accent behind the hero card. Lazy-loaded so the
// three.js/@react-three/fiber bundle is never fetched on mobile or for anyone
// with reduced-motion set — only Home.jsx pays for it, and only when it'll render.
export default function Hero3DAccent({ className = '' }) {
  const [enabled] = useState(() => !prefersReducedMotion())

  if (!enabled) return null

  return (
    <div className={`hidden lg:flex pointer-events-none ${className}`} aria-hidden="true">
      <div className="w-[420px] h-[420px]">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>
    </div>
  )
}
