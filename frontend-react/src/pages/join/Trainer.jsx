import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const requirements = [
  'Minimum 2 years of industry experience in your area of expertise',
  'Strong communication and presentation skills in English',
  'Ability to explain complex concepts to beginners clearly',
  'Passion for education and developing South Sudanese talent',
  'Reliable internet access and own laptop/computer',
]

const subjects = ['Web Development (HTML/CSS/JS/React)', 'Mobile App Development', 'UI/UX Design', 'Cybersecurity', 'Data Science & Python', 'Digital Marketing', 'Cloud Computing (AWS)', 'Project Management']

export default function Trainer() {
  return (
    <>
      <Helmet><title>Become a Trainer - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Join Us" title="Become a Trainer" desc="Share your expertise and help shape the next generation of South Sudanese tech professionals." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Why Teach at SNC</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">Turn Your Expertise Into Impact</h2>
              <p className="text-muted leading-relaxed mb-4">SNC Academy is growing fast and we're always looking for experienced professionals to join our trainer network. Teaching here means reaching motivated students who genuinely want to build tech careers in South Sudan.</p>
              <p className="text-muted leading-relaxed mb-6">Trainers get paid per cohort, receive full curriculum support, and can teach online, in-person, or in a hybrid format that fits their schedule.</p>
              <h3 className="font-semibold text-dark mb-3">We're Looking for Trainers In:</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {subjects.map(s => <span key={s} className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">{s}</span>)}
              </div>
              <h3 className="font-semibold text-dark mb-3">Requirements:</h3>
              <ul className="space-y-2 mb-6">
                {requirements.map(r => (
                  <li key={r} className="flex items-start gap-2 text-sm text-muted">
                    <i className="fas fa-check text-primary text-xs mt-1 flex-shrink-0" /> {r}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary">Apply to Become a Trainer</Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { icon: 'fa-money-bill-wave', title: 'Paid Per Cohort', desc: 'Competitive compensation per course delivered, with bonuses for high student satisfaction scores.' },
                { icon: 'fa-clock', title: 'Flexible Schedule', desc: 'Teach at times that work for you. Most courses run evenings and weekends to accommodate working professionals.' },
                { icon: 'fa-book', title: 'Curriculum Support', desc: 'We provide course outlines, materials, and learning objectives — you bring the expertise and teaching style.' },
                { icon: 'fa-star', title: 'Build Your Brand', desc: 'Trainers are featured on our website and marketed to our audience of 10,000+ learners and professionals.' },
              ].map(({ icon, title, desc }, i) => (
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
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-gray-300 mb-8">Apply to join the SNC trainer network and start shaping South Sudan's tech talent.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Apply Now</Link>
            <Link to="/courses" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">See Our Courses</Link>
          </div>
        </div>
      </section>
    </>
  )
}
