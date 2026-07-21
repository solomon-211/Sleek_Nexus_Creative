import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/ui/SEO'
import { fadeUp, staggerContainer, staggerItem } from '../lib/animations'

const filters = ['all', 'web', 'mobile', 'edtech', 'enterprise']

const projects = [
  { id: 1, category: 'edtech',      img: '/images/project1.jpg',           tags: ['EdTech', 'Web App'],    title: 'E-Learning Platform',         desc: 'Online learning platform for a Juba-based institution with video courses, assessments, and progress tracking for enrolled students.',          year: '2024', client: 'Education Sector' },
  { id: 2, category: 'enterprise',  img: '/images/project2.jpg',           tags: ['Enterprise', 'Web App'],title: 'Business Management System',  desc: 'Custom inventory and operations system for a local retail business to manage stock, sales, and daily workflows.',                              year: '2024', client: 'Retail Business' },
  { id: 3, category: 'mobile',      img: '/images/project3.jpg',           tags: ['Mobile', 'Payments'],   title: 'Mobile Payments App',         desc: 'Simple and secure mobile app enabling small businesses to send and receive payments with transaction history.',                               year: '2025', client: 'Local Business' },
  { id: 4, category: 'web',         img: '/images/project-ecommerce.jpg',  tags: ['Web App', 'E-Commerce'],title: 'E-Commerce Website',          desc: 'Online store with product listings, order management, and WhatsApp checkout integration for a local retailer.',                              year: '2024', client: 'Retail' },
  { id: 5, category: 'edtech',      img: '/images/project-student-system.jpg', tags: ['EdTech', 'Portal'], title: 'Student Information System',  desc: 'Portal for managing student records, grades, and attendance for a secondary school in Juba.',                                                year: '2024', client: 'Secondary School' },
  { id: 6, category: 'mobile',      img: '/images/project6.jpg',           tags: ['Mobile', 'Health'],     title: 'Health Tracking App',         desc: 'Mobile app for tracking basic health metrics and appointment reminders, built for a local health clinic.',                                   year: '2025', client: 'Health Clinic' },
  { id: 7, category: 'mobile',      img: '/images/Screenshot 2026-04-20 190503.png', logo: '/images/Hb.png', tags: ['Mobile', 'Health'], title: 'HealthHub Bridge', desc: 'A health connectivity platform bridging patients and healthcare providers — enabling appointment booking, health records, and remote consultations.', year: '2025', client: 'Healthcare Sector' },
]

const cases = [
  {
    tag: 'E-Learning', tagColor: 'bg-blue-100 text-blue-700',
    img: '/images/project1.jpg',
    client: 'Juba Learning Centre',
    title: 'E-Learning Platform',
    challenge: 'A Juba-based learning centre needed a simple online platform to deliver courses to enrolled students — requiring video hosting, assessments, progress tracking, and a way to issue certificates.',
    solution: 'We built a straightforward LMS with video lessons, quizzes, and progress dashboards — optimized for low-bandwidth connections and designed so non-technical staff could manage it without ongoing developer support.',
    results: ['Launched with 80+ enrolled students', 'Staff trained to manage platform independently', 'Reduced admin workload for course management', 'Mobile-friendly for low-bandwidth access'],
    tech: ['React', 'Node.js', 'MongoDB', 'DigitalOcean'],
  },
  {
    tag: 'Enterprise', tagColor: 'bg-green-100 text-green-700',
    img: '/images/project2.jpg',
    client: 'Local Retail Business — Juba',
    title: 'Business Management System',
    challenge: 'A multi-branch retail business was managing inventory and sales across spreadsheets with no central visibility, leading to stock errors and slow reporting.',
    solution: 'Built a web-based inventory and operations system with a central dashboard, stock alerts, sales tracking, and a simple interface that non-technical staff could use from day one.',
    results: ['Eliminated duplicate stock entries', 'Daily reporting time cut by 2+ hours', 'Deployed across 2 branches simultaneously', 'Staff fully trained within one week'],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    tag: 'NGO / Humanitarian', tagColor: 'bg-orange-100 text-orange-700',
    img: '/images/project-student-system.jpg',
    client: 'Secondary School — Juba',
    title: 'Student Information System',
    challenge: 'A secondary school in Juba was managing student records, grades, and attendance manually across paper registers and disconnected spreadsheets, making reporting slow and error-prone.',
    solution: 'Built a web portal for managing student records, grades, and attendance — with teacher dashboards, admin reporting, and a parent-facing view for tracking student progress.',
    results: ['All student records migrated digitally', 'Term reports generated in minutes vs. days', 'Teachers trained and using system independently', 'Reduced administrative errors significantly'],
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
  },
]

