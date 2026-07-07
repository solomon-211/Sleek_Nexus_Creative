import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import PageHeader from '../../components/ui/PageHeader'
import { fadeUp } from '../../lib/animations'

const subjects = [
  'Web Development (HTML/CSS/JS/React)', 'Mobile App Development (Flutter/React Native)',
  'UI/UX Design (Figma)', 'Cybersecurity Fundamentals', 'Data Science & Python',
  'Digital Marketing & SEO', 'Cloud Computing (AWS/GCP)', 'Project Management',
  'Artificial Intelligence & ML', 'Graphic Design',
]

const benefits = [
  { icon: 'fa-money-bill-wave',  title: 'Paid Per Cohort',    desc: 'Competitive compensation per course delivered, with bonuses for high student satisfaction.' },
  { icon: 'fa-clock',            title: 'Flexible Schedule',  desc: 'Teach evenings and weekends to accommodate your professional schedule.' },
  { icon: 'fa-book',             title: 'Curriculum Support', desc: 'We provide course outlines, materials, and objectives — you bring the expertise.' },
  { icon: 'fa-star',             title: 'Build Your Brand',   desc: 'Featured on our website and promoted to 10,000+ learners and professionals.' },
  { icon: 'fa-certificate',      title: 'Trainer Certificate',desc: 'Receive an official SNC Trainer Certificate recognizing your contribution.' },
  { icon: 'fa-users',            title: 'Community Access',   desc: 'Full access to the SNC alumni and professional network.' },
]

const schema = z.object({
  firstName:   z.string().min(1),
  lastName:    z.string().min(1),
  email:       z.string().email(),
  phone:       z.string().optional(),
  subject:     z.string().min(1, 'Please select a subject'),
  experience:  z.string().min(1, 'Please select years of experience'),
  bio:         z.string().min(30, 'Min 30 characters'),
  sampleTopic: z.string().min(10, 'Min 10 characters'),
  linkedin:    z.string().url('Must be a valid URL').or(z.literal('')).optional(),
})

const inp = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-sans text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
const lbl = 'block text-xs font-semibold text-dark-soft mb-1'
const err = 'text-red-500 text-xs mt-1'

export default function Trainer() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try {
      await fetch('http://localhost:5000/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'trainer-application' }),
      })
    } catch { /* offline */ }
    setSubmitted(true); reset()
  }

  return (
    <>
      <Helmet>
        <title>Become a Trainer - Sleek Nexus Creative</title>
        <meta name="description" content="Join SNC as a trainer and help shape the next generation of South Sudanese tech professionals. Get paid, build your brand, and make impact." />
      </Helmet>

      <PageHeader label="Join Us" title="Become a Trainer"
        desc="Share your expertise, get paid for your knowledge, and help shape the next generation of South Sudanese tech professionals." />

      {/* Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Why Teach at SNC</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">Turn Your Expertise Into Real Impact</h2>
              <p className="text-muted leading-relaxed mb-4">SNC Academy is South Sudan's fastest-growing tech training program. We're looking for experienced professionals to join our trainer network and deliver practical, industry-relevant courses to motivated learners.</p>
              <p className="text-muted leading-relaxed mb-6">Teaching here means reaching students who genuinely want to build tech careers in South Sudan. Your knowledge directly creates jobs, businesses, and opportunities.</p>

              <h3 className="font-semibold text-dark mb-3">Requirements:</h3>
              <ul className="space-y-2 mb-6">
                {[
                  'Minimum 2 years of industry experience in your field',
                  'Strong communication and teaching ability in English',
                  'Passion for education and developing South Sudanese talent',
                  'Reliable internet access and own computer',
                  'Commitment to completing a full course cohort',
                ].map(r => (
                  <li key={r} className="flex items-start gap-2 text-sm text-muted">
                    <i className="fas fa-check-circle text-primary text-xs mt-0.5 flex-shrink-0" /> {r}
                  </li>
                ))}
              </ul>

              <h3 className="font-semibold text-dark mb-3">Subjects We Need Trainers In:</h3>
              <div className="flex flex-wrap gap-2">
                {subjects.map(s => (
                  <span key={s} className="bg-primary/8 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/15">{s}</span>
                ))}
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map(({ icon, title, desc }, i) => (
                <motion.div key={title} className="card p-5" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
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
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Apply to Teach</p>
              <h2 className="text-2xl font-heading font-bold text-dark">Trainer Application</h2>
              <p className="text-muted text-sm mt-2">We review all applications within 5 business days and reach out to discuss the next steps.</p>
            </div>

            {submitted ? (
              <div className="text-center py-14 bg-gray-50 rounded-2xl border border-gray-100">
                <i className="fas fa-check-circle text-green-500 text-5xl mb-4 block" />
                <h3 className="font-heading font-bold text-dark text-xl mb-2">Application Submitted!</h3>
                <p className="text-muted text-sm mb-6">We'll review your application and be in touch within 5 business days.</p>
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
                  <label className={lbl}>Subject You'd Like to Teach *</label>
                  <select {...register('subject')} className={inp}>
                    <option value="">Select a subject…</option>
                    {subjects.map(s => <option key={s}>{s}</option>)}
                    <option>Other (describe in bio)</option>
                  </select>
                  {errors.subject && <p className={err}>{errors.subject.message}</p>}
                </div>
                <div>
                  <label className={lbl}>Years of Professional Experience *</label>
                  <select {...register('experience')} className={inp}>
                    <option value="">Select…</option>
                    <option>2–3 years</option><option>4–6 years</option>
                    <option>7–10 years</option><option>10+ years</option>
                  </select>
                  {errors.experience && <p className={err}>{errors.experience.message}</p>}
                </div>
                <div>
                  <label className={lbl}>LinkedIn Profile URL</label>
                  <input {...register('linkedin')} type="url" className={inp} placeholder="https://linkedin.com/in/yourname" />
                  {errors.linkedin && <p className={err}>{errors.linkedin.message}</p>}
                </div>
                <div>
                  <label className={lbl}>Professional Bio *</label>
                  <textarea {...register('bio')} rows={3} className={inp} placeholder="Brief background — your role, industry experience, notable projects or achievements…" />
                  {errors.bio && <p className={err}>{errors.bio.message}</p>}
                </div>
                <div>
                  <label className={lbl}>What Would Your First Lesson Cover? *</label>
                  <textarea {...register('sampleTopic')} rows={3} className={inp} placeholder="Describe a lesson topic you'd deliver — what students would learn, how you'd teach it…" />
                  {errors.sampleTopic && <p className={err}>{errors.sampleTopic.message}</p>}
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
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-gray-300 mb-8">Join the SNC trainer network and start shaping South Sudan's tech talent pipeline.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/innovation-hub" className="btn-primary">Explore the Hub</Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Ask a Question</Link>
          </div>
        </div>
      </section>
    </>
  )
}
