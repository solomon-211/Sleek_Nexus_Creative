import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import api from '../../lib/api'
import PageHeader from '../../components/ui/PageHeader'
import { fadeUp } from '../../lib/animations'

const schema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(20, 'Please describe your project (at least 20 characters)'),
})

const services = ['Website Development', 'Mobile App Development', 'UI/UX Design', 'E-Learning Platform', 'Branding & Identity', 'Digital Consulting', 'Enterprise Software', 'Other']
const budgets = ['Under $500', '$500 – $1,500', '$1,500 – $5,000', '$5,000 – $15,000', '$15,000+', 'Not sure yet']
const timelines = ['ASAP (1–2 weeks)', '1 month', '2–3 months', '3–6 months', 'Flexible']

export default function Quote() {
  const [status, setStatus] = useState(null)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try {
      await api.post('/contact', { ...data, message: `QUOTE REQUEST\n\nService: ${data.service}\nBudget: ${data.budget}\nTimeline: ${data.timeline}\n\n${data.description}` })
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Helmet><title>Get a Quote - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Contact" title="Get a Quote" desc="Tell us about your project and we'll send you a detailed proposal within 24 hours — no commitment required." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-12">
            <motion.div className="lg:col-span-3 card p-8" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-heading font-bold text-dark mb-2">Project Details</h2>
              <p className="text-muted text-sm mb-6">The more detail you provide, the more accurate our quote will be.</p>

              {status === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6 text-sm flex items-center gap-2">
                  <i className="fas fa-check-circle" /> Quote request sent! We'll be in touch within 24 hours.
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
                    <input {...register('name')} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${errors.name ? 'border-red-400' : 'border-gray-200'}`} placeholder="Your full name" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Email Address *</label>
                    <input {...register('email')} type="email" className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${errors.email ? 'border-red-400' : 'border-gray-200'}`} placeholder="your@email.com" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Phone / WhatsApp</label>
                    <input {...register('phone')} type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="+211 xxx xxx xxx" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Organization</label>
                    <input {...register('company')} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Your organization" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1.5">Service Needed *</label>
                  <select {...register('service')} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${errors.service ? 'border-red-400' : 'border-gray-200'}`}>
                    <option value="">Select a service</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Budget Range</label>
                    <select {...register('budget')} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                      <option value="">Select budget</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Timeline</label>
                    <select {...register('timeline')} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                      <option value="">Select timeline</option>
                      {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1.5">Project Description *</label>
                  <textarea {...register('description')} rows={5} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none ${errors.description ? 'border-red-400' : 'border-gray-200'}`} placeholder="Describe your project — what problem does it solve, who uses it, and what features do you need?" />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
                  {isSubmitting ? <><i className="fas fa-spinner fa-spin" /> Sending...</> : <><i className="fas fa-paper-plane" /> Request My Quote</>}
                </button>
              </form>
            </motion.div>

            <motion.div className="lg:col-span-2 space-y-6" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="card p-6">
                <h3 className="font-heading font-bold text-dark mb-4">What Happens Next?</h3>
                {[
                  { n: '1', text: 'We review your request within 2 business hours.' },
                  { n: '2', text: 'We schedule a free 30-minute discovery call.' },
                  { n: '3', text: 'We send a detailed proposal with clear pricing.' },
                  { n: '4', text: 'You review, ask questions, and decide.' },
                ].map(({ n, text }) => (
                  <div key={n} className="flex gap-3 mb-3 last:mb-0">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                    <p className="text-muted text-sm">{text}</p>
                  </div>
                ))}
              </div>
              <div className="card p-6">
                <h3 className="font-heading font-bold text-dark mb-3">Prefer to Talk?</h3>
                <p className="text-muted text-sm mb-4">Call or WhatsApp us directly for a faster response.</p>
                <a href="tel:+211925277700" className="flex items-center gap-2 text-primary font-semibold text-sm mb-2 hover:underline"><i className="fas fa-phone" /> +211 925 277 700</a>
                <a href="https://wa.me/211925277700" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary font-semibold text-sm hover:underline"><i className="fab fa-whatsapp" /> WhatsApp Us</a>
              </div>
              <div className="card p-6">
                <h3 className="font-heading font-bold text-dark mb-3">Our Packages</h3>
                <p className="text-muted text-sm mb-4">Not sure what you need? Browse our service packages for guidance.</p>
                <Link to="/services" className="btn-secondary w-full justify-center">View Service Packages</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
