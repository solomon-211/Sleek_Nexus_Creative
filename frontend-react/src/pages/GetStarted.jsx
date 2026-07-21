import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import emailjs from '@emailjs/browser'
import SEO from '../components/ui/SEO'
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/animations'

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
      <SEO
        title="Get Started — Start a Project with Sleek Nexus Creative"
        description="Ready to build something? Tell us about your project and we'll get back to you within 24 hours with a free consultation and custom proposal."
        canonical="/get-started"
        keywords="start a project, hire software developers South Sudan, web development quote, mobile app development Africa"
        image="https://sleeknexuscreative.com/images/about-preview.jpg"
        imageAlt="Start a project with Sleek Nexus Creative"
        breadcrumbs={[{ name: 'Get Started', url: '/get-started' }]}
      />

      {/* Header */}
      <section
        className="relative py-24 flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d0f1a 0%, #1a0a10 50%, #0f1520 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }} className="max-w-2xl">
            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-4">Free Consultation · 24hr Response</p>
            <h1 className="text-white font-heading font-black uppercase leading-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              Let's Build Something<br /><span className="text-primary">That Works</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Tell us about your project and we'll get back to you within 24 hours with a free discovery call and a custom proposal — no commitment required.
            </p>
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
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-white">
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
