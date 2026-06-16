import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const benefits = [
  { icon: 'fa-rocket', title: 'Meaningful Projects', desc: 'Every project you work on at SNC has real users, real stakes, and real impact — from e-learning platforms to fintech apps serving underserved communities.' },
  { icon: 'fa-users', title: 'Collaborative Team', desc: 'Work alongside engineers, designers, trainers, and strategists who are passionate about technology and South Sudan.' },
  { icon: 'fa-chart-line', title: 'Real Career Growth', desc: 'We invest in your development through mentorship, learning budgets, and a clear path from junior to senior to leadership.' },
  { icon: 'fa-balance-scale', title: 'Work-Life Balance', desc: 'Flexible hours, remote work options, and a culture that respects your time outside of work. We build sustainably.' },
  { icon: 'fa-hand-holding-usd', title: 'Competitive Pay', desc: 'Competitive salaries benchmarked to the local and regional market, plus performance bonuses and clear salary review timelines.' },
  { icon: 'fa-heart', title: 'Health & Wellbeing', desc: 'Health coverage support, mental wellness resources, and an environment where asking for help is encouraged.' },
]

const openRoles = [
  { title: 'Senior Frontend Developer', dept: 'Engineering', type: 'Full-Time', location: 'Juba / Remote', desc: 'Lead UI development for client projects using React.js. Build fast, accessible interfaces and collaborate with design and backend teams.' },
  { title: 'Full-Stack Engineer (Node.js / React)', dept: 'Engineering', type: 'Full-Time', location: 'Juba / Remote', desc: 'Own features end-to-end from database schema to React UI. Work on varied client platforms including web apps and educational tools.' },
  { title: 'UI/UX Designer', dept: 'Design', type: 'Full-Time', location: 'Juba / Remote', desc: 'Lead product design from wireframes to high-fidelity Figma mockups. Conduct user research and collaborate with developers.' },
  { title: 'Education Program Manager', dept: 'Training & Education', type: 'Full-Time', location: 'Juba', desc: 'Manage our training programs — overseeing curriculum, trainer coordination, student cohorts, and employer partnerships.' },
]

const process = [
  { n: '1', title: 'Submit Application', desc: 'Fill in the form below or apply via a specific role listing with your CV and a short cover note.' },
  { n: '2', title: 'Initial Review', desc: 'Our team reviews every application within 3–5 business days and contacts you by email or phone.' },
  { n: '3', title: 'Skills Conversation', desc: 'A 30–60 minute call or in-person session to discuss your experience and see how you think.' },
  { n: '4', title: 'Final Interview', desc: 'Meet the team lead and discuss role expectations, compensation, and start date.' },
  { n: '5', title: 'Offer & Onboarding', desc: 'Receive your written offer, sign, and start with a structured first week.' },
]

export default function Careers() {
  return (
    <>
      <Helmet><title>Careers - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Join Us" title="Careers at SNC" desc="Build your career with meaningful projects and talented people who are shaping South Sudan's digital future." />

      {/* Benefits */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Life at SNC</p>
            <h2 className="section-title">Why Work With Us?</h2>
            <p className="section-subtitle">We build more than products — we build careers, community, and South Sudan's digital future.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Open Roles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Currently Hiring</p>
            <h2 className="section-title">Open Positions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {openRoles.map(({ title, dept, type, location, desc }) => (
              <motion.div key={title} className="card p-6" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4 }}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-heading font-bold text-dark">{title}</h3>
                    <span className="text-primary text-xs font-semibold">{dept}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">{type}</span>
                    <span className="bg-gray-100 text-muted text-xs font-semibold px-3 py-1 rounded-full">{location}</span>
                  </div>
                </div>
                <p className="text-muted text-sm leading-relaxed mb-4">{desc}</p>
                <Link to="/contact" className="btn-primary text-sm px-4 py-2">View & Apply</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">How It Works</p>
            <h2 className="section-title">Our Hiring Process</h2>
            <p className="section-subtitle">Transparent, fast, and respectful of your time.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {process.map(({ n, title, desc }) => (
              <div key={n} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-black text-lg flex items-center justify-center mx-auto mb-3">{n}</div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Don't See the Right Role?</h2>
          <p className="text-gray-300 mb-8">We keep strong applications on file. Send us your CV and tell us what you'd like to do — we'll reach out when the right opportunity opens.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Send Your CV</Link>
            <Link to="/join/internships" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">View Internships</Link>
          </div>
        </div>
      </section>
    </>
  )
}
