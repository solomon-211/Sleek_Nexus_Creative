import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const offers = ['Custom Website Development', 'Responsive Web Design', 'Progressive Web Apps (PWA)', 'E-Commerce Platforms', 'CMS Development (WordPress, Custom)', 'API Development & Integration', 'Landing Pages & Marketing Sites', 'Web App Dashboards & Portals']

const techs = ['React.js', 'Vue.js', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Tailwind CSS']

const process = [
  { n: '01', icon: 'fa-search', title: 'Discovery', desc: 'We understand your goals, audience, and requirements.' },
  { n: '02', icon: 'fa-pencil-ruler', title: 'Design', desc: 'Wireframes and UI mockups aligned with your brand.' },
  { n: '03', icon: 'fa-code', title: 'Development', desc: 'Clean, fast, maintainable code built to your specs.' },
  { n: '04', icon: 'fa-vial', title: 'Testing', desc: 'Cross-browser, mobile, performance, and security testing.' },
  { n: '05', icon: 'fa-rocket', title: 'Launch', desc: 'Deployment, domain setup, and go-live support.' },
  { n: '06', icon: 'fa-headset', title: 'Support', desc: 'Ongoing maintenance and post-launch updates.' },
]

export default function WebDev() {
  return (
    <>
      <Helmet><title>Web Development - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Services" title="Web Development" desc="Custom, responsive, and high-performing websites and web applications built for South Sudan and beyond." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">What We Build</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">Websites That Work — For Real Users, On Real Networks</h2>
              <p className="text-muted leading-relaxed mb-4">We build websites and web applications optimized for South Sudan's real conditions — low bandwidth, mobile-first users, and organizations that need reliability above all else.</p>
              <p className="text-muted leading-relaxed mb-6">Every project gets a dedicated developer, thorough QA, and a clear handover with documentation and training so your team can manage it confidently.</p>
              <h3 className="font-semibold text-dark mb-3">What We Offer:</h3>
              <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                {offers.map(o => (
                  <li key={o} className="flex items-center gap-2 text-sm text-muted">
                    <i className="fas fa-check text-primary text-xs" /> {o}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary">Request a Quote</Link>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <img src="/images/web-mobile.jpg" alt="Web Development" className="rounded-2xl shadow-xl w-full h-[420px] object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">Our Stack</p>
          <h2 className="section-title">Technologies We Use</h2>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            {techs.map(t => <span key={t} className="bg-dark text-white text-sm font-semibold px-4 py-2 rounded-full">{t}</span>)}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">How We Work</p>
            <h2 className="section-title">Our Development Process</h2>
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

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Build Your Website?</h2>
          <p className="text-gray-300 mb-8">Get a free consultation and custom quote within 24 hours.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
            <Link to="/projects/portfolio" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">See Our Work</Link>
          </div>
        </div>
      </section>
    </>
  )
}
