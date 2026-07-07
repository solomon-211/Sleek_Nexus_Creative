import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
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
  type: z.string().min(1, 'Please select a consultation type'),
  message: z.string().min(10, 'Please briefly describe your needs'),
})

const types = ['Project Planning & Scoping', 'Technology Strategy', 'Course & Training Inquiry', 'Partnership Discussion', 'General Business Inquiry']

const included = [
  { icon: 'fa-clock', title: '30-Minute Session', desc: 'Focused, no-fluff conversation about your specific needs and goals.' },
  { icon: 'fa-user-tie', title: 'Expert Matched', desc: 'We match you with the right person — developer, designer, or strategist.' },
  { icon: 'fa-file-alt', title: 'Written Summary', desc: 'After the call, we send a written summary with next steps and recommendations.' },
  { icon: 'fa-ban', title: 'Zero Obligation', desc: 'No pressure, no sales pitch. Just honest advice to help you make the right decision.' },
]

export default function BookConsultation() {
  const [status, setStatus] = useState(null)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try {
      await api.post('/contact', { ...data, message: `CONSULTATION REQUEST\n\nType: ${data.type}\n\n${data.message}` })
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Helmet><title>Book a Consultation - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Contact" title="Book a Free Consultation" desc="30 minutes with the right SNC expert — free, no strings attached. Just clarity and a clear path forward." />

      <section className="py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {included.map(({ icon, title, desc }, i) => (
              <motion.div key={title} className="card p-6" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-primary`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-12">
            <motion.div className="lg:col-span-3 card p-8" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-heading font-bold text-dark mb-2">Book Your Session</h2>
              <p className="text-muted text-sm mb-6">We'll confirm your booking and send joining details within 2 business hours.</p>

              {status === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6 text-sm flex items-center gap-2">
                  <i className="fas fa-check-circle" /> Booking received! We'll confirm your session within 2 hours.
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm flex items-center gap-2">
                  <i className="fas fa-exclamation-circle" /> Something went wrong. Please try again or WhatsApp us directly.
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
                <div>
                  <label className="block text-sm font-medium text-dark mb-1.5">Phone / WhatsApp</label>
                  <input {...register('phone')} type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="+211 xxx xxx xxx" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1.5">Consultation Type *</label>
                  <select {...register('type')} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${errors.type ? 'border-red-400' : 'border-gray-200'}`}>
                    <option value="">What do you want to discuss?</option>
                    {types.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1.5">Brief Description *</label>
                  <textarea {...register('message')} rows={4} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none ${errors.message ? 'border-red-400' : 'border-gray-200'}`} placeholder="Tell us briefly what you'd like to discuss — the more context, the better the session." />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
                  {isSubmitting ? <><i className="fas fa-spinner fa-spin" /> Booking...</> : <><i className="fas fa-calendar-check" /> Book My Free Consultation</>}
                </button>
              </form>
            </motion.div>

            <motion.div className="lg:col-span-2 space-y-6" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="card p-6">
                <h3 className="font-heading font-bold text-dark mb-3">Prefer Instant Contact?</h3>
                <p className="text-muted text-sm mb-4">For faster replies, reach us via WhatsApp or phone.</p>
                <a href="tel:+211925277700" className="flex items-center gap-2 text-primary font-semibold text-sm mb-3 hover:underline"><i className="fas fa-phone" /> +211 925 277 700</a>
                <a href="https://wa.me/211925277700" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary font-semibold text-sm mb-3 hover:underline"><i className="fab fa-whatsapp" /> WhatsApp Us</a>
                <a href="mailto:info@SNC.ss" className="flex items-center gap-2 text-primary font-semibold text-sm hover:underline"><i className="fas fa-envelope" /> info@SNC.ss</a>
              </div>
              <div className="card p-6">
                <h3 className="font-heading font-bold text-dark mb-2">Business Hours</h3>
                <div className="space-y-2 text-sm text-muted">
                  <p><span className="font-medium text-dark">Mon – Fri:</span> 9AM – 6PM</p>
                  <p><span className="font-medium text-dark">Saturday:</span> 10AM – 4PM</p>
                  <p><span className="font-medium text-dark">Sunday:</span> Closed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
