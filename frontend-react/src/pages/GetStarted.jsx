import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import emailjs from '@emailjs/browser'
import SEO from '../components/ui/SEO'
import { pageSeo } from '../lib/seo-data'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, scaleIn } from '../lib/animations'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import FaqAccordion from '../components/ui/FaqAccordion'

const schema = z.object({
  name:        z.string().min(2, 'Full name is required'),
  email:       z.string().email('Please enter a valid email'),
  phone:       z.string().optional(),
  company:     z.string().optional(),
  service:     z.string().min(1, 'Please select a service'),
  budget:      z.string().optional(),
  timeline:    z.string().optional(),
  description: z.string().min(20, 'Please describe your project (at least 20 characters)'),
})

const services  = ['Web Development', 'Mobile App', 'UI/UX Design', 'Branding', 'IT Consulting', 'E-Learning Platform', 'Enterprise Software', 'Not Sure Yet']
const budgets   = ['Under $500', '$500 – $1,500', '$1,500 – $5,000', '$5,000 – $15,000', '$15,000+', 'Not sure yet']
const timelines = ['As soon as possible', '1 month', '2–3 months', '3–6 months', 'Flexible']

const steps = [
  { num: '01', icon: 'fa-paper-plane',     title: 'Submit This Form',         desc: 'Tell us about your project. No technical knowledge required — just describe what you need.' },
  { num: '02', icon: 'fa-calendar-check',  title: 'We Book a Discovery Call', desc: 'Within 24 hours we reach out to schedule a free 30-minute call to understand your requirements.' },
  { num: '03', icon: 'fa-file-alt',        title: 'Receive a Proposal',       desc: 'We send a clear proposal with scope, timeline, and pricing — no hidden fees, no surprises.' },
  { num: '04', icon: 'fa-check-circle',    title: 'You Decide',               desc: 'Review the proposal, ask questions, and let us know if you want to move forward. No pressure.' },
]

const trustStats = [
  { icon: 'fa-project-diagram', value: 10, suffix: '+', label: 'Projects Delivered' },
  { icon: 'fa-user-graduate',   value: 50, suffix: '+', label: 'Learners Supported' },
  { icon: 'fa-handshake',       value: 5,  suffix: '+', label: 'Partner Organizations' },
  { icon: 'fa-clock',           value: 24, suffix: 'hr', label: 'Average Response Time' },
]

const readyChecklist = [
  'A rough idea of the problem you\'re solving (perfect detail not required)',
  'Any existing branding, logos, or reference sites you like',
  'A ballpark budget range, even a wide one',
  'Who will be using it — and roughly how many people',
]

