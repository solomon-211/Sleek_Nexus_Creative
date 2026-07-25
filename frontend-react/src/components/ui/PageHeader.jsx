import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * PageHeader — consistent dark hero banner used at the top of every sub-page.
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
      className={`relative bg-gradient-to-br from-[#1a0503] via-[#4a1710] to-[#200604] text-white overflow-hidden ${compact ? 'py-14' : 'py-20 md:py-24'}`}
      aria-label={`${title} page header`}
    >
      {/* Glow orbs — dual-tone ember effect */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Breadcrumb */}
          {breadcrumb?.length > 0 && (
            <nav className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
              {breadcrumb.map(({ label: bl, to }, i) => (
                <span key={bl} className="flex items-center gap-2">
                  <i className="fas fa-chevron-right text-[0.5rem] text-gray-600" />
                  {to && i < breadcrumb.length - 1
                    ? <Link to={to} className="hover:text-gray-300 transition-colors">{bl}</Link>
                    : <span className="text-gray-400">{bl}</span>}
                </span>
              ))}
            </nav>
          )}

          {/* Label / eyebrow */}
          {label && (
            <p className="text-accent text-xs font-bold uppercase tracking-[0.15em] mb-3">{label}</p>
          )}

          {/* Title */}
          <h1
            className="font-heading font-black uppercase text-white leading-[0.95] mb-0"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}
          >
            {title}
          </h1>

          {/* Description */}
          {desc && (
            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto mt-5 text-base md:text-lg">
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

      {/* Bottom fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none" />
    </section>
  )
}
