import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const certs = [
  { icon: 'fa-code', title: 'Certified Web Developer', desc: 'Demonstrates mastery of HTML, CSS, JavaScript, React, and Node.js. Awarded after completing the Full-Stack Bootcamp.', duration: '12 weeks', level: 'Intermediate', employer: true },
  { icon: 'fa-mobile-alt', title: 'Certified Mobile App Developer', desc: 'Covers React Native development, mobile UX, and app store deployment. Awarded after the Mobile Development course.', duration: '10 weeks', level: 'Intermediate', employer: true },
  { icon: 'fa-palette', title: 'Certified UI/UX Designer', desc: 'Covers user research, wireframing, Figma, and usability testing. For design-focused learners.', duration: '8 weeks', level: 'Beginner+', employer: false },
  { icon: 'fa-shield-alt', title: 'Certified Cybersecurity Practitioner', desc: 'Covers threat detection, network security, and incident response. Aligned with CompTIA Security+ objectives.', duration: '10 weeks', level: 'Intermediate', employer: true },
  { icon: 'fa-chart-line', title: 'Certified Data Analyst', desc: 'Covers Python, Pandas, Excel, and data visualization. For learners entering the data industry.', duration: '8 weeks', level: 'Beginner+', employer: false },
  { icon: 'fa-cloud', title: 'Certified Cloud Practitioner (AWS)', desc: 'Prepares learners for the AWS Cloud Practitioner exam. Covers core AWS services, billing, and architecture.', duration: '8 weeks', level: 'Intermediate', employer: true },
]

const process = [
  { n: '01', icon: 'fa-book-open', title: 'Complete the Course', desc: 'Attend all sessions, complete assignments, and participate in live projects.' },
  { n: '02', icon: 'fa-vial', title: 'Pass the Assessment', desc: 'Take a final project and knowledge assessment with a minimum score of 70%.' },
  { n: '03', icon: 'fa-award', title: 'Receive Your Certificate', desc: 'Get a verifiable digital certificate via email and LinkedIn-ready badge.' },
  { n: '04', icon: 'fa-briefcase', title: 'Career Support', desc: 'Access our job board, alumni network, and employer referrals.' },
]

export default function Certifications() {
  return (
    <>
      <Helmet><title>Certifications - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="SNC Academy" title="Certifications" desc="Earn industry-recognized certificates that help you land jobs, freelance clients, and career promotions in South Sudan's growing tech sector." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Available Certifications</p>
            <h2 className="section-title">Certificates That Open Doors</h2>
            <p className="section-subtitle">Each certification is earned through completing a course, building real projects, and passing an assessment.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map(({ icon, title, desc, duration, level, employer }, i) => (
              <motion.div key={title} className="card p-6" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <i className={`fas ${icon} text-primary`} />
                  </div>
                  {employer && <span className="text-xs bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-full">Employer Recognized</span>}
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{desc}</p>
                <div className="flex gap-3 text-xs text-muted">
                  <span><i className="fas fa-clock text-primary mr-1" />{duration}</span>
                  <span><i className="fas fa-signal text-primary mr-1" />{level}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">How It Works</p>
            <h2 className="section-title">The Path to Certification</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Earn Your Certificate?</h2>
          <p className="text-gray-300 mb-8">Enroll today and take the first step toward a recognized tech career.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/courses" className="btn-primary">Browse Courses</Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Ask a Question</Link>
          </div>
        </div>
      </section>
    </>
  )
}
