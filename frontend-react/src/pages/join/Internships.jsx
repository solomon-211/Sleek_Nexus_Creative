import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const tracks = [
  { icon: 'fa-code', title: 'Software Development', desc: 'Work on real client projects alongside senior developers. Build features, fix bugs, and learn production-grade engineering.' },
  { icon: 'fa-pencil-ruler', title: 'UI/UX Design', desc: 'Design user interfaces for live projects, conduct user research, and create Figma prototypes used in real products.' },
  { icon: 'fa-bullhorn', title: 'Digital Marketing', desc: 'Run social media campaigns, write content, manage email newsletters, and analyze performance data.' },
  { icon: 'fa-chalkboard-teacher', title: 'Technical Training', desc: 'Assist senior trainers in course delivery, curriculum development, and student support for SNC Academy programs.' },
]

const benefits = [
  { icon: 'fa-calendar-alt', label: '3-Month Duration' },
  { icon: 'fa-briefcase', label: 'Live Client Projects' },
  { icon: 'fa-certificate', label: 'Certificate Included' },
  { icon: 'fa-dollar-sign', label: 'Monthly Stipend' },
]

export default function Internships() {
  return (
    <>
      <Helmet><title>Internships - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Join Us" title="Internship Program" desc="Gain real-world tech experience on live projects — not coffee runs. Start your tech career with SNC." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">About the Program</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">Real Work. Real Mentorship. Real Results.</h2>
              <p className="text-muted leading-relaxed mb-4">Our internship program is designed for students and recent graduates who want to gain genuine, portfolio-worthy experience. Every SNC intern works on active client projects under a senior mentor — not isolated training exercises.</p>
              <p className="text-muted leading-relaxed mb-6">Internship tracks are available in Software Development, UI/UX Design, Digital Marketing, and Technical Training. Applications are reviewed on a rolling basis.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {benefits.map(({ icon, label }) => (
                  <div key={label} className="card p-4 text-center">
                    <i className={`fas ${icon} text-primary text-xl mb-2 block`} />
                    <p className="text-xs font-semibold text-dark">{label}</p>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary">Apply Now</Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {tracks.map(({ icon, title, desc }, i) => (
                <motion.div key={title} className="card p-5" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <i className={`fas ${icon} text-primary`} />
                  </div>
                  <h3 className="font-heading font-bold text-dark mb-1">{title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Start Your Tech Career?</h2>
          <p className="text-gray-300 mb-8">Apply for our next internship cohort and get hands-on experience building real products.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Apply for Internship</Link>
            <Link to="/join/careers" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">View Full Roles</Link>
          </div>
        </div>
      </section>
    </>
  )
}
