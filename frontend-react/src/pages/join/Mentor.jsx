import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import PageHeader from '../../components/ui/PageHeader'
import { fadeUp } from '../../lib/animations'

const areas = [
  'Software Engineering', 'Mobile Development', 'UI/UX & Product Design',
  'Data Science & AI', 'Cybersecurity', 'Tech Entrepreneurship',
  'Project Management', 'Digital Marketing', 'Cloud & DevOps',
]

const whyMentor = [
  { icon: 'fa-heart',         title: 'Give Back',              desc: 'Your career success puts you in a unique position to open doors for young professionals who are just getting started.' },
  { icon: 'fa-globe',         title: 'Diaspora Welcome',       desc: 'South Sudanese professionals living abroad are especially encouraged — your global perspective is invaluable to local learners.' },
  { icon: 'fa-network-wired', title: 'Expand Your Network',    desc: 'Mentoring connects you with SNC\'s growing ecosystem of talent, startups, and organizations across South Sudan.' },
  { icon: 'fa-clock',         title: 'Low Time Commitment',    desc: 'Just 1–2 hours per month. We handle matching, scheduling, and all program coordination.' },
  { icon: 'fa-certificate',   title: 'Mentor Certificate',     desc: 'Receive an official SNC Mentor Certificate recognizing your contribution to South Sudan\'s tech community.' },
  { icon: 'fa-star',          title: 'Recognition',            desc: 'Featured on the SNC website and celebrated across our community as an SNC Mentor.' },
]

const schema = z.object({
  firstName:    z.string().min(1),
  lastName:     z.string().min(1),
  email:        z.string().email(),
  phone:        z.string().optional(),
  area:         z.string().min(1, 'Please select an area'),
  experience:   z.string().min(1, 'Please select years of experience'),
  availability: z.string().min(1, 'Please select availability'),
  location:     z.string().min(1, 'Please enter your location'),
  bio:          z.string().min(30, 'Min 30 characters'),
  motivation:   z.string().min(20, 'Min 20 characters'),
  linkedin:     z.string().url('Must be a valid URL').or(z.literal('')).optional(),
})

const inp = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-sans text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
const lbl = 'block text-xs font-semibold text-dark-soft mb-1'
const errCls = 'text-red-500 text-xs mt-1'

