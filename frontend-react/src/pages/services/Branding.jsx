import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const offers = ['Logo Design & Visual Identity', 'Brand Strategy & Positioning', 'Brand Style Guides', 'Business Cards & Stationery', 'Social Media Branding Kits', 'Presentation Templates', 'Packaging Design', 'Rebrand & Refresh Projects']

const deliverables = [
  { icon: 'fa-paint-brush', title: 'Logo Suite', desc: 'Primary, secondary, and monochrome logo variants in all formats — SVG, PNG, PDF.' },
  { icon: 'fa-palette', title: 'Color System', desc: 'Primary and secondary palettes with hex codes, CMYK, and usage guidelines.' },
  { icon: 'fa-font', title: 'Typography', desc: 'Heading and body font pairings with sizing scales and web-safe alternatives.' },
  { icon: 'fa-book', title: 'Brand Guide', desc: 'A comprehensive PDF guide your entire team can follow consistently.' },
]

export default function Branding() {
  return (
    <>
      <Helmet><title>Branding - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Services" title="Branding & Identity" desc="Build a brand that commands respect, communicates your values, and is instantly recognizable across every touchpoint." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <img src="/images/creativeXc.jpg" alt="Branding" className="rounded-2xl shadow-xl w-full h-[420px] object-cover" loading="lazy" />
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Visual Identity</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">Your Brand Is More Than Your Logo</h2>
              <p className="text-muted leading-relaxed mb-4">A strong brand builds trust before you even speak. We craft visual identities that reflect your organization's mission, values, and audience — designed to work across digital and print.</p>
              <p className="text-muted leading-relaxed mb-6">Every branding project starts with a deep discovery session so we understand your story before we design a single pixel.</p>
              <h3 className="font-semibold text-dark mb-3">What We Offer:</h3>
              <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                {offers.map(o => (
                  <li key={o} className="flex items-center gap-2 text-sm text-muted">
                    <i className="fas fa-check text-primary text-xs" /> {o}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary">Start Your Brand Project</Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">What You Get</p>
            <h2 className="section-title">Brand Deliverables</h2>
            <p className="section-subtitle">Every branding package includes a complete set of assets you'll actually use.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map(({ icon, title, desc }, i) => (
              <motion.div key={title} className="card p-6" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
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

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Build a Brand That Stands Out?</h2>
          <p className="text-gray-300 mb-8">Get a free brand consultation and discover what's possible.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
            <Link to="/services" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">All Services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
