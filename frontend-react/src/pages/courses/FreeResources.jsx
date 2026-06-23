import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

// `file` points to a PDF placed in /public/downloads/. Replace each path with the
// real file once it's uploaded there (the filename must match exactly).
const resources = [
  { icon: 'fa-code', tag: 'Web Dev', title: 'HTML & CSS Starter Kit', desc: 'A beginner-friendly introduction to building web pages with HTML5 and CSS3. Includes exercises and a mini project.', type: 'PDF Guide', file: '/downloads/html-css-starter-kit.pdf' },
  { icon: 'fa-js', tag: 'JavaScript', title: 'JavaScript Fundamentals Cheatsheet', desc: 'Quick reference for variables, functions, arrays, objects, and ES6+ features. Perfect for beginners and review.', type: 'Cheatsheet PDF', file: '/downloads/javascript-fundamentals-cheatsheet.pdf' },
  { icon: 'fa-mobile-alt', tag: 'Mobile', title: 'Mobile App Planning Template', desc: 'A structured template for defining your app\'s features, user flows, and tech requirements before development.', type: 'Template', file: '/downloads/mobile-app-planning-template.pdf' },
  { icon: 'fa-database', tag: 'Database', title: 'SQL Basics for Beginners', desc: 'Learn to write SELECT, INSERT, UPDATE, and DELETE queries with real-world examples and exercises.', type: 'PDF Guide', file: '/downloads/sql-basics-for-beginners.pdf' },
  { icon: 'fa-palette', tag: 'Design', title: 'UI Design Principles Poster', desc: 'Visual guide to the 10 most important UI design principles — great for printing and keeping at your desk.', type: 'Poster PDF', file: '/downloads/ui-design-principles-poster.pdf' },
  { icon: 'fa-shield-alt', tag: 'Security', title: 'Cybersecurity Checklist for SMEs', desc: 'A practical 20-point security checklist any small or medium business can implement without a dedicated IT team.', type: 'Checklist PDF', file: '/downloads/cybersecurity-checklist-smes.pdf' },
]

// `url` is the full YouTube (or other) link the lesson opens. Replace each `#`
// placeholder with the real video URL.
const videos = [
  { title: 'Build Your First React App in 30 Minutes', duration: '32 min', level: 'Beginner', views: '1.2K', url: '#' },
  { title: 'How to Design a Mobile App in Figma', duration: '45 min', level: 'Beginner', views: '980', url: '#' },
  { title: 'Python for Absolute Beginners — Lesson 1', duration: '28 min', level: 'Beginner', views: '2.1K', url: '#' },
]

export default function FreeResources() {
  return (
    <>
      <Helmet><title>Free Resources - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="SNC Academy" title="Free Resources" desc="High-quality learning materials available at no cost — because we believe every South Sudanese learner deserves access to great education." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Free Downloads</p>
            <h2 className="section-title">Guides, Cheatsheets & Templates</h2>
            <p className="section-subtitle">Download any of these resources for free — no email required.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map(({ icon, tag, title, desc, type, file }, i) => (
              <motion.div key={title} className="card p-6 flex flex-col" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <i className={`fas ${icon} text-primary`} />
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-full">FREE</span>
                </div>
                <span className="text-xs text-primary font-semibold uppercase tracking-wide mb-2">{tag}</span>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4 flex-1">{desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-muted flex items-center gap-1"><i className="fas fa-file-alt text-primary" /> {type}</span>
                  <a href={file} download className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">Download <i className="fas fa-download text-xs" /></a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Videos */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Free Video Lessons</p>
            <h2 className="section-title">Start Learning Right Now</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map(({ title, duration, level, views, url }, i) => (
              <motion.a
                key={title}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch: ${title}`}
                className="card p-6 block group"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="bg-dark rounded-xl h-36 flex items-center justify-center mb-4 overflow-hidden">
                  <i className="fas fa-play-circle text-white text-4xl opacity-80 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100" />
                </div>
                <h3 className="font-heading font-bold text-dark mb-3 group-hover:text-primary transition-colors">{title}</h3>
                <div className="flex gap-4 text-xs text-muted">
                  <span><i className="fas fa-clock text-primary mr-1" />{duration}</span>
                  <span><i className="fas fa-signal text-primary mr-1" />{level}</span>
                  <span><i className="fas fa-eye text-primary mr-1" />{views} views</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Want More? Enroll in a Full Course.</h2>
          <p className="text-gray-300 mb-8">Our paid courses go deep with projects, mentorship, and a certificate you can use in your career.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/courses" className="btn-primary">Browse All Courses</Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Talk to an Advisor</Link>
          </div>
        </div>
      </section>
    </>
  )
}