export default function Projects() {
  const [active, setActive] = useState('all')
  const [openCase, setOpenCase] = useState(null)

  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  return (
    <>
      <SEO
        title="Our Projects — Portfolio & Case Studies"
        description="View Sleek Nexus Creative's portfolio of technology projects in South Sudan — e-learning platforms, business management systems, mobile payment apps, and more."
        canonical="/projects"
        image="https://sleeknexuscreative.com/images/project1.jpg"
        imageAlt="E-Learning Platform project by Sleek Nexus Creative"
        breadcrumbs={[{ name: 'Projects', url: '/projects' }]}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-dark to-dark-soft text-white py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }}>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">What We've Built</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Our Projects</h1>
            <p className="text-gray-300 text-lg leading-relaxed">A portfolio of digital solutions built for businesses, schools, and organizations across South Sudan.</p>
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
              {filtered.map(({ id, img, logo, tags, title, desc, year, client }) => (
                <motion.div key={id} layout className="card overflow-hidden group"
                  variants={staggerItem}
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                  <div className="relative overflow-hidden h-52">
                    <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    {logo && (
                      <div className="absolute bottom-3 left-3 bg-white rounded-xl px-2 py-1 shadow-md">
                        <img src={logo} alt={`${title} logo`} className="h-7 w-auto object-contain" />
                      </div>
                    )}
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

      {/* Case Studies */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Deep Dives</p>
            <h2 className="section-title">Case Studies</h2>
            <p className="section-subtitle">A closer look at the challenge, solution, and results behind selected projects.</p>
          </div>
          <div className="space-y-4">
            {cases.map(({ tag, tagColor, img, client, title, challenge, solution, results, tech }, i) => (
              <motion.div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                {/* Accordion header */}
                <button
                  className="w-full flex items-center justify-between p-6 text-left gap-4"
                  onClick={() => setOpenCase(openCase === i ? null : i)}
                >
                  <div className="flex items-center gap-4">
                    <img src={img} alt={title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                    <div>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${tagColor} mb-1 inline-block`}>{tag}</span>
                      <h3 className="font-heading font-bold text-dark">{title}</h3>
                      <p className="text-muted text-xs">{client}</p>
                    </div>
                  </div>
                  <i className={`fas fa-chevron-down text-primary transition-transform duration-200 flex-shrink-0 ${openCase === i ? 'rotate-180' : ''}`} />
                </button>

                {/* Accordion body */}
                <AnimatePresence>
                  {openCase === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-gray-100 pt-5">
                        <div className="grid sm:grid-cols-2 gap-5 mb-5">
                          {[
                            { label: 'The Challenge', icon: 'fa-exclamation-triangle', content: challenge },
                            { label: 'Our Solution',  icon: 'fa-lightbulb',            content: solution },
                          ].map(({ label, icon, content }) => (
                            <div key={label} className="bg-gray-50 rounded-xl p-4">
                              <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-2 flex items-center gap-1.5">
                                <i className={`fas ${icon} text-[0.65rem]`} /> {label}
                              </h4>
                              <p className="text-muted text-sm leading-relaxed">{content}</p>
                            </div>
                          ))}
                        </div>
                        <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 mb-4">
                          <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-3 flex items-center gap-1.5">
                            <i className="fas fa-chart-line text-[0.65rem]" /> Results
                          </h4>
                          <ul className="grid sm:grid-cols-2 gap-1.5">
                            {results.map(r => (
                              <li key={r} className="flex items-center gap-2 text-sm text-dark-soft font-medium">
                                <i className="fas fa-check-circle text-primary text-xs flex-shrink-0" /> {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tech.map(t => (
                            <span key={t} className="bg-gray-100 text-dark-soft text-xs font-semibold px-2.5 py-1 rounded-lg">{t}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Have a Project in Mind?</h2>
          <p className="text-gray-300 mb-8">Tell us what you need and we'll get back to you within 24 hours.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Start a Project</Link>
            <Link to="/services" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">View Services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
