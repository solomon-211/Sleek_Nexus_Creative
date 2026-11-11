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
 *  video       {string}  — background video (dark tone only; optional). Plays
 *                          muted on a loop under a light navy tint.
 *  poster      {string}  — still frame shown while the video loads, and
 *                          instead of it for visitors who prefer reduced motion
 */
export default function PageHeader({ label, title, desc, breadcrumb, actions, compact = false, tone = 'light', children, video, poster }) {
  const dark = tone === 'dark'
  const hasVideo = dark && video
  return (
    <section
      className={`relative overflow-hidden ${dark ? 'bg-dark text-white bg-noise' : 'bg-surface border-b border-gray-200'} ${hasVideo ? 'py-28 md:py-36' : compact ? 'py-14' : 'py-20 md:py-24'}`}
      aria-label={`${title} page header`}
    >
      {hasVideo ? (
        <>
          {poster && (
            <img src={poster} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-105 blur-[6px]" />
          )}
          <video
            className="absolute inset-0 w-full h-full object-cover scale-105 blur-[6px] motion-reduce:hidden"
            src={video}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          {/* Heavy navy tint plus a slight blur: the video reads as movement and
              texture behind the title, without individual people being visible. */}
          <div className="absolute inset-0 bg-dark/[0.93] pointer-events-none" />
        </>
      ) : (
        /* Subtle motif texture (the grid pattern) — every page below this uses a
           plain white first section, so the hero needs its own identity rather
           than fading straight into the content that follows. Left off when
           there's a video: the footage gives the header its texture. */
        <div className={`absolute inset-0 pointer-events-none ${dark ? 'bg-motif-light opacity-[0.06]' : 'bg-motif opacity-[0.05]'}`} />
      )}
      <div className={`relative container-page text-center ${hasVideo ? '[text-shadow:0_1px_14px_rgba(15,23,32,0.75)]' : ''}`}>
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
                  <span aria-hidden="true" className="opacity-50">/</span>
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

          {/* Title */}
          <motion.h1
            className={`font-heading font-black uppercase leading-[0.95] mb-0 ${dark ? 'text-white' : 'text-dark'}`}
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 3.5rem)', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            {title}
          </motion.h1>

          {/* Description */}
          {desc && (
            <p className={`leading-relaxed max-w-2xl mx-auto mt-5 text-base md:text-lg ${hasVideo ? 'text-white/95 font-medium' : dark ? 'text-white/70' : 'text-muted'}`}>
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
