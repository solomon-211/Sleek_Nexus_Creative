import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const offers = ['Learning Management Systems (LMS)', 'Online Course Platforms', 'Student Information Systems', 'Video Streaming & Media', 'Automated Assessments & Grading', 'Progress Tracking & Analytics', 'Digital Certificates', 'Offline Learning Support']

const features = [
  { icon: 'fa-video', label: 'Video Learning' },
  { icon: 'fa-chart-line', label: 'Progress Tracking' },
  { icon: 'fa-users', label: 'Collaboration Tools' },
  { icon: 'fa-certificate', label: 'Auto Certificates' },
  { icon: 'fa-wifi', label: 'Offline Mode' },
  { icon: 'fa-mobile-alt', label: 'Mobile Friendly' },
  { icon: 'fa-language', label: 'Multi-Language' },
  { icon: 'fa-shield-alt', label: 'Secure Access' },
]

const useCases = [
  { icon: 'fa-school', title: 'Schools & Universities', desc: 'Student portals, grade management, attendance tracking, and parent communication platforms.' },
  { icon: 'fa-building', title: 'Corporate Training', desc: 'Employee onboarding, compliance training, and skill development platforms for organizations.' },
  { icon: 'fa-globe', title: 'NGOs & Non-Profits', desc: 'Community education platforms, program tracking, and beneficiary management systems.' },
  { icon: 'fa-user-graduate', title: 'Independent Educators', desc: 'Course platforms for trainers and educators to sell and deliver courses online.' },
]

export default function Elearning() {
  return (
    <>
      <Helmet><title>E-Learning Solutions - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Services" title="E-Learning Solutions" desc="Custom educational technology platforms that make quality learning accessible across South Sudan — online, offline, and on any device." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Educational Technology</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">Learning Platforms Built for South Sudan's Reality</h2>
              <p className="text-muted leading-relaxed mb-4">We've built e-learning platforms serving 10,000+ students across South Sudan. We know what works — lightweight video, offline access, SMS notifications, and interfaces that work on any phone.</p>
              <p className="text-muted leading-relaxed mb-6">Whether you need an LMS for a university, a training platform for corporate staff, or a community learning hub — we design and build it end to end.</p>
              <h3 className="font-semibold text-dark mb-3">What We Offer:</h3>
              <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                {offers.map(o => (
                  <li key={o} className="flex items-center gap-2 text-sm text-muted">
                    <i className="fas fa-check text-primary text-xs" /> {o}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary">Request a Demo</Link>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <img src="/images/edtech.jpg" alt="E-Learning Solutions" className="rounded-2xl shadow-xl w-full h-[420px] object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Platform Features</p>
            <h2 className="section-title">Everything Your Learners Need</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {features.map(({ icon, label }) => (
              <div key={label} className="card p-5 flex items-center gap-3">
                <i className={`fas ${icon} text-primary`} />
                <span className="text-sm font-medium text-dark">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Who We Serve</p>
            <h2 className="section-title">Use Cases</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map(({ icon, title, desc }, i) => (
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
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Build Your Learning Platform?</h2>
          <p className="text-gray-300 mb-8">We've built platforms serving thousands of learners — let us build yours.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Get a Free Consultation</Link>
            <Link to="/courses" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Browse Our Courses</Link>
          </div>
        </div>
      </section>
    </>
  )
}