export default function GetStarted() {
  const [status, setStatus] = useState(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        {
          from_name:   data.name,
          from_email:  data.email,
          phone:       data.phone    || 'N/A',
          company:     data.company  || 'N/A',
          service:     data.service,
          budget:      data.budget   || 'N/A',
          timeline:    data.timeline || 'N/A',
          message:     data.description,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <SEO {...pageSeo['/get-started']} />

      {/* Header */}
      <section className="relative py-24 flex items-center overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-[10%] w-64 h-64 bg-accent/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }} className="max-w-2xl">
            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-4">Free Consultation · 24hr Response</p>
            <h1 className="text-dark font-heading font-black uppercase leading-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              Let's Build Something<br /><span className="text-primary">That Works</span>
            </h1>
            <p className="text-muted text-lg leading-relaxed mb-6">
              Tell us about your project and we'll get back to you within 24 hours with a free discovery call and a custom proposal — no commitment required.
            </p>
            <a
              href="https://wa.me/211925277700?text=Hi%20Sleek%20Nexus%20Creative!%20I%27d%20like%20to%20talk%20about%20a%20project."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
            >
              <i className="fab fa-whatsapp text-base" /> Prefer to talk now? WhatsApp us instantly
            </a>
          </motion.div>
        </div>
      </section>

      {/* Trust stats */}
      <section className="py-10 bg-dark text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {trustStats.map(({ icon, value, suffix, label }) => (
              <motion.div key={label} variants={scaleIn}>
                <i className={`fas ${icon} text-accent text-xl mb-2 block`} />
                <strong className="block text-2xl sm:text-3xl font-heading font-black">
                  <AnimatedCounter value={value} suffix={suffix} />
                </strong>
                <span className="text-white/60 text-xs">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">From idea to delivered product in four clear steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ num, icon, title, desc }, i) => (
              <motion.div key={num} className="relative p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md hover:-translate-y-1 transition-all"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <span className="text-5xl font-black text-gray-100 font-heading leading-none absolute top-4 right-5">{num}</span>
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-primary`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2 text-sm">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Before You Reach Out</p>
            <h2 className="section-title">Common Questions</h2>
            <p className="section-subtitle">Answers to what people usually ask before starting a project with us.</p>
          </div>
          <FaqAccordion items={pageSeo['/get-started'].faq} />
        </div>
      </section>

      {/* Form */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">

            {/* Left — form */}
            <motion.div className="lg:col-span-3 card p-6 sm:p-8"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-heading font-bold text-dark mb-2">Tell Us About Your Project</h2>
              <p className="text-muted text-sm mb-6">The more detail you provide, the more accurate our proposal will be.</p>

              {status === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6 text-sm flex items-center gap-2">
                  <i className="fas fa-check-circle" /> Received. We'll be in touch within 24 hours.
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm flex items-center gap-2">
                  <i className="fas fa-exclamation-circle" /> Something went wrong. Please try again or email us directly.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Full Name *</label>
                    <input {...register('name')} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${errors.name ? 'border-red-400' : 'border-gray-200'}`} placeholder="Your full name" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Email Address *</label>
                    <input {...register('email')} type="email" className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${errors.email ? 'border-red-400' : 'border-gray-200'}`} placeholder="your@email.com" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Phone / WhatsApp</label>
                    <input {...register('phone')} type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" placeholder="+211 xxx xxx xxx" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Organization</label>
                    <input {...register('company')} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" placeholder="Your organization" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1.5">Service Needed *</label>
                  <select {...register('service')} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${errors.service ? 'border-red-400' : 'border-gray-200'}`}>
                    <option value="">Select a service</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Budget Range</label>
                    <select {...register('budget')} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors">
                      <option value="">Select budget</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Timeline</label>
                    <select {...register('timeline')} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors">
                      <option value="">Select timeline</option>
                      {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1.5">Project Description *</label>
                  <textarea {...register('description')} rows={5} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none ${errors.description ? 'border-red-400' : 'border-gray-200'}`} placeholder="Describe your project — what problem does it solve, who uses it, and what features do you need?" />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
                  {isSubmitting ? <><i className="fas fa-spinner fa-spin" /> Sending...</> : 'Submit Project Brief'}
                </button>
              </form>
            </motion.div>

            {/* Right — what to expect */}
            <motion.div className="lg:col-span-2 space-y-6"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
              <div className="bg-primary rounded-2xl p-8 text-white">
                <h3 className="text-xl font-heading font-bold mb-2">What to Expect</h3>
                <p className="text-white/70 text-sm mb-7">Here's what happens after you submit.</p>
                <div className="space-y-5">
                  {[
                    { icon: 'fa-clock',         title: 'Response within 24 hours', desc: 'We confirm receipt and book a free discovery call at a time that works for you.' },
                    { icon: 'fa-comments',       title: 'Free discovery call',      desc: 'A 30–45 minute call to understand your goals, users, and technical requirements.' },
                    { icon: 'fa-file-invoice',   title: 'Custom proposal',          desc: 'A clear document with scope, timeline, deliverables, and transparent pricing.' },
                    { icon: 'fa-check-circle',   title: 'You decide',               desc: 'No pressure. Review the proposal and let us know if you want to move forward.' },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className={`fas ${icon} text-white text-sm`} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-0.5">{title}</p>
                        <p className="text-white/65 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/20 space-y-2">
                  <a href="tel:+211925277700" className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors">
                    <i className="fas fa-phone text-accent" /> +211 925 277 700
                  </a>
                  <a href="mailto:info@sleeknexuscreative.com" className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors">
                    <i className="fas fa-envelope text-accent" /> info@sleeknexuscreative.com
                  </a>
                  <a href="https://wa.me/211925277700" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors">
                    <i className="fab fa-whatsapp text-accent" /> WhatsApp Us
                  </a>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-heading font-bold text-dark mb-3">What to Have Ready</h3>
                <p className="text-muted text-sm mb-4">You don't need everything figured out — but these help us give you a sharper proposal.</p>
                <ul className="space-y-2.5">
                  {readyChecklist.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-dark-soft">
                      <i className="fas fa-square-check text-primary text-xs mt-1 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6 bg-gray-50 border-none">
                <div className="flex gap-1 text-accent mb-3">
                  {Array(5).fill(0).map((_, j) => <i key={j} className="fas fa-star text-xs" />)}
                </div>
                <p className="text-dark-soft text-sm leading-relaxed italic mb-4">
                  "SNC built our online course platform from scratch. The team was communicative, delivered on time, and trained our staff to manage it independently. Exactly what we needed."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">AM</div>
                  <div>
                    <p className="font-semibold text-dark text-xs">Akol Mading</p>
                    <p className="text-muted text-xs">Director, Juba Learning Centre</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-heading font-bold text-dark mb-3">Not sure what you need?</h3>
                <p className="text-muted text-sm mb-4">Browse our service packages for guidance on scope and pricing.</p>
                <Link to="/services" className="btn-secondary w-full justify-center">View Service Packages</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
