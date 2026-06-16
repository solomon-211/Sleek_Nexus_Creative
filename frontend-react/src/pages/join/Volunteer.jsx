import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const roles = [
  { icon: 'fa-chalkboard-teacher', title: 'Teaching Assistant', desc: 'Support trainers during classes, answer student questions, and help learners who need extra attention.' },
  { icon: 'fa-hands-helping', title: 'Community Outreach', desc: 'Help us reach more South Sudanese through events, school visits, and community engagement programs.' },
  { icon: 'fa-pen-nib', title: 'Content Creator', desc: 'Write blog posts, create social media content, or produce educational material that helps our audience.' },
  { icon: 'fa-code', title: 'Open Source Contributor', desc: 'Contribute code to SNC open-source tools and community projects that benefit the South Sudanese tech ecosystem.' },
]

export default function Volunteer() {
  return (
    <>
      <Helmet><title>Volunteer - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Join Us" title="Volunteer With Us" desc="Give your time, skills, and energy to help build South Sudan's digital future — your contribution matters." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Volunteer Opportunities</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">Your Skills Can Change Lives</h2>
              <p className="text-muted leading-relaxed mb-4">At SNC, we believe in community. Whether you're a seasoned developer, an experienced teacher, or simply someone with time and passion — there's a meaningful role for you here.</p>
              <p className="text-muted leading-relaxed mb-6">Volunteers work flexible hours, gain experience, and become part of the SNC family. Many of our best team members started as volunteers.</p>
              <Link to="/contact" className="btn-primary">Express Your Interest</Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {roles.map(({ icon, title, desc }, i) => (
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
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Give Back?</h2>
          <p className="text-gray-300 mb-8">Tell us about yourself and how you'd like to contribute — we'll find the perfect fit.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Get in Touch</Link>
            <Link to="/join/community" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Join Our Community</Link>
          </div>
        </div>
      </section>
    </>
  )
}
