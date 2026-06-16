import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const projects = [
  { img: '/images/project1.jpg', tag: 'Web App', student: 'Michael Deng', course: 'Full-Stack Bootcamp', title: 'Community Health Tracker', desc: 'A web app for tracking and reporting community health data across 5 districts. Built with React and Node.js.', tech: ['React', 'Node.js', 'MongoDB'] },
  { img: '/images/project3.jpg', tag: 'Mobile App', student: 'Grace Ayen', course: 'React Native Course', title: 'Market Price App', desc: 'Mobile app that aggregates real-time commodity prices from Juba markets, helping traders and buyers make informed decisions.', tech: ['React Native', 'Firebase'] },
  { img: '/images/project2.jpg', tag: 'Enterprise', student: 'James Loro', course: 'Full-Stack Bootcamp', title: 'School Management System', desc: 'Complete school admin system with attendance, grades, fee management, and parent portal for a Juba secondary school.', tech: ['Vue.js', 'Laravel', 'MySQL'] },
  { img: '/images/project-student-system.jpg', tag: 'EdTech', student: 'Abuk Malual', course: 'Mobile Dev Course', title: 'Language Learning App', desc: 'Mobile app for learning Dinka and Nuer through interactive lessons, audio exercises, and vocabulary flashcards.', tech: ['Flutter', 'Firebase'] },
]

const benefits = [
  { icon: 'fa-briefcase', title: 'Real Portfolio Pieces', desc: 'Every project is production-quality work you can show employers, clients, and universities.' },
  { icon: 'fa-users', title: 'Mentored Development', desc: 'You build under the guidance of a senior developer who reviews your code and helps you improve.' },
  { icon: 'fa-rocket', title: 'Launch-Ready Products', desc: 'Many student projects get deployed and used by real organizations in South Sudan.' },
  { icon: 'fa-trophy', title: 'Showcase & Recognition', desc: 'Top projects are featured on the SNC website and shared with our employer network.' },
]

export default function StudentProjects() {
  return (
    <>
      <Helmet><title>Student Projects - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="SNC Academy" title="Student Projects" desc="Real products built by our students — proof that great learning leads to great work." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Student Showcase</p>
            <h2 className="section-title">Built by Our Students</h2>
            <p className="section-subtitle">These are real projects built during our courses — not exercises, but production apps solving real problems.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {projects.map(({ img, tag, student, course, title, desc, tech }, i) => (
              <motion.div key={title} className="card overflow-hidden" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="relative h-52 overflow-hidden">
                  <img src={img} alt={title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent flex items-end p-4">
                    <span className="text-xs bg-primary text-white font-bold px-2.5 py-1 rounded-full">{tag}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <i className="fas fa-user text-primary text-xs" />
                    </div>
                    <span className="text-sm text-muted">{student} · <span className="text-primary font-medium">{course}</span></span>
                  </div>
                  <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">{desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tech.map(t => <span key={t} className="bg-dark text-white text-xs px-2.5 py-0.5 rounded-full">{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Why It Matters</p>
            <h2 className="section-title">Build While You Learn</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Build Your Own Project?</h2>
          <p className="text-gray-300 mb-8">Enroll in one of our courses and start building something real.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/courses" className="btn-primary">Browse Courses</Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Talk to an Advisor</Link>
          </div>
        </div>
      </section>
    </>
  )
}
