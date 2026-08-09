import { lazy, Suspense, useState } from 'react'

const GlobeScene = lazy(() => import('../three/GlobeScene'))

function shouldRender() {
  if (typeof window === 'undefined') return false
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches
  return !reducedMotion && isDesktop
}

// Desktop-only decorative WebGL globe. Lazy-loaded so the three.js bundle is
// never fetched on mobile or for anyone with reduced-motion set — the viewport
// check happens before the lazy import ever mounts (not just a CSS `hidden`
// class), since React still fetches a lazy chunk for anything it renders
// regardless of whether CSS ends up hiding it.
export default function GlobeAccent({ className = '' }) {
  const [enabled] = useState(shouldRender)

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
