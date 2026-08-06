import { motion } from 'framer-motion'

/**
 * KineticHeadline — renders headline `lines` (each an array of words, where a
 * "word" can be a plain string or a styled ReactNode) with a continuous
 * word-by-word stagger: each word flies up out of a slight 3D tilt and blur
 * rather than the whole line fading in as one block.
 */
export default function KineticHeadline({ lines, className = '', wordDelay = 0.06, startDelay = 0 }) {
  return (
    <span className={className} style={{ perspective: 800 }}>
      {lines.map((line, li) => {
        const priorWords = lines.slice(0, li).reduce((sum, l) => sum + l.length, 0)
        return (
          <span key={li} className="block">
            {line.map((word, wi) => (
              <motion.span
                key={wi}
                className="inline-block"
                initial={{ opacity: 0, y: 32, rotateX: -50, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: startDelay + (priorWords + wi) * wordDelay }}
                style={{ marginRight: '0.28em', transformOrigin: '50% 100%' }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        )
      })}
    </span>
  )
}
