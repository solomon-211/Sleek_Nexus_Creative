import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const studies = [
  {
    img: '/images/project1-detail.jpg',
    tag: 'EdTech',
    title: 'E-Learning Platform Serving 10,000+ Students',
    client: 'Education Sector',
    duration: '6 months',
    year: '2023',
    tech: ['React', 'Node.js', 'MongoDB', 'AWS', 'WebRTC'],
    challenge: 'A leading educational institution needed a scalable online learning platform to reach students across multiple locations — requiring video hosting, interactive assessments, progress tracking, and certification management.',
    solution: 'We developed a comprehensive LMS with video streaming, real-time quizzes, discussion forums, and automated grading — with mobile-responsive design and integration with existing student information systems.',
    results: ['10,000+ active students', '95% user satisfaction rate', '40% increase in course completion', '60% reduction in administrative workload'],
  },
  {
    img: '/images/project3.jpg',
    tag: 'FinTech',
    title: 'Mobile Banking App — South Sudan\'s First Locally Built Fintech',
    client: 'Financial Services',
    duration: '3 months',
    year: '2024',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'Firebase'],
    challenge: 'A financial services provider needed a secure, lightweight mobile banking application that worked reliably on low-end Android devices with intermittent internet connectivity.',
    solution: 'We built an offline-first React Native app with biometric authentication, local data caching, and background sync — designed for Android devices with as little as 1GB RAM.',
    results: ['5,000+ downloads in first month', 'Works on 2G connections', '99.8% transaction success rate', 'Featured in local media as a fintech milestone'],
  },
  {
    img: '/images/project2.jpg',
    tag: 'Enterprise',
    title: 'Business Management System for Growing Retailer',
    client: 'Retail Business',
    duration: '4 months',
    year: '2023',
    tech: ['Vue.js', 'Laravel', 'MySQL', 'Redis'],
    challenge: 'A multi-branch retail business was managing inventory, sales, and staff across 5 locations using disconnected spreadsheets and WhatsApp messages, leading to stock errors and operational inefficiencies.',
    solution: 'We built a centralized ERP with real-time inventory sync across all branches, automated purchase order generation, sales reporting, and an employee management module.',
    results: ['70% reduction in stock discrepancies', 'Real-time visibility across 5 branches', '3 hours saved per day on manual reporting', 'ROI achieved within 4 months of launch'],
  },
]

export default function CaseStudies() {
  return (
    <>
      <Helmet><title>Case Studies - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Deep Dives" title="Case Studies" desc="Behind-the-scenes looks at how we approach complex problems, make technical decisions, and deliver real results." />

      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 space-y-24">
          {studies.map(({ img, tag, title, client, duration, year, tech, challenge, solution, results }, idx) => (
            <motion.div key={title} className={`grid lg:grid-cols-3 gap-8 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <span className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
                  <h2 className="text-2xl font-heading font-bold text-dark mt-3 mb-2">{title}</h2>
                </div>
                <img src={img} alt={title} className="rounded-2xl w-full object-cover h-64" loading="lazy" />
                <div>
                  <h3 className="font-heading font-bold text-dark text-lg mb-2">The Challenge</h3>
                  <p className="text-muted leading-relaxed">{challenge}</p>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-dark text-lg mb-2">Our Solution</h3>
                  <p className="text-muted leading-relaxed">{solution}</p>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-dark text-lg mb-3">Results</h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {results.map(r => (
                      <li key={r} className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-sm text-dark font-medium">
                        <i className="fas fa-check-circle text-primary" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-6">
                <div className="card p-6">
                  <h4 className="font-heading font-bold text-dark mb-4">Project Info</h4>
                  {[['Client', client], ['Year', year], ['Duration', duration], ['Category', tag]].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2 border-b border-gray-100 last:border-0 text-sm">
                      <span className="text-muted">{k}</span>
                      <span className="font-medium text-dark">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="card p-6">
                  <h4 className="font-heading font-bold text-dark mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {tech.map(t => <span key={t} className="bg-dark text-white text-xs px-3 py-1 rounded-full">{t}</span>)}
                  </div>
                </div>
                <Link to="/contact" className="btn-primary w-full justify-center">Start Your Project</Link>
              </div>
            </motion.div>
          ))}
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
