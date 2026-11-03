import { motion } from 'framer-motion'

/**
 * TiltCard — previously tilted in 3D toward the cursor. Now a plain card
 * wrapper that still forwards framer-motion reveal props
 * (variants/initial/whileInView/viewport/transition).
 */
// eslint-disable-next-line no-unused-vars
export default function TiltCard({ children, className = '', max, ...motionProps }) {
  return (
    <motion.div className={className} {...motionProps}>
      {children}
    </motion.div>
  )
}