export default function Mentor() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try {
      await fetch('http://localhost:5000/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'mentor-application' }),
      })
    } catch { /* offline */ }
    setSubmitted(true); reset()
  }

  return (
    <>
      <Helmet>
        <title>Become a Mentor - Sleek Nexus Creative</title>
        <meta name="description" content="Become an SNC mentor and help shape the next generation of South Sudanese tech professionals. Just 1–2 hours a month changes careers." />
      </Helmet>

      <PageHeader label="Join Us" title="Become a Mentor"
        desc="Guide the next generation of South Sudanese tech professionals with your experience. Just 1–2 hours a month changes careers." />

      {/* Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Mentorship Program</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">Your 1 Hour a Month Can Change a Career</h2>
              <p className="text-muted leading-relaxed mb-4">Many of our graduates credit a single mentor conversation with changing the direction of their career. Our mentors are professionals from South Sudan and the diaspora who give a few hours per month to help the next generation navigate their path in tech.</p>
              <p className="text-muted leading-relaxed mb-6">We match you with 1–2 mentees based on your area of expertise, their goals, and schedule compatibility. You meet monthly (virtual or in-person), and we handle everything else.</p>

              <h3 className="font-semibold text-dark mb-3">What Mentors Do:</h3>
              <ul className="space-y-2 mb-6">
                {[
                  'Meet with 1–2 mentees for 30–60 minutes monthly',
                  'Provide career guidance, code reviews, and portfolio feedback',
                  'Share industry experience and help navigate job opportunities',
                  'Offer encouragement and accountability for learning goals',
                ].map(r => (
                  <li key={r} className="flex items-start gap-2 text-sm text-muted">
                    <i className="fas fa-check-circle text-primary text-xs mt-0.5 flex-shrink-0" /> {r}
                  </li>
                ))}
              </ul>

              <h3 className="font-semibold text-dark mb-3">We Need Mentors In:</h3>
              <div className="flex flex-wrap gap-2">
                {areas.map(a => (
                  <span key={a} className="bg-primary/8 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/15">{a}</span>
                ))}
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {whyMentor.map(({ icon, title, desc }, i) => (
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

          {/* Application Form */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Apply Now</p>
              <h2 className="text-2xl font-heading font-bold text-dark">Mentor Application</h2>
              <p className="text-muted text-sm mt-2">Applications reviewed within 5 days. Mentorship is voluntary — no payment, but deep impact.</p>
            </div>

            {submitted ? (
              <div className="text-center py-14 bg-gray-50 rounded-2xl border border-gray-100">
                <i className="fas fa-check-circle text-green-500 text-5xl mb-4 block" />
                <h3 className="font-heading font-bold text-dark text-xl mb-2">Application Received!</h3>
                <p className="text-muted text-sm mb-6">Thank you! We'll match you with mentees and be in touch within 5 business days.</p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm">Submit Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={lbl}>First Name *</label><input {...register('firstName')} className={inp} placeholder="Jane" />{errors.firstName && <p className={errCls}>{errors.firstName.message}</p>}</div>
                  <div><label className={lbl}>Last Name *</label><input {...register('lastName')} className={inp} placeholder="Akello" />{errors.lastName && <p className={errCls}>{errors.lastName.message}</p>}</div>
                  <div><label className={lbl}>Email Address *</label><input {...register('email')} type="email" className={inp} placeholder="you@example.com" />{errors.email && <p className={errCls}>{errors.email.message}</p>}</div>
                  <div><label className={lbl}>Phone / WhatsApp</label><input {...register('phone')} type="tel" className={inp} placeholder="+211 9XX XXX XXX" /></div>
                </div>
                <div>
                  <label className={lbl}>Location (City / Country) *</label>
                  <input {...register('location')} className={inp} placeholder="e.g. Juba, South Sudan or Nairobi, Kenya" />
                  {errors.location && <p className={errCls}>{errors.location.message}</p>}
                </div>
                <div>
                  <label className={lbl}>Area of Expertise *</label>
                  <select {...register('area')} className={inp}>
                    <option value="">Select your main expertise…</option>
                    {areas.map(a => <option key={a}>{a}</option>)}
                    <option>Other</option>
                  </select>
                  {errors.area && <p className={errCls}>{errors.area.message}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={lbl}>Years of Experience *</label>
                    <select {...register('experience')} className={inp}>
                      <option value="">Select…</option>
                      <option>2–4 years</option><option>5–8 years</option>
                      <option>9–14 years</option><option>15+ years</option>
                    </select>
                    {errors.experience && <p className={errCls}>{errors.experience.message}</p>}
                  </div>
                  <div>
                    <label className={lbl}>Availability for Sessions *</label>
                    <select {...register('availability')} className={inp}>
                      <option value="">Select…</option>
                      <option>Evenings (after 5pm EAT)</option>
                      <option>Weekends</option>
                      <option>Flexible</option>
                      <option>Remote only</option>
                    </select>
                    {errors.availability && <p className={errCls}>{errors.availability.message}</p>}
                  </div>
                </div>
                <div>
                  <label className={lbl}>LinkedIn Profile URL</label>
                  <input {...register('linkedin')} type="url" className={inp} placeholder="https://linkedin.com/in/yourname" />
                  {errors.linkedin && <p className={errCls}>{errors.linkedin.message}</p>}
                </div>
                <div>
                  <label className={lbl}>Professional Bio *</label>
                  <textarea {...register('bio')} rows={3} className={inp} placeholder="Your background, current role, and key experience relevant to mentoring…" />
                  {errors.bio && <p className={errCls}>{errors.bio.message}</p>}
                </div>
                <div>
                  <label className={lbl}>Why Do You Want to Mentor? *</label>
                  <textarea {...register('motivation')} rows={3} className={inp} placeholder="What motivates you to give back, and what you hope your mentees will gain from you…" />
                  {errors.motivation && <p className={errCls}>{errors.motivation.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3">
                  {isSubmitting ? <><i className="fas fa-spinner fa-spin" /> Submitting…</> : <><i className="fas fa-paper-plane" /> Submit Mentor Application</>}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  <i className="fas fa-shield-alt mr-1" /> Your information is kept private and never sold.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Shape the Next Generation?</h2>
          <p className="text-gray-300 mb-8">Join SNC's mentor network and start making a difference — one conversation at a time.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/alumni" className="btn-primary">Browse Alumni Network</Link>
            <Link to="/community" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Join the Community</Link>
          </div>
        </div>
      </section>
    </>
  )
}
