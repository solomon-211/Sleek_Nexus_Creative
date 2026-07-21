import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/ui/SEO'
import { fadeUpSm as fadeUp, staggerContainer, staggerItem } from '../lib/animations'

const filters = ['all', 'web', 'mobile', 'edtech', 'enterprise']

const projects = [
  { id: 1, category: 'edtech', img: '/images/project1.jpg', tags: ['EdTech', 'Web App'], title: 'E-Learning Platform', desc: 'Online learning platform for a Juba-based institution with video courses, assessments, and progress tracking for enrolled students.', year: '2024', client: 'Education Sector', tech: ['React', 'Node.js', 'MongoDB', 'DigitalOcean'], results: ['Launched with 80+ enrolled students', 'Staff trained to manage platform independently', 'Reduced admin workload for course management', 'Mobile-friendly for low-bandwidth access'] },
  { id: 2, category: 'enterprise', img: '/images/project2.jpg', tags: ['Enterprise', 'Web App'], title: 'Business Management System', desc: 'Custom inventory and operations system for a local retail business to manage stock, sales, and daily workflows.', year: '2024', client: 'Retail Business' },
  { id: 3, category: 'mobile', img: '/images/project3.jpg', tags: ['Mobile', 'Payments'], title: 'Mobile Payments App', desc: 'Simple and secure mobile app enabling small businesses to send and receive payments with transaction history.', year: '2025', client: 'Local Business' },
  { id: 4, category: 'web', img: '/images/project-ecommerce.jpg', tags: ['Web App', 'E-Commerce'], title: 'E-Commerce Website', desc: 'Online store with product listings, order management, and WhatsApp checkout integration for a local retailer.', year: '2024', client: 'Retail' },
  { id: 5, category: 'edtech', img: '/images/project-student-system.jpg', tags: ['EdTech', 'Portal'], title: 'Student Information System', desc: 'Portal for managing student records, grades, and attendance for a secondary school in Juba.', year: '2024', client: 'Secondary School' },
  { id: 6, category: 'mobile', img: '/images/project6.jpg', tags: ['Mobile', 'Health'], title: 'Health Tracking App', desc: 'Mobile app for tracking basic health metrics and appointment reminders, built for a local health clinic.', year: '2025', client: 'Health Clinic' },
]

export default function Projects() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)
  const detail = projects.find(p => p.id === 1)

  return (
    <>
      <SEO
        title="Our Projects — Portfolio & Case Studies"
        description="View Sleek Nexus Creative's portfolio of successful technology projects in South Sudan — e-learning platforms, business management systems, mobile payment apps, and more."
        canonical="/projects"
        image="https://sleeknexuscreative.com/images/project1.jpg"
        imageAlt="E-Learning Platform project by Sleek Nexus Creative"
        breadcrumbs={[{ name: 'Projects', url: '/projects' }]}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-dark to-dark-soft text-white py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }}>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Transforming Vision Into Reality</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Our Projects</h1>
            <p className="text-gray-300 text-lg leading-relaxed">Explore our portfolio of successful projects that demonstrate our commitment to excellence and innovation across diverse industries.</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-gray-100 sticky top-[72px] bg-white z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map(f => (
              <button key={f} onClick={() => setActive(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-200 ${active === f ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-muted hover:bg-primary/10 hover:text-primary'}`}>
                {f === 'all' ? 'All Projects' : f === 'edtech' ? 'EdTech' : f.charAt(0).toUpperCase() + f.slice(1) + ' Apps'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer} initial="hidden" animate="show"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(({ id, img, tags, title, desc, year, client }) => (
                <motion.div key={id} layout className="card overflow-hidden group"
                  variants={staggerItem}
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                  <div className="relative overflow-hidden h-52">
                    <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold border border-white rounded-full px-4 py-2">View Details</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      {tags.map(t => <span key={t} className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-0.5 rounded-full">{t}</span>)}
                    </div>
                    <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                    <p className="text-muted text-sm leading-relaxed mb-4">{desc}</p>
                    <div className="flex gap-4 text-xs text-muted">
                      <span><i className="fas fa-calendar mr-1" />{year}</span>
                      <span><i className="fas fa-user mr-1" />{client}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Case Study Detail */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Case Study</p>
            <h2 className="section-title">E-Learning Platform</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <img src="/images/project1-detail.jpg" alt="E-Learning Platform" className="rounded-2xl w-full object-cover h-64" loading="lazy" />
              <div>
                <h3 className="font-heading font-bold text-dark text-lg mb-2">The Challenge</h3>
                <p className="text-muted leading-relaxed">A Juba-based learning centre needed a simple online platform to deliver courses to enrolled students — requiring video hosting, assessments, progress tracking, and a way to issue certificates.</p>
              </div>
              <div>
                <h3 className="font-heading font-bold text-dark text-lg mb-2">Our Solution</h3>
                <p className="text-muted leading-relaxed">We built a straightforward LMS with video lessons, quizzes, and progress dashboards — optimized for low-bandwidth connections and designed so non-technical staff could manage it without ongoing developer support.</p>
              </div>
              <div>
                <h3 className="font-heading font-bold text-dark text-lg mb-3">Results</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {detail.results.map(r => (
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
                {[['Client', 'Juba Learning Centre'], ['Year', '2024'], ['Duration', '3 months'], ['Category', 'EdTech']].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2 border-b border-gray-100 last:border-0 text-sm">
                    <span className="text-muted">{k}</span>
                    <span className="font-medium text-dark">{v}</span>
                  </div>
                ))}
              </div>
              <div className="card p-6">
                <h4 className="font-heading font-bold text-dark mb-4">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {detail.tech.map(t => <span key={t} className="bg-dark text-white text-xs px-3 py-1 rounded-full">{t}</span>)}
                </div>
              </div>
              <Link to="/contact" className="btn-primary w-full justify-center">Start Your Project</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Have a Project in Mind?</h2>
          <p className="text-gray-300 mb-8">Let's turn your ideas into reality.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Start a Project</Link>
            <Link to="/services" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">View Services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
