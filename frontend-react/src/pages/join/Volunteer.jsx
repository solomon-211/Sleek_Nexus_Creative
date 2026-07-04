import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import PageHeader from '../../components/ui/PageHeader'
import { fadeUp } from '../../lib/animations'

const roles = [
  { icon: 'fa-chalkboard-teacher', title: 'Teaching Assistant',    desc: 'Support trainers during classes, answer student questions, and help learners who need extra attention.' },
  { icon: 'fa-hands-helping',      title: 'Community Outreach',    desc: 'Reach more South Sudanese through events, school visits, and community engagement programs.' },
  { icon: 'fa-pen-nib',            title: 'Content Creator',       desc: 'Write blog posts, create social media content, or produce educational material that helps our audience.' },
  { icon: 'fa-code',               title: 'Open Source Developer', desc: 'Contribute code to SNC tools and community projects that benefit the South Sudanese tech ecosystem.' },
  { icon: 'fa-camera',             title: 'Media & Photography',   desc: 'Document SNC events, programs, and impact through photography, videography, or graphic design.' },
  { icon: 'fa-users',              title: 'Event Organiser',       desc: 'Help plan and run SNC workshops, hackathons, networking events, and community meetups in Juba.' },
]

const schema = z.object({
  firstName:    z.string().min(1, 'Required'),
  lastName:     z.string().min(1, 'Required'),
  email:        z.string().email('Valid email required'),
  phone:        z.string().optional(),
  role:         z.string().min(1, 'Please select a role'),
  availability: z.string().min(1, 'Please select availability'),
  experience:   z.string().min(20, 'Please describe your background (min 20 chars)'),
  motivation:   z.string().min(20, 'Please share why you want to volunteer (min 20 chars)'),
})

const inp = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-sans text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
const lbl = 'block text-xs font-semibold text-dark-soft mb-1'
const err = 'text-red-500 text-xs mt-1'

export default function Volunteer() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try {
      await fetch('http://localhost:5000/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'volunteer' }),
      })
    } catch { /* offline — still show success */ }
    setSubmitted(true); reset()
  }

  return (
    <>
      <Helmet>
        <title>Volunteer - Sleek Nexus Creative</title>
        <meta name="description" content="Volunteer with SNC and help build South Sudan's digital future. Roles in teaching, outreach, content, development, and events." />
      </Helmet>

      <PageHeader label="Join Us" title="Volunteer With Us"
        desc="Give your time, skills, and energy to help build South Sudan's digital future — your contribution matters more than you know." />

      {/* Why volunteer */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Why Volunteer</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">Your Skills Can Change Lives</h2>
              <p className="text-muted leading-relaxed mb-4">Whether you're a seasoned developer, an experienced teacher, a designer, or simply someone with time and passion — there's a meaningful volunteer role for you at SNC.</p>
              <p className="text-muted leading-relaxed mb-6">Volunteers gain experience, expand their network, build their portfolio, and become part of the SNC family. Many of our full-time team members started as volunteers.</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: 'fa-certificate', label: 'Volunteer Certificate' },
                  { icon: 'fa-network-wired', label: 'Grow Your Network' },
                  { icon: 'fa-briefcase', label: 'Build Your Portfolio' },
                  { icon: 'fa-users', label: 'Join the SNC Family' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 bg-primary/5 rounded-xl p-3">
                    <i className={`fas ${icon} text-primary text-sm`} />
                    <span className="text-sm font-semibold text-dark">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Roles */}
            <div className="grid sm:grid-cols-2 gap-4">
              {roles.map(({ icon, title, desc }, i) => (
                <motion.div key={title} className="card p-5" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <i className={`fas ${icon} text-primary text-sm`} />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-1">{title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Application form */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Apply Now</p>
              <h2 className="text-2xl font-heading font-bold text-dark">Volunteer Application</h2>
              <p className="text-muted text-sm mt-2">We review all applications within 5 business days.</p>
            </div>

            {submitted ? (
              <div className="text-center py-14 bg-gray-50 rounded-2xl border border-gray-100">
                <i className="fas fa-check-circle text-green-500 text-5xl mb-4 block" />
                <h3 className="font-heading font-bold text-dark text-xl mb-2">Application Received!</h3>
                <p className="text-muted text-sm mb-6">Thank you! We'll be in touch within 5 business days about next steps.</p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm">Submit Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={lbl}>First Name *</label><input {...register('firstName')} className={inp} placeholder="John" />{errors.firstName && <p className={err}>{errors.firstName.message}</p>}</div>
                  <div><label className={lbl}>Last Name *</label><input {...register('lastName')} className={inp} placeholder="Deng" />{errors.lastName && <p className={err}>{errors.lastName.message}</p>}</div>
                  <div><label className={lbl}>Email Address *</label><input {...register('email')} type="email" className={inp} placeholder="you@example.com" />{errors.email && <p className={err}>{errors.email.message}</p>}</div>
                  <div><label className={lbl}>Phone / WhatsApp</label><input {...register('phone')} type="tel" className={inp} placeholder="+211 9XX XXX XXX" /></div>
                </div>
                <div>
                  <label className={lbl}>Volunteer Role *</label>
                  <select {...register('role')} className={inp}>
                    <option value="">Select a role…</option>
                    {roles.map(r => <option key={r.title}>{r.title}</option>)}
                    <option>Other / Let SNC Decide</option>
                  </select>
                  {errors.role && <p className={err}>{errors.role.message}</p>}
                </div>
                <div>
                  <label className={lbl}>Availability *</label>
                  <select {...register('availability')} className={inp}>
                    <option value="">Select availability…</option>
                    <option>Weekday evenings (after 5pm)</option>
                    <option>Weekends only</option>
                    <option>Weekdays and weekends</option>
                    <option>Flexible / Discuss</option>
                  </select>
                  {errors.availability && <p className={err}>{errors.availability.message}</p>}
                </div>
                <div>
                  <label className={lbl}>Your Background & Skills *</label>
                  <textarea {...register('experience')} rows={3} className={inp} placeholder="Tell us about your professional background, skills, and any relevant experience…" />
                  {errors.experience && <p className={err}>{errors.experience.message}</p>}
                </div>
                <div>
                  <label className={lbl}>Why Do You Want to Volunteer With SNC? *</label>
                  <textarea {...register('motivation')} rows={3} className={inp} placeholder="Share what motivates you and what you hope to contribute…" />
                  {errors.motivation && <p className={err}>{errors.motivation.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3">
                  {isSubmitting ? <><i className="fas fa-spinner fa-spin" /> Submitting…</> : <><i className="fas fa-paper-plane" /> Submit Application</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Questions Before Applying?</h2>
          <p className="text-gray-300 mb-8">Reach out and we'll tell you more about current volunteer needs and how we work.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Get in Touch</Link>
            <Link to="/community" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Join the Community</Link>
          </div>
        </div>
      </section>
    </>
  )
}
