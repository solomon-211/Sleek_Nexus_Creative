import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'
import { fadeUp } from '../../lib/animations'

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
    src: '/images/Rise leadership Academy.png',
    title: 'Rise Leadership Academy',
    category: 'Brand Identity',
    desc: 'Full brand identity for Rise Leadership Academy — built to inspire and empower the next generation of leaders.',
  },
  {
    src: '/images/Building the future.png',
    title: 'Building the Future',
    category: 'Campaign Design',
    desc: 'Inspirational brand campaign communicating vision and forward momentum.',
  },
  {
    src: '/images/Honoring.png',
    title: 'Honoring Excellence',
    category: 'Event Branding',
    desc: 'Ceremonial brand materials for recognition and award programs.',
  },
  {
    src: '/images/New.png',
    title: 'Fresh Identity',
    category: 'Brand Launch',
    desc: 'Clean, modern brand launch materials built for digital-first audiences.',
  },
  {
    src: '/images/Brand 2 pdf for white hoodie gold.png',
    title: 'White Hoodie — Gold Print',
    category: 'Brand Merchandise',
    desc: 'Brand applied to physical merchandise — hoodies, apparel, and print materials.',
  },
  {
    src: '/images/Orange T-shirt.png',
    title: 'Orange T-Shirt',
    category: 'Brand Merchandise',
    desc: 'Branded apparel design — vibrant orange tee with bold logo placement.',
  },
]

export default function Branding() {
  return (
    <>
      <Helmet><title>Branding & Identity - Sleek Nexus Creative</title></Helmet>
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
                src="/images/Rise leadership Academy.png"
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
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">Your Brand Is More Than Your Logo</h2>
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

      {/* BRAND WORK GALLERY */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Our Work</p>
            <h2 className="section-title">Brand Showcase</h2>
            <p className="section-subtitle">
              Real branding work delivered for real organizations — from full corporate identities
              to campaign materials and merchandise.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandGallery.map(({ src, title, category, desc }, i) => (
              <motion.div
                key={title}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                variants={fadeUp} initial="hidden" whileInView="show"
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={src}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-24">
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

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Build a Brand That Stands Out?</h2>
          <p className="text-gray-300 mb-8">Get a free brand consultation and discover what's possible.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
            <Link to="/services" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">
              All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
