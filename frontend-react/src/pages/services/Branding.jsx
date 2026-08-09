import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'
import SEO from '../../components/ui/SEO'
import { pageSeo } from '../../lib/seo-data'
import { fadeUp } from '../../lib/animations'
import MagneticButton from '../../components/ui/MagneticButton'
import FaqAccordion from '../../components/ui/FaqAccordion'
import DragGallery from '../../components/ui/DragGallery'

const offers = [
  { title: 'Logo Design & Visual Identity', desc: 'Memorable marks that represent your organization at a glance.' },
  { title: 'Brand Strategy & Positioning', desc: 'Define your voice, audience, and competitive edge.' },
  { title: 'Brand Style Guides', desc: 'A single source of truth for how your brand looks and sounds.' },
  { title: 'Business Cards & Stationery', desc: 'Print materials that leave a lasting first impression.' },
  { title: 'Social Media Branding Kits', desc: 'Consistent visuals across every platform and post.' },
  { title: 'Presentation Templates', desc: 'Professional slide decks aligned with your brand identity.' },
  { title: 'Packaging Design', desc: 'Product packaging that stands out on shelves and online.' },
  { title: 'Rebrand & Refresh Projects', desc: 'Modernize your existing brand without losing its essence.' },
]

const deliverables = [
  { icon: 'fa-paint-brush', title: 'Logo Suite', desc: 'Primary, secondary, and monochrome logo variants in all formats — SVG, PNG, PDF.' },
  { icon: 'fa-palette', title: 'Color System', desc: 'Primary and secondary palettes with hex codes, CMYK, and usage guidelines.' },
  { icon: 'fa-font', title: 'Typography', desc: 'Heading and body font pairings with sizing scales and web-safe alternatives.' },
  { icon: 'fa-book', title: 'Brand Guide', desc: 'A comprehensive PDF guide your entire team can follow consistently.' },
]

const brandGallery = [
  {
    src: '/images/rise-leadership-academy.png',
    title: 'Rise Leadership Academy',
    category: 'Brand Identity',
    desc: 'Full brand identity for Rise Leadership Academy — built to inspire and empower the next generation of leaders.',
  },
  {
    src: '/images/building-the-future.png',
    title: 'Building the Future',
    category: 'Campaign Design',
    desc: 'Inspirational brand campaign communicating vision and forward momentum.',
  },
  {
    src: '/images/honoring-excellence.png',
    title: 'Honoring Excellence',
    category: 'Event Branding',
    desc: 'Ceremonial brand materials for recognition and award programs.',
  },
  {
    src: '/images/fresh-identity.png',
    title: 'Fresh Identity',
    category: 'Brand Launch',
    desc: 'Clean, modern brand launch materials built for digital-first audiences.',
  },
  {
    src: '/images/white-hoodie-gold-print.png',
    title: 'White Hoodie — Gold Print',
    category: 'Brand Merchandise',
    desc: 'Brand applied to physical merchandise — hoodies, apparel, and print materials.',
  },
  {
    src: '/images/orange-t-shirt.png',
    title: 'Orange T-Shirt',
    category: 'Brand Merchandise',
    desc: 'Branded apparel design — vibrant orange tee with bold logo placement.',
  },
]

const process = [
  { n: '01', icon: 'fa-comments',        title: 'Discovery',           desc: 'We learn your story, audience, and goals before designing anything.' },
  { n: '02', icon: 'fa-magnifying-glass', title: 'Research & Strategy', desc: 'Competitive analysis and positioning that shapes every design decision.' },
  { n: '03', icon: 'fa-pencil-ruler',    title: 'Concept & Design',     desc: 'Logo exploration and visual direction based on your discovery session.' },
  { n: '04', icon: 'fa-arrows-rotate',   title: 'Refinement',           desc: "Focused revision rounds on your chosen direction until it's exactly right." },
  { n: '05', icon: 'fa-box-open',        title: 'Delivery',             desc: 'Full logo suite, brand guide, and every source file — yours to keep.' },
  { n: '06', icon: 'fa-headset',         title: 'Ongoing Support',      desc: 'Extended assets and brand consistency support as your organization grows.' },
]

const directions = [
  {
    key: 'bold',
    icon: 'fa-bolt',
    title: 'Bold & Modern',
    swatches: ['#000000', '#FE7F2D'],
    blurb: 'High-contrast, confident, and unapologetic — right for brands that want to stand out immediately and lead with energy.',
  },
  {
    key: 'trusted',
    icon: 'fa-shield-halved',
    title: 'Trusted & Professional',
    swatches: ['#233D4D', '#EAECF0'],
    blurb: 'Clean, structured, and credible — right for institutions, financial services, and organizations where trust comes first.',
  },
  {
    key: 'warm',
    icon: 'fa-sun',
    title: 'Warm & Approachable',
    swatches: ['#FE7F2D', '#FFFFFF'],
    blurb: 'Friendly, human, and welcoming — right for education, community, and healthcare brands that need to feel accessible.',
  },
]

