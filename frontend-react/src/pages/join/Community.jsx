import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const channels = [
  { icon: 'fab fa-whatsapp', title: 'WhatsApp Groups', desc: 'Topic-specific groups for developers, designers, students, and entrepreneurs — active discussions, job posts, and peer support.', color: 'text-green-600 bg-green-50' },
  { icon: 'fab fa-linkedin', title: 'LinkedIn Community', desc: 'Connect with SNC alumni, mentors, and partners. Share your work and celebrate achievements with the broader network.', color: 'text-blue-600 bg-blue-50' },
  { icon: 'fab fa-facebook', title: 'Facebook Group', desc: 'A space for South Sudanese tech enthusiasts to share news, resources, opportunities, and support each other\'s growth.', color: 'text-blue-700 bg-blue-50' },
  { icon: 'fas fa-calendar', title: 'Monthly Events', desc: 'Hackathons, webinars, tech talks, and networking events in Juba and online — free for all community members.', color: 'text-primary bg-primary/10' },
]

const benefits = [
  'Access exclusive job opportunities before they\'re posted publicly',
  'Connect with 500+ South Sudanese tech professionals and students',
  'Get early access to new SNC courses and free learning materials',
  'Join monthly community events, hackathons, and networking sessions',
  'Find collaborators for projects and startups',
  'Access peer support, code reviews, and career advice',
]

export default function Community() {
  return (
    <>
      <Helmet><title>Join Our Community - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Join Us" title="Join Our Community" desc="Connect with 500+ South Sudanese tech professionals, students, and entrepreneurs building the future together." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">The SNC Community</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">You Don't Have to Build Alone</h2>
              <p className="text-muted leading-relaxed mb-4">The SNC community is South Sudan's most active tech network — connecting students, graduates, developers, designers, and entrepreneurs who are passionate about technology's role in our nation's future.</p>
              <p className="text-muted leading-relaxed mb-6">Whether you're just starting out, switching careers, or scaling a startup — this community has the people, resources, and support you need to grow faster.</p>
              <h3 className="font-semibold text-dark mb-3">Community Benefits:</h3>
              <ul className="space-y-2 mb-6">
                {benefits.map(b => (
                  <li key={b} className="flex items-start gap-2 text-sm text-muted">
                    <i className="fas fa-check text-primary text-xs mt-1 flex-shrink-0" /> {b}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary">Join the Community</Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {channels.map(({ icon, title, desc, color }, i) => (
                <motion.div key={title} className="card p-5" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
                    <i className={`${icon} text-lg`} />
                  </div>
                  <h3 className="font-heading font-bold text-dark mb-1">{title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[['500+', 'Community Members'], ['50+', 'Monthly Events'], ['200+', 'Jobs Shared Monthly'], ['10+', 'Active Groups']].map(([v, l]) => (
                <div key={l}>
                  <div className="text-4xl font-heading font-black mb-1">{v}</div>
                  <div className="text-white/80 text-sm">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Your People Are Waiting</h2>
          <p className="text-gray-300 mb-8">Join 500+ South Sudanese tech professionals who are learning, building, and growing together.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Join Now</Link>
            <a href="https://wa.me/211925277700" target="_blank" rel="noopener noreferrer" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">
              <i className="fab fa-whatsapp" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
