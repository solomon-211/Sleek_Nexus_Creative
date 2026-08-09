import { lazy, Suspense, useState } from 'react'

const HeroScene = lazy(() => import('../three/HeroScene'))

function shouldRender() {
  if (typeof window === 'undefined') return false
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches
  return !reducedMotion && isDesktop
}

// Desktop-only decorative WebGL accent behind the hero card. Lazy-loaded so the
// three.js/@react-three/fiber bundle is never fetched on mobile or for anyone
// with reduced-motion set — only Home.jsx pays for it, and only when it'll render.
// The viewport check happens before the lazy import ever mounts (not just a CSS
// `hidden` class), since React still fetches a lazy chunk for anything it renders
// regardless of whether CSS ends up hiding it.
export default function Hero3DAccent({ className = '' }) {
  const [enabled] = useState(shouldRender)

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
