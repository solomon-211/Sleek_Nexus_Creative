import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'
import SEO from '../../components/ui/SEO'
import { pageSeo } from '../../lib/seo-data'
import { fadeUp } from '../../lib/animations'
import Img from '../../components/ui/Img'
import CtaBand from '../../components/ui/CtaBand'

const offers = ['Custom Website Development', 'Responsive Web Design', 'Progressive Web Apps (PWA)', 'E-Commerce Platforms', 'CMS Development (WordPress, Custom)', 'API Development & Integration', 'Landing Pages & Marketing Sites', 'Web App Dashboards & Portals']


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
      <SEO {...pageSeo['/services/web-dev']} />
      <PageHeader label="Services" title="Web Development" desc="Fast, secure websites and web applications engineered around your goals and built to perform for every visitor, on every device, wherever they are." />

      <section className="py-16 sm:py-24">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="eyebrow">What We Build</p>
              <h2 className="section-title">Websites That Work for Real Users on Real Networks</h2>
              <p className="text-muted leading-relaxed mb-4">We build websites and web applications that stay fast and dependable under real-world conditions: slow connections, older phones, and organizations that need reliability above all else.</p>
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
              <Img src="/images/web-development.jpg" alt="Web Development" className="rounded-2xl shadow-xl w-full h-[420px] object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container-page">
          <div className="text-center mb-14">
            <p className="eyebrow">How We Work</p>
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

      <CtaBand
        title="Ready to Build Your Website?"
        desc="Get a free consultation and custom quote within 24 hours."
        primary={{ to: '/contact', label: "Get a Free Quote" }}
        secondary={{ to: '/services', label: "All Services" }}
      />
    </>
  )
}
