import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const offers = ['User Research & Personas', 'Wireframing & Prototyping', 'High-Fidelity UI Design', 'Design Systems & Component Libraries', 'Usability Testing', 'Mobile & Web App Design', 'Branding Integration', 'Figma Handoff for Developers']

const tools = ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop', 'Miro', 'Maze']

const principles = [
  { icon: 'fa-user', title: 'User-Centered', desc: 'Every design decision is grounded in real user research and behavior — not assumptions.' },
  { icon: 'fa-universal-access', title: 'Accessible', desc: 'We design for all users, including those with disabilities, low literacy, or low-end devices.' },
  { icon: 'fa-feather', title: 'Simple & Clear', desc: 'Interfaces that are intuitive enough to require no instruction manual.' },
  { icon: 'fa-bolt', title: 'Performance-Aware', desc: 'Beautiful designs that don\'t sacrifice load speed or usability on slower connections.' },
]

export default function UIUX() {
  return (
    <>
      <Helmet><title>UI/UX Design - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Services" title="UI/UX Design" desc="Human-centered design that makes digital products intuitive, accessible, and beautiful — built for your users, not just aesthetics." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <img src="/images/software-dev.jpg" alt="UI/UX Design" className="rounded-2xl shadow-xl w-full h-[420px] object-cover" loading="lazy" />
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Design That Converts</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">Great Design Is More Than How It Looks</h2>
              <p className="text-muted leading-relaxed mb-4">Good UI/UX design reduces user friction, increases task completion, and builds trust. We design with South Sudan's users in mind — diverse languages, literacy levels, and device types.</p>
              <p className="text-muted leading-relaxed mb-6">Our design process is research-driven, collaborative, and delivers production-ready Figma files that your developers can implement exactly as designed.</p>
              <h3 className="font-semibold text-dark mb-3">What We Offer:</h3>
              <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                {offers.map(o => (
                  <li key={o} className="flex items-center gap-2 text-sm text-muted">
                    <i className="fas fa-check text-primary text-xs" /> {o}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary">Start a Design Project</Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Our Approach</p>
            <h2 className="section-title">Design Principles We Live By</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map(({ icon, title, desc }, i) => (
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

      <section className="py-16 bg-dark text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <p className="text-accent text-sm font-bold uppercase tracking-widest mb-4">Tools We Use</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {tools.map(t => <span key={t} className="bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-full">{t}</span>)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Redesign Your Product?</h2>
          <p className="text-gray-300 mb-8">Let's make it beautiful, usable, and built for your real users.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Get a Free Consultation</Link>
            <Link to="/services" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">All Services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