export default function Branding() {
  const [selectedDirection, setSelectedDirection] = useState(null)

  return (
    <>
      <SEO {...pageSeo['/services/branding']} />
      <PageHeader
        label="Services"
        title="Branding & Identity"
        desc="Build a brand that commands respect, communicates your values, and is instantly recognizable across every touchpoint."
      />

      {/* INTRO SECTION */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show"
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src="/images/rise-leadership-academy.png"
                alt="Rise Leadership Academy Logo"
                className="rounded-2xl shadow-xl w-full h-[420px] object-cover"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show"
              viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Visual Identity</p>
              <h2 className="text-3xl md:text-4xl font-heading font-black uppercase text-dark mb-6">Your Brand Is More Than Your Logo</h2>
              <p className="text-muted leading-relaxed mb-4">
                A strong brand builds trust before you even speak. We craft visual identities that reflect your
                organization's mission, values, and audience — designed to work across digital and print.
              </p>
              <p className="text-muted leading-relaxed mb-6">
                Every branding project starts with a deep discovery session so we understand your story before
                we design a single pixel.
              </p>
              <h3 className="font-semibold text-dark mb-3">What We Offer:</h3>
              <ul className="grid sm:grid-cols-2 gap-4 mb-6">
                {offers.map(({ title, desc }) => (
                  <li key={title} className="flex gap-3">
                    <i className="fas fa-check text-primary text-xs mt-1 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-dark">{title}</p>
                      <p className="text-xs text-muted mt-0.5">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary">Start Your Brand Project</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BRAND WORK GALLERY — drag to explore */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-8">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Our Work</p>
            <h2 className="section-title">Brand Showcase</h2>
            <p className="section-subtitle">
              Real branding work delivered for real organizations — from full corporate identities
              to campaign materials and merchandise.
            </p>
          </div>
          <p className="flex items-center justify-center gap-2 text-xs font-semibold text-muted uppercase tracking-widest mb-6">
            <i className="fas fa-arrows-left-right" /> Drag to explore
          </p>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <DragGallery>
            {brandGallery.map(({ src, title, category, desc }) => (
              <div
                key={title}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 w-[280px] sm:w-[320px] flex-shrink-0"
              >
                <div className="relative overflow-hidden h-56 sm:h-64">
                  <img
                    src={src}
                    alt={title}
                    draggable={false}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <span className="text-white text-xs font-bold uppercase tracking-widest bg-primary px-3 py-1 rounded-full">
                      {category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-primary text-xs font-bold uppercase tracking-wider">{category}</span>
                  <h3 className="font-heading font-bold text-dark mt-1 mb-2">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </DragGallery>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">How We Work</p>
            <h2 className="section-title">Our Branding Process</h2>
            <p className="section-subtitle">A structured process that turns your story into a brand people recognize and trust.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map(({ n, icon, title, desc }, i) => (
              <motion.div key={title} className="card p-6" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-heading font-black text-primary/20">{n}</span>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <i className={`fas ${icon} text-primary text-sm`} />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">What You Get</p>
            <h2 className="section-title">Brand Deliverables</h2>
            <p className="section-subtitle">Every branding package includes a complete set of assets you'll actually use.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="card p-6"
                variants={fadeUp} initial="hidden" whileInView="show"
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-primary`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND DIRECTION FINDER */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Not Sure Where to Start?</p>
            <h2 className="section-title">Find Your Brand Direction</h2>
            <p className="section-subtitle">Pick whichever feels closest to how you want your organization to be seen — we'll shape it from there.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto mb-8">
            {directions.map(({ key, icon, title, swatches }) => (
              <button
                key={key}
                onClick={() => setSelectedDirection(key)}
                className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                  selectedDirection === key ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/40'
                }`}
              >
                <div className="flex gap-1.5 mb-4">
                  {swatches.map(c => (
                    <span key={c} className="w-6 h-6 rounded-full border border-black/10" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <i className={`fas ${icon} text-primary text-sm`} />
                </div>
                <h3 className="font-heading font-bold text-dark text-sm">{title}</h3>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {selectedDirection && (
              <motion.div
                key={selectedDirection}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="max-w-xl mx-auto text-center bg-gray-50 rounded-2xl p-7"
              >
                <p className="text-muted leading-relaxed mb-5">
                  {directions.find(d => d.key === selectedDirection)?.blurb}
                </p>
                <Link to="/contact" className="btn-primary">This Resonates — Start Your Brand Project</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Questions</p>
            <h2 className="section-title">Common Branding Questions</h2>
          </div>
          <FaqAccordion items={pageSeo['/services/branding'].faq} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-noise py-20 bg-dark text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-black uppercase mb-4">Ready to Build a Brand That Stands Out?</h2>
          <p className="text-gray-300 mb-8">Get a free brand consultation and discover what's possible.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <MagneticButton>
              <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/services" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">
                All Services
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  )
}
