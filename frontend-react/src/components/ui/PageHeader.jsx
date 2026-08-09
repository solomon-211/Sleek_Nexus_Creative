import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * PageHeader — consistent light hero banner used at the top of every sub-page.
 *
 * Props:
 *  label       {string}  — small eyebrow label above the title (optional)
 *  title       {string}  — main H1 heading (required)
 *  desc        {string}  — supporting paragraph (optional)
 *  breadcrumb  {Array}   — [{label, to}, …] breadcrumb trail (optional)
 *  actions     {ReactNode} — buttons or links to show below desc (optional)
 *  compact     {boolean} — reduced vertical padding (optional)
 */
export default function PageHeader({ label, title, desc, breadcrumb, actions, compact = false }) {
  return (
    <section
      className={`relative bg-surface border-b border-gray-200 overflow-hidden ${compact ? 'py-14' : 'py-20 md:py-24'}`}
      aria-label={`${title} page header`}
    >
      {/* Tinted surface + subtle motif texture — every page below this uses a
          plain white first section, so the hero needs its own identity
          rather than fading straight into the content that follows. */}
      <div className="absolute inset-0 bg-motif opacity-[0.05] pointer-events-none" />
      {/* Glow orbs — soft color wash over the tinted background */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Breadcrumb */}
          {breadcrumb?.length > 0 && (
            <nav className="flex items-center justify-center gap-2 text-xs text-muted mb-4" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              {breadcrumb.map(({ label: bl, to }, i) => (
                <span key={bl} className="flex items-center gap-2">
                  <i className="fas fa-chevron-right text-[0.5rem] text-gray-300" />
                  {to && i < breadcrumb.length - 1
                    ? <Link to={to} className="hover:text-primary transition-colors">{bl}</Link>
                    : <span className="text-dark-soft">{bl}</span>}
                </span>
              ))}
            </nav>
          )}

          {/* Label / eyebrow */}
          {label && (
            <p className="text-accent text-xs font-bold uppercase tracking-[0.15em] mb-3">{label}</p>
          )}

          {/* Title — blurs into sharp focus slightly after the rest of the block starts fading in */}
          <motion.h1
            className="font-heading font-black uppercase text-dark leading-[0.95] mb-0"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 3.5rem)', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, filter: 'blur(10px)', y: 8 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          >
            {title}
          </motion.h1>

          {/* Description */}
          {desc && (
            <p className="text-muted leading-relaxed max-w-2xl mx-auto mt-5 text-base md:text-lg">
              {desc}
            </p>
          )}

          {/* Action buttons */}
          {actions && (
            <div className="flex flex-wrap justify-center gap-4 mt-7">
              {actions}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
