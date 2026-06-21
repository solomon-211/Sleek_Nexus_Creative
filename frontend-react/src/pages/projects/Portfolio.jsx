import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

const filters = ['all', 'web', 'mobile', 'edtech', 'enterprise']

const projects = [
  { id: 1, category: 'edtech', img: '/images/project1.jpg', tags: ['EdTech', 'Web App'], title: 'E-Learning Platform', desc: 'Comprehensive online learning system serving 100+ students with video courses, assessments, and progress tracking.', year: '2024', client: 'Education Sector' },
  { id: 2, category: 'enterprise', img: '/images/project2.jpg', tags: ['Enterprise', 'Web App'], title: 'Business Management System', desc: 'Integrated ERP solution streamlining operations, inventory, and customer management for growing enterprises.', year: '2024', client: 'Retail Business' },
  { id: 3, category: 'mobile', img: '/images/project3.jpg', tags: ['Mobile', 'FinTech'], title: 'Mobile Banking App', desc: 'Secure and user-friendly mobile banking application with biometric authentication and real-time transactions.', year: '2025', client: 'Financial Services' },
  { id: 4, category: 'web', img: '/images/project-ecommerce.jpg', tags: ['Web App', 'E-Commerce'], title: 'E-Commerce Platform', desc: 'Full-featured online marketplace with payment integration, inventory management, and analytics dashboard.', year: '2024', client: 'Retail' },
  { id: 5, category: 'edtech', img: '/images/project-student-system.jpg', tags: ['EdTech', 'Portal'], title: 'Student Information System', desc: 'Comprehensive portal for managing student records, grades, attendance, and parent communication.', year: '2025', client: 'University' },
  { id: 6, category: 'mobile', img: '/images/project6.jpg', tags: ['Mobile', 'Health'], title: 'Fitness Tracking App', desc: 'Mobile app for tracking workouts, nutrition, and health metrics with AI-powered recommendations.', year: '2025', client: 'Health & Wellness' },
]

export default function Portfolio() {
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  return (
    <>
      <Helmet><title>Portfolio - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Our Work" title="Project Portfolio" desc="A showcase of the digital solutions we've built for organizations across South Sudan and beyond." />

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

      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map(({ id, img, tags, title, desc, year, client }) => (
                <motion.div key={id} layout className="card overflow-hidden group"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                  <div className="relative overflow-hidden h-52">
                    <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link to="/projects/case-studies" className="text-white text-sm font-semibold border border-white rounded-full px-4 py-2">View Case Study</Link>
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
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Have a Project in Mind?</h2>
          <p className="text-gray-300 mb-8">Let's turn your ideas into a product that gets results.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Start a Project</Link>
            <Link to="/projects/case-studies" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Read Case Studies</Link>
          </div>
        </div>
      </section>
    </>
  )
}
