import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const approach = [
  { icon: 'fa-search', title: 'Discovery First', desc: 'We start by deeply understanding your challenge, users, and goals before writing a single line of code.' },
  { icon: 'fa-pencil-ruler', title: 'Thoughtful Design', desc: 'Every interface is designed for real people in real conditions — low bandwidth, diverse devices, local context.' },
  { icon: 'fa-code', title: 'Clean Engineering', desc: 'We build with maintainability and scalability in mind so your product keeps working long after launch.' },
  { icon: 'fa-handshake', title: 'Honest Delivery', desc: 'We set realistic timelines, communicate progress openly, and don\'t overpromise what we can\'t deliver.' },
]

export default function CaseStudies() {
  return (
    <>
      <Helmet><title>Case Studies - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Deep Dives" title="Case Studies" desc="A behind-the-scenes look at how we approach problems, make decisions, and deliver results for our clients." />

      {/* Honest message */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-folder-open text-primary text-2xl" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-dark mb-4">Case Studies Coming Soon</h2>
            <p className="text-muted leading-relaxed mb-4">
              We are a young company and we believe in being honest — our detailed case studies are being documented as we complete real client projects.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              In the meantime, you can browse our portfolio to see the work we've done, or reach out to speak directly with our team about how we approach projects.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/projects/portfolio" className="btn-primary">View Our Portfolio</Link>
              <Link to="/contact" className="btn-secondary">Talk to Our Team</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">How We Work</p>
            <h2 className="section-title">Our Project Approach</h2>
            <p className="section-subtitle">Every project we take on follows the same disciplined, honest process.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {approach.map(({ icon, title, desc }, i) => (
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
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Be Our Next Success Story?</h2>
          <p className="text-gray-300 mb-8">Let's start with a free consultation and build something great together.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Start a Project</Link>
            <Link to="/projects/portfolio" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">View Portfolio</Link>
          </div>
        </div>
      </section>
    </>
  )
}
