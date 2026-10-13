import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * PageHeader — the hero banner at the top of every inner page.
 *
 * Two tones, one layout. Top-level pages (About, Services, Work, Contact,
 * legal) use tone="dark" — brand navy, matching the navbar they sit under.
 * Detail pages one level down (the individual service pages) use the default
 * light tone, so depth in the site reads at a glance. Type scale, spacing,
 * eyebrow, and entrance animation are identical in both.
 *
 * Props:
 *  label       {string}  — small eyebrow label above the title (optional)
 *  title       {string}  — main H1 heading (required)
 *  desc        {string}  — supporting paragraph (optional)
 *  breadcrumb  {Array}   — [{label, to}, …] breadcrumb trail (optional)
 *  actions     {ReactNode} — buttons or links to show below desc (optional)
 *  compact     {boolean} — reduced vertical padding (optional)
 *  tone        {'light'|'dark'} — see above (default 'light')
 *  children    {ReactNode} — extra content under the description (optional)
 */
export default function PageHeader({ label, title, desc, breadcrumb, actions, compact = false, tone = 'light', children }) {
  const dark = tone === 'dark'
  return (
    <section
      className={`relative overflow-hidden ${dark ? 'bg-dark text-white bg-noise' : 'bg-surface border-b border-gray-200'} ${compact ? 'py-14' : 'py-20 md:py-24'}`}
      aria-label={`${title} page header`}
    >
      {/* Tinted surface + subtle motif texture — every page below this uses a
          plain white first section, so the hero needs its own identity
          rather than fading straight into the content that follows. */}
      <div className={`absolute inset-0 pointer-events-none ${dark ? 'bg-motif-light opacity-[0.06]' : 'bg-motif opacity-[0.05]'}`} />
      <div className="relative container-page text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Breadcrumb */}
          {breadcrumb?.length > 0 && (
            <nav className={`flex items-center justify-center gap-2 text-xs mb-4 ${dark ? 'text-white/60' : 'text-muted'}`} aria-label="Breadcrumb">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              {breadcrumb.map(({ label: bl, to }, i) => (
                <span key={bl} className="flex items-center gap-2">
                  <i className="fas fa-chevron-right text-[0.5rem] opacity-50" />
                  {to && i < breadcrumb.length - 1
                    ? <Link to={to} className="hover:text-primary transition-colors">{bl}</Link>
                    : <span className={dark ? 'text-white' : 'text-dark-soft'}>{bl}</span>}
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
            className={`font-heading font-black uppercase leading-[0.95] mb-0 ${dark ? 'text-white' : 'text-dark'}`}
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 3.5rem)', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, filter: 'blur(10px)', y: 8 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          >
            {title}
          </motion.h1>

          {/* Description */}
          {desc && (
            <p className={`leading-relaxed max-w-2xl mx-auto mt-5 text-base md:text-lg ${dark ? 'text-white/70' : 'text-muted'}`}>
              {desc}
            </p>
          )}

          {children}

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
