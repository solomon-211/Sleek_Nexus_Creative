import { motion } from 'framer-motion'

/**
 * KineticHeadline — renders headline `lines` (each an array of words, where a
 * "word" can be a plain string or a styled ReactNode) with a continuous
 * short word-by-word fade-up.
 */
export default function KineticHeadline({ lines, className = '', wordDelay = 0.03, startDelay = 0 }) {
  return (
    <span className={className}>
      {lines.map((line, li) => {
        const priorWords = lines.slice(0, li).reduce((sum, l) => sum + l.length, 0)
        return (
          <span key={li} className="block">
            {line.map((word, wi) => (
              <motion.span
                key={wi}
                className="inline-block"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: startDelay + (priorWords + wi) * wordDelay }}
                style={{ marginRight: '0.28em' }}
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
