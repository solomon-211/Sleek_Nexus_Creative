import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'
import { fadeUp } from '../../lib/animations'

const offers = ['Technology Strategy & Roadmapping', 'Digital Transformation Planning', 'System Architecture Design', 'Security Audits & Compliance', 'Cloud Migration Services', 'Vendor Selection & Evaluation', 'Performance Optimization', 'IT Policy & Governance']

const benefits = [
  { icon: 'fa-lightbulb', title: 'Expert Guidance', desc: 'Combined experience across software, infrastructure, and digital transformation for organizations of all sizes in South Sudan.' },
  { icon: 'fa-shield-alt', title: 'Security First', desc: 'We assess your current security posture and build a practical roadmap to enterprise-grade protection.' },
  { icon: 'fa-chart-line', title: 'Measurable ROI', desc: 'Every recommendation includes a cost-benefit analysis so you know what you are investing and what you will gain.' },
  { icon: 'fa-handshake', title: 'Vendor-Neutral', desc: 'We recommend what is best for you, not what earns us a commission. Honest, independent technology advice.' },
]

const engagements = [
  { type: 'Quick Audit', duration: '1-2 weeks', desc: 'A focused review of your current tech stack, systems, or processes with a prioritized action plan.' },
  { type: 'Strategy Sprint', duration: '2-4 weeks', desc: 'Deep-dive discovery leading to a 6-12 month digital transformation roadmap.' },
  { type: 'Ongoing Advisory', duration: 'Monthly retainer', desc: 'Dedicated consulting hours each month for continuous strategic support and decision-making guidance.' },
]

export default function Consulting() {
  return (
    <>
      <Helmet><title>Digital Consulting - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Services" title="Digital Consulting" desc="Strategic technology advisory to help your organization navigate digital transformation with confidence and clarity." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Strategic Advisory</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">Technology Decisions That Move Your Organization Forward</h2>
              <p className="text-muted leading-relaxed mb-4">Many organizations in South Sudan are navigating digital transformation without a clear map. We provide the strategic guidance to help you invest in the right technology, in the right order, with the right partners.</p>
              <p className="text-muted leading-relaxed mb-6">From startups evaluating their first tech stack to established organizations modernizing legacy systems — our consulting engagements are practical, actionable, and context-aware.</p>
              <h3 className="font-semibold text-dark mb-3">What We Offer:</h3>
              <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                {offers.map(o => (
                  <li key={o} className="flex items-center gap-2 text-sm text-muted">
                    <i className="fas fa-check text-primary text-xs" /> {o}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary">Book a Consultation</Link>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <img src="/images/consulting.jpg" alt="Digital Consulting" className="rounded-2xl shadow-xl w-full h-[420px] object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Why Us</p>
            <h2 className="section-title">What Sets Our Consulting Apart</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon, title, desc }, i) => (
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

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Engagement Types</p>
            <h2 className="section-title">How We Work Together</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {engagements.map(({ type, duration, desc }, i) => (
              <motion.div key={type} className="card p-8" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <h3 className="font-heading font-bold text-dark text-xl mb-2">{type}</h3>
                <div className="inline-flex items-center gap-1.5 text-xs text-muted border border-gray-200 rounded-full px-3 py-1 mb-4">
                  <i className="fas fa-clock text-primary" /> {duration}
                </div>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Let's Map Your Digital Future</h2>
          <p className="text-gray-300 mb-8">Free initial consultation — no commitment, just clarity.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Book a Consultation</Link>
            <Link to="/services" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">All Services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
