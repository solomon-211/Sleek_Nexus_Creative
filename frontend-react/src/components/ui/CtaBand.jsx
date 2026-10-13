import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/animations'
import MagneticButton from './MagneticButton'

/**
 * CtaBand — the navy call-to-action that closes a page.
 *
 * One component so every page ends the same way: same height, same heading
 * scale, same pair of buttons (orange primary, white-outline secondary).
 *
 * Props:
 *  label      {string} — small pill above the heading (optional)
 *  title      {string} — heading (required)
 *  desc       {string} — supporting line (optional)
 *  primary    {{ to, label }} — main action (required)
 *  secondary  {{ to, label }} — alternative action (optional)
 */
export default function CtaBand({ label, title, desc, primary, secondary }) {
  return (
    <section className="relative overflow-hidden bg-noise py-16 sm:py-20 bg-dark text-white text-center">
      <motion.div
        className="max-w-2xl mx-auto px-4 sm:px-6"
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.6 }}
      >
        {label && (
          <span className="inline-flex items-center text-accent text-xs font-bold uppercase tracking-widest mb-5 bg-accent/10 border border-accent/25 px-4 py-2 rounded-full">
            {label}
          </span>
        )}
        <h2 className="cta-heading mb-4">{title}</h2>
        {desc && <p className="text-white/70 leading-relaxed mb-8">{desc}</p>}
        <div className="flex flex-wrap gap-4 justify-center">
          <MagneticButton>
            <Link to={primary.to} className="btn-primary">{primary.label}</Link>
          </MagneticButton>
          {secondary && (
            <MagneticButton>
              <Link to={secondary.to} className="btn-secondary border-white text-white hover:bg-white hover:text-primary">{secondary.label}</Link>
            </MagneticButton>
          )}
        </div>
      </motion.div>
    </section>
  )
}
