import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/animations'

/**
 * CtaBand — the navy call-to-action that closes a page.
 *
 * It always sits directly above the footer's orange band (FooterBand), so the
 * two are designed as a pair: content on the left, and
 * two slanted orange bars on the right that run the full height of the navy
 * and land on the orange band — so the band reads as their continuation.
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
    <section className="relative overflow-hidden bg-noise bg-dark text-white py-16 sm:py-24">
      <div className="absolute inset-0 bg-motif-light opacity-[0.04] pointer-events-none" />

      {/* Two solid, slanted orange bars on the right, running into the orange
          band below. On phones they shrink to a corner accent so the text keeps
          the full width. */}
      <div className="absolute bottom-0 right-0 h-40 w-[170px] sm:top-0 sm:h-auto sm:w-[300px] lg:w-[400px] pointer-events-none" aria-hidden="true">
        <div className="absolute inset-y-0 right-[46%] w-10 sm:w-20 lg:w-24 bg-primary -skew-x-[18deg] origin-bottom" />
        <div className="absolute inset-y-0 right-[6%] w-14 sm:w-28 lg:w-36 bg-primary -skew-x-[18deg] origin-bottom" />
      </div>

      <motion.div
        className="relative container-page sm:pr-[300px] lg:pr-[400px] pb-32 sm:pb-0"
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.6 }}
      >
        <div className="max-w-2xl">
          {label ? (
            <span className="inline-flex items-center text-accent text-xs font-bold uppercase tracking-widest mb-5 bg-accent/10 border border-accent/25 px-4 py-2 rounded-full">
              {label}
            </span>
          ) : (
            <span className="block w-12 h-1 rounded-full bg-primary mb-6" aria-hidden="true" />
          )}
          <h2 className="cta-heading mb-4">{title}</h2>
          {desc && <p className="text-white/70 text-base sm:text-lg leading-relaxed">{desc}</p>}

          {/* Actions sit under the text they follow: heading, reason, then what to do */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link to={primary.to} className="btn-primary justify-center">
              {primary.label} <i className="fas fa-arrow-right text-sm" />
            </Link>
            {secondary && (
              <Link to={secondary.to} className="btn-secondary justify-center border-white/70 text-white hover:bg-white hover:text-primary hover:border-white">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </motion.div>

    </section>
  )
}
