import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/ui/SEO'
import { pageSeo } from '../lib/seo-data'
import { fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItem } from '../lib/animations'
import PageHeader from '../components/ui/PageHeader'
import MagneticButton from '../components/ui/MagneticButton'
import Img from '../components/ui/Img'
import { featured, brandWork, brandCategories } from '../lib/work-data'

const ALL = 'All'

export default function Work() {
  const [filter, setFilter] = useState(ALL)
  const visible = filter === ALL ? brandWork : brandWork.filter((w) => w.category === filter)

  return (
    <>
      <SEO {...pageSeo['/work']} />

      <PageHeader
        tone="dark"
        label="Our Work"
        title="Built, Shipped, In Use"
        desc="A live education platform serving learners across South Sudan, and the identities we've designed along the way."
      />

      {/* Featured — EduPortal */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container-page">
          <div className="relative overflow-hidden bg-noise bg-dark text-white rounded-2xl p-6 sm:p-10 lg:p-14 shadow-[0_20px_60px_rgba(35,61,77,0.25)] grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5 mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Featured · Live Product</span>
              </span>
              <h2 className="display-heading-sm mb-5">{featured.title}</h2>
              <p className="text-white/70 leading-relaxed mb-8">{featured.summary}</p>

              <div className="flex flex-wrap gap-6 mb-8">
                {featured.facts.map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-white/70">
                    <i className={`fas ${icon} text-accent`} /> {label}
                  </div>
                ))}
              </div>

              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3">What we delivered</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {featured.services.map((s) => (
                  <span key={s} className="text-xs font-semibold text-white/80 bg-white/10 border border-white/15 rounded-full px-3 py-1">{s}</span>
                ))}
              </div>

              <MagneticButton>
                <a href={featured.url} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                  Visit the Live Platform <i className="fas fa-arrow-up-right-from-square text-sm" />
                </a>
              </MagneticButton>
            </motion.div>

            {/* What the platform does */}
            <motion.div
              className="space-y-4"
              variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.15 }}
            >
              <div className="flex items-center gap-2 bg-gray-900 rounded-xl px-4 py-3 border border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="ml-3 flex-1 bg-white/5 rounded-md px-3 py-1 text-white/50 text-xs flex items-center gap-1.5 truncate">
                  <i className="fas fa-lock text-[0.6rem]" /> {featured.displayUrl}
                </span>
              </div>
              {featured.capabilities.map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-5 transition-colors duration-300 hover:border-primary/40">
                  <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <i className={`fas ${icon} text-accent`} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white mb-1">{title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand & identity work */}
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <motion.div className="text-center mb-8 sm:mb-10" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="eyebrow">Brand &amp; Identity</p>
            <h2 className="section-title">Design Work</h2>
            <p className="section-subtitle">Identities, campaigns, and merchandise from our design team.</p>
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10" role="group" aria-label="Filter work by category">
            {[ALL, ...brandCategories].map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-200 ${
                  filter === c
                    ? 'bg-primary border-primary text-white shadow-[0_4px_14px_rgba(254,127,45,0.28)]'
                    : 'border-surface text-muted hover:border-primary/40 hover:text-primary'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Keyed on the filter so a new selection replays the staggered reveal */}
          <motion.div
            key={filter}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
              {visible.map(({ src, title, category, desc }) => (
                <motion.article key={title} variants={staggerItem} className="card group overflow-hidden">
                  <div className="relative overflow-hidden aspect-[4/5] bg-surface">
                    <Img
                      src={src}
                      alt={title}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 text-white text-[0.65rem] font-bold uppercase tracking-widest bg-dark/90 px-3 py-1 rounded-full">
                      {category}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-heading font-black text-dark text-lg mb-1.5">{title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.article>
              ))}
          </motion.div>

          <p className="text-center text-sm text-muted mt-10">
            Want an identity like these?{' '}
            <Link to="/services/branding" className="text-primary font-semibold hover:underline">See how our branding process works</Link>.
          </p>
        </div>
      </section>

      {/* Next steps — links onward rather than repeating other pages */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container-page">
          <motion.div
            className="grid sm:grid-cols-3 gap-6"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {[
              { icon: 'fa-code',        title: 'Need a platform?',  desc: 'Websites, web apps, and mobile apps built for real-world conditions.', to: '/services', cta: 'Explore services' },
              { icon: 'fa-palette',     title: 'Need a brand?',     desc: 'Logo, identity system, and guidelines — with every source file yours to keep.', to: '/services/branding', cta: 'Branding & identity' },
              { icon: 'fa-paper-plane', title: 'Have a brief?',     desc: 'Tell us what you need and hear back from us within 24 hours.', to: '/get-started', cta: 'Start a project' },
            ].map(({ icon, title, desc, to, cta }) => (
              <motion.div key={title} variants={staggerItem} className="card p-6">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-primary`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{desc}</p>
                <Link to={to} className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
                  {cta} <i className="fas fa-arrow-right text-xs" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
