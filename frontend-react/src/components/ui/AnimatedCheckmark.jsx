import { motion } from 'framer-motion'

// Circle strokes in first, then the check draws on top of it — the standard
// "success" micro-animation, built with pathLength rather than a GIF/Lottie
// so it's a few bytes of SVG instead of an asset to load.
export default function AnimatedCheckmark({ className = 'w-6 h-6 text-green-600' }) {
  return (
    <svg viewBox="0 0 52 52" className={className} fill="none">
      <motion.circle
        cx="26" cy="26" r="23"
        stroke="currentColor" strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
      <motion.path
        d="M15 27l7.5 7.5L37 18"
        stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.35 }}
      />
    </svg>
  )
}
