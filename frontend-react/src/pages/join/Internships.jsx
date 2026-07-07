import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import emailjs from '@emailjs/browser'
import SEO from '../../components/ui/SEO'
import PageHeader from '../../components/ui/PageHeader'
import { fadeUp } from '../../lib/animations'

const tracks = [
  { icon: 'fa-code',               title: 'Software Development', desc: 'Build real features on live client projects alongside senior engineers. Learn production-grade React, Node.js, and databases.' },
  { icon: 'fa-pencil-ruler',       title: 'UI/UX Design',         desc: 'Design real product interfaces in Figma, conduct user research, and have your work shipped to actual users.' },
  { icon: 'fa-bullhorn',           title: 'Digital Marketing',    desc: 'Run campaigns, write content, manage newsletters, and analyse real performance data for SNC and clients.' },
  { icon: 'fa-chalkboard-teacher', title: 'Technical Training',   desc: 'Assist senior trainers, develop curriculum materials, and support learners enrolled in SNC Academy programs.' },
]

const perks = [
  { icon: 'fa-calendar-alt', label: '3-Month Duration' },
  { icon: 'fa-briefcase',    label: 'Live Client Projects' },
  { icon: 'fa-certificate',  label: 'Certificate Included' },
  { icon: 'fa-dollar-sign',  label: 'Monthly Stipend' },
  { icon: 'fa-user-tie',     label: 'Dedicated Mentor' },
  { icon: 'fa-door-open',    label: 'Job Pathway Support' },
]

const schema = z.object({
  firstName:  z.string().min(1),
  lastName:   z.string().min(1),
  email:      z.string().email(),
  phone:      z.string().optional(),
  track:      z.string().min(1, 'Please select a track'),
  education:  z.string().min(1, 'Please describe your education'),
  skills:     z.string().min(10, 'Please list your current skills'),
  why:        z.string().min(30, 'Min 30 characters'),
  cvUrl:      z.string().url('Must be a valid URL').or(z.literal('')).optional(),
})

const inp = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-sans text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
const lbl = 'block text-xs font-semibold text-dark-soft mb-1'
const errCls = 'text-red-500 text-xs mt-1'

export default function Internships() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        { ...data, type: 'internship-application' },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
    } catch { /* offline */ }
    setSubmitted(true); reset()
  }

  return (
    <>
      <SEO
        title="Internship Program"
        description="Gain real-world tech experience on live client projects at SNC. 3-month internship with mentorship, stipend, and certificate."
        canonical="/internships"
        breadcrumbs={[{ name: 'Internships', url: '/internships' }]}
      />

      <PageHeader label="Join Us" title="Internship Program"
        desc="Real work on live projects. Real mentorship from senior professionals. A real start to your tech career." />

      {/* Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">About the Program</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">Real Work. Real Mentorship. Real Results.</h2>
              <p className="text-muted leading-relaxed mb-4">Our 3-month internship program is designed for students and recent graduates who want genuine, portfolio-worthy experience — not coffee runs. Every SNC intern is assigned to active client projects under a senior mentor.</p>
              <p className="text-muted leading-relaxed mb-6">You'll attend team stand-ups, complete code reviews, ship features to real users, and leave with at least 2 portfolio projects you can show employers. Applications are reviewed on a rolling basis — apply early.</p>

              {/* Perks grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {perks.map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 bg-primary/5 rounded-xl px-3 py-2.5">
                    <i className={`fas ${icon} text-primary text-sm flex-shrink-0`} />
                    <span className="text-xs font-semibold text-dark">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tracks */}
            <div className="grid sm:grid-cols-2 gap-4">
              {tracks.map(({ icon, title, desc }, i) => (
                <motion.div key={title} className="card p-5"
                  variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
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
              <h2 className="text-2xl font-heading font-bold text-dark">Internship Application</h2>
              <p className="text-muted text-sm mt-2">Next cohort starts January 2025. Applications reviewed on a rolling basis.</p>
            </div>

            {submitted ? (
              <div className="text-center py-14 bg-gray-50 rounded-2xl border border-gray-100">
                <i className="fas fa-check-circle text-green-500 text-5xl mb-4 block" />
                <h3 className="font-heading font-bold text-dark text-xl mb-2">Application Submitted!</h3>
                <p className="text-muted text-sm mb-6">We review all applications and will contact you within 1 week about next steps.</p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm">Submit Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={lbl}>First Name *</label><input {...register('firstName')} className={inp} placeholder="John" />{errors.firstName && <p className={errCls}>{errors.firstName.message}</p>}</div>
                  <div><label className={lbl}>Last Name *</label><input {...register('lastName')} className={inp} placeholder="Deng" />{errors.lastName && <p className={errCls}>{errors.lastName.message}</p>}</div>
                  <div><label className={lbl}>Email Address *</label><input {...register('email')} type="email" className={inp} placeholder="you@example.com" />{errors.email && <p className={errCls}>{errors.email.message}</p>}</div>
                  <div><label className={lbl}>Phone / WhatsApp</label><input {...register('phone')} type="tel" className={inp} placeholder="+211 9XX XXX XXX" /></div>
                </div>
                <div>
                  <label className={lbl}>Internship Track *</label>
                  <select {...register('track')} className={inp}>
                    <option value="">Select a track…</option>
                    {tracks.map(t => <option key={t.title}>{t.title}</option>)}
                  </select>
                  {errors.track && <p className={errCls}>{errors.track.message}</p>}
                </div>
                <div>
                  <label className={lbl}>Current Education / Qualification *</label>
                  <input {...register('education')} className={inp} placeholder="e.g. 3rd Year Computer Science, Juba University" />
                  {errors.education && <p className={errCls}>{errors.education.message}</p>}
                </div>
                <div>
                  <label className={lbl}>Your Current Skills *</label>
                  <input {...register('skills')} className={inp} placeholder="e.g. HTML, CSS, basic JavaScript, Figma basics…" />
                  {errors.skills && <p className={errCls}>{errors.skills.message}</p>}
                </div>
                <div>
                  <label className={lbl}>CV / Portfolio Link (Google Drive, LinkedIn, etc.)</label>
                  <input {...register('cvUrl')} type="url" className={inp} placeholder="https://drive.google.com/…" />
                  {errors.cvUrl && <p className={errCls}>{errors.cvUrl.message}</p>}
                </div>
                <div>
                  <label className={lbl}>Why Do You Want This Internship? *</label>
                  <textarea {...register('why')} rows={4} className={inp} placeholder="Tell us what you want to learn, what you hope to build, and why SNC is the right place for you…" />
                  {errors.why && <p className={errCls}>{errors.why.message}</p>}
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
          <h2 className="text-3xl font-heading font-bold mb-4">Your Tech Career Starts Here</h2>
          <p className="text-gray-300 mb-8">Take the first step. Apply for our next cohort and build real projects from day one.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/careers" className="btn-primary">View Full Careers</Link>
            <Link to="/community" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Join the Community</Link>
          </div>
        </div>
      </section>
    </>
  )
}
