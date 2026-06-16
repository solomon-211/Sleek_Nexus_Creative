import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const responsibilities = [
  'Meet with 1–2 mentees for 30–60 minutes monthly (virtual or in-person)',
  'Provide career guidance, code reviews, and portfolio feedback',
  'Share industry experience and help mentees navigate job opportunities',
  'Offer encouragement and accountability for learning goals',
]

const areas = ['Software Engineering', 'Mobile Development', 'UI/UX & Product Design', 'Data Science & AI', 'Cybersecurity', 'Tech Entrepreneurship', 'Project Management', 'Digital Marketing']

export default function Mentor() {
  return (
    <>
      <Helmet><title>Become a Mentor - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Join Us" title="Become a Mentor" desc="Guide the next generation of South Sudanese tech professionals with your experience, wisdom, and network." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Mentorship Program</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">Your 1 Hour a Month Can Change a Career</h2>
              <p className="text-muted leading-relaxed mb-4">Mentorship is one of the most powerful accelerators for young South Sudanese tech professionals. Many of our graduates credit a single mentor conversation with changing the direction of their career.</p>
              <p className="text-muted leading-relaxed mb-6">Our mentors are professionals from South Sudan and across the diaspora who give just a few hours per month to help the next generation navigate their path in tech.</p>
              <h3 className="font-semibold text-dark mb-3">Mentor Responsibilities:</h3>
              <ul className="space-y-2 mb-6">
                {responsibilities.map(r => (
                  <li key={r} className="flex items-start gap-2 text-sm text-muted">
                    <i className="fas fa-check text-primary text-xs mt-1 flex-shrink-0" /> {r}
                  </li>
                ))}
              </ul>
              <h3 className="font-semibold text-dark mb-3">Areas We Need Mentors In:</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {areas.map(a => <span key={a} className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">{a}</span>)}
              </div>
              <Link to="/contact" className="btn-primary">Apply to Be a Mentor</Link>
            </div>
            <div className="space-y-5">
              {[
                { icon: 'fa-heart', title: 'Give Back to South Sudan', desc: 'Your career success puts you in a unique position to open doors for young professionals who are just getting started.' },
                { icon: 'fa-globe', title: 'Diaspora Welcome', desc: 'South Sudanese professionals living abroad are especially encouraged to mentor — your global perspective is invaluable.' },
                { icon: 'fa-network-wired', title: 'Expand Your Network', desc: 'Mentoring connects you with SNC\'s growing ecosystem of talent, startups, and organizations across South Sudan.' },
                { icon: 'fa-clock', title: 'Low Time Commitment', desc: 'Just 1–2 hours per month. We handle matching, scheduling, and all program coordination.' },
              ].map(({ icon, title, desc }, i) => (
                <motion.div key={title} className="card p-5 flex gap-4" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <i className={`fas ${icon} text-primary`} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-dark mb-1">{title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Shape the Next Generation?</h2>
          <p className="text-gray-300 mb-8">Apply to join the SNC mentor network and start making a difference.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Apply to Be a Mentor</Link>
            <Link to="/join/community" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Join Our Community</Link>
          </div>
        </div>
      </section>
    </>
  )
}
