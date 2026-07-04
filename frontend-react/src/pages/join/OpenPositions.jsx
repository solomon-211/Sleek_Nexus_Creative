import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import PageHeader from '../../components/ui/PageHeader'
import { fadeUp } from '../../lib/animations'

const positions = [
  { title: 'Senior Frontend Developer', dept: 'Engineering & Product', type: 'Full-Time', location: 'Juba / Remote', desc: 'Lead UI development for client projects using React.js. Build fast, accessible interfaces and collaborate with design and backend teams to ship polished products.' },
  { title: 'Full-Stack Engineer (Node.js / React)', dept: 'Engineering & Product', type: 'Full-Time', location: 'Juba / Remote', desc: 'Own features end-to-end from database schema to React UI. Work on varied client platforms including web apps, e-commerce systems, and educational tools.' },
  { title: 'UI/UX Designer', dept: 'Design', type: 'Full-Time', location: 'Juba / Remote', desc: 'Lead product design from wireframes to high-fidelity Figma mockups. Conduct user research and collaborate with developers to ensure accurate implementation.' },
  { title: 'Education Program Manager', dept: 'Training & Education', type: 'Full-Time', location: 'Juba', desc: 'Manage our training programs — overseeing curriculum, trainer coordination, student cohorts, and employer partnerships as we expand the SNC Academy.' },
  { title: 'Business Development Associate', dept: 'Sales & Growth', type: 'Full-Time', location: 'Juba', desc: 'Identify and pursue new client opportunities, manage the sales pipeline, and build partnerships with organizations across South Sudan and East Africa.' },
  { title: 'Mobile App Developer (React Native / Flutter)', dept: 'Engineering & Product', type: 'Contract', location: 'Juba / Remote', desc: 'Build cross-platform mobile apps for iOS and Android for our client projects. Experience with offline-first architecture is a strong plus.' },
]

const schema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  role:    z.string().min(1, 'Please select a role'),
  cvUrl:   z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  message: z.string().min(20, 'Min 20 characters — tell us why you\'re a great fit'),
})

const inp = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-sans text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
const lbl = 'block text-xs font-semibold text-dark-soft mb-1'
const errCls = 'text-red-500 text-xs mt-1'

export default function OpenPositions() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try {
      await fetch('http://localhost:5000/api/jobs/apply', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch { /* offline */ }
    setSubmitted(true); reset()
  }

  return (
    <>
      <Helmet><title>Open Positions - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Join Us" title="Open Positions" desc="We're growing and looking for talented, mission-driven people to join the team building South Sudan's digital future." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto space-y-5">
            {positions.map(({ title, dept, type, location, desc }, i) => (
              <motion.div key={title} className="card p-6" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-heading font-bold text-dark text-lg">{title}</h3>
                    <span className="text-primary text-xs font-semibold">{dept}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">{type}</span>
                    <span className="bg-gray-100 text-muted text-xs font-semibold px-3 py-1 rounded-full">{location}</span>
                  </div>
                </div>
                <p className="text-muted text-sm leading-relaxed mb-4">{desc}</p>
                <Link to="/contact" className="btn-primary text-sm px-4 py-2">View & Apply</Link>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-10 card p-8 text-center">
            <h3 className="font-heading font-bold text-dark text-xl mb-2">Don't See Your Role?</h3>
            <p className="text-muted text-sm mb-5">We keep strong applications on file. Send us your CV and tell us what you'd like to do — we'll reach out when the right opportunity opens.</p>
            <Link to="/contact" className="btn-primary">Send a General Application</Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Join the Team?</h2>
          <p className="text-gray-300 mb-8">Apply today and start building South Sudan's digital future with us.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Apply Now</Link>
            <Link to="/join/careers" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Why Work at SNC</Link>
          </div>
        </div>
      </section>
    </>
  )
}
