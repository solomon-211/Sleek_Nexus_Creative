import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { fadeUp } from '../lib/animations'
import SEO from '../components/ui/SEO'
import { pageSeo } from '../lib/seo-data'
import FaqAccordion from '../components/ui/FaqAccordion'
import AnimatedCheckmark from '../components/ui/AnimatedCheckmark'
import { submitMessage } from '../lib/api'

const schema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  website: z.string().optional(), // honeypot — real visitors leave this blank
})

export default function Contact() {
  const [status, setStatus] = useState(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    const [dbResult, emailResult] = await Promise.allSettled([
      submitMessage({
        type: 'contact',
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service,
        message: data.message,
        website: data.website,
      }),
      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone || 'N/A',
          company: data.company || 'N/A',
          service: data.service || 'N/A',
          message: data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      ),
    ])

    if (dbResult.status === 'fulfilled' || emailResult.status === 'fulfilled') {
      setStatus('success')
      reset()
    } else {
      setStatus('error')
    }
  }

  return (
    <>
      <SEO {...pageSeo['/contact']} />

      {/* Header */}
      <section className="relative overflow-hidden bg-noise text-white py-24 text-center bg-[#215E61]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }}>
            <p className="section-label text-accent">We'd love to hear from you</p>
            <h1 className="display-heading mb-6">Let's Talk.</h1>
            <p className="text-gray-300 text-lg leading-relaxed mt-6">We're here to answer your questions, discuss your project requirements, and explore how our technology solutions can drive your business forward.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

            {/* Form */}
            <motion.div className="lg:col-span-3 card p-5 sm:p-8" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-heading font-black uppercase text-dark mb-2">Send Us a Message</h2>
              <p className="text-muted text-sm mb-6">Fill out the form below and we'll get back to you within 24 hours.</p>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                  className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6 text-sm flex items-center gap-3"
                >
                  <AnimatedCheckmark className="w-8 h-8 text-green-600 flex-shrink-0" />
                  Message sent successfully! We'll be in touch soon.
                </motion.div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm flex items-center gap-2">
                  <i className="fas fa-exclamation-circle" /> Something went wrong. Please try again or email us directly.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Honeypot — hidden from real visitors, bots tend to fill every field */}
                <input
                  {...register('website')}
                  type="text"
                  tabIndex="-1"
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] w-px h-px overflow-hidden"
                />
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-dark mb-1.5">Full Name *</label>
                    <input id="contact-name" {...register('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'contact-name-error' : undefined} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${errors.name ? 'border-red-400' : 'border-gray-200'}`} placeholder="Your full name" />
                    {errors.name && <p id="contact-name-error" className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-dark mb-1.5">Email Address *</label>
                    <input id="contact-email" {...register('email')} type="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'contact-email-error' : undefined} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${errors.email ? 'border-red-400' : 'border-gray-200'}`} placeholder="your@email.com" />
                    {errors.email && <p id="contact-email-error" className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-dark mb-1.5">Phone Number</label>
                    <input id="contact-phone" {...register('phone')} type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" placeholder="+211 xxx xxx xxx" />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="block text-sm font-medium text-dark mb-1.5">Company / Organization</label>
                    <input id="contact-company" {...register('company')} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" placeholder="Your organization" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-service" className="block text-sm font-medium text-dark mb-1.5">Service Interested In</label>
                  <select id="contact-service" {...register('service')} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors">
                    <option value="">Select a service</option>
                    <option value="software-dev">Software Development</option>
                    <option value="web-mobile">Web & Mobile Apps</option>
                    <option value="edtech">Educational Technology</option>
                    <option value="consulting">IT Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-dark mb-1.5">Your Message *</label>
                  <textarea id="contact-message" {...register('message')} rows={5} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'contact-message-error' : undefined} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none ${errors.message ? 'border-red-400' : 'border-gray-200'}`} placeholder="Tell us about your project..." />
                  {errors.message && <p id="contact-message-error" className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
                  {isSubmitting ? <><i className="fas fa-spinner fa-spin" /> Sending...</> : <><i className="fas fa-paper-plane" /> Send Message</>}
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div className="lg:col-span-2 space-y-6" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-black uppercase text-dark mb-2">Contact Information</h2>
                <p className="text-muted text-sm mb-6">Reach out to us through any of these channels.</p>
                <div className="space-y-4">
                  {[
                    { icon: 'fa-map-marker-alt', title: 'Office Address', lines: ['Juba, South Sudan', 'Central Equatoria State'] },
                    { icon: 'fa-phone', title: 'Phone', lines: ['+211 925 277 700', 'Mon–Fri, 9AM–6PM'], href: 'tel:+211925277700' },
                    { icon: 'fa-envelope', title: 'Email', lines: ['info@sleeknexuscreative.com'], href: 'mailto:info@sleeknexuscreative.com' },
                    { icon: 'fa-clock', title: 'Business Hours', lines: ['Mon – Fri: 9AM – 6PM', 'Saturday: 10AM – 4PM', 'Sunday: Closed'] },
                  ].map(({ icon, title, lines, href }) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <i className={`fas ${icon} text-primary text-sm`} />
                      </div>
                      <div>
                        <p className="font-semibold text-dark text-sm">{title}</p>
                        {lines.map((l, i) => href && i === 0 ? <a key={l} href={href} className="text-muted text-sm hover:text-primary block">{l}</a> : <p key={l} className="text-muted text-sm">{l}</p>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold text-dark mb-3">Connect With Us</p>
                <div className="flex gap-3">
                  {[
                    ['fa-facebook', 'https://www.facebook.com/share/183ufB9mqx/?mibextid=wwXIfr', 'Facebook'],
                    ['fa-twitter', 'https://twitter.com/SNC', 'Twitter'],
                    ['fa-linkedin', 'https://www.linkedin.com/company/sleek-nexus-creative/', 'LinkedIn'],
                    ['fa-whatsapp', 'https://wa.me/211925277700', 'WhatsApp'],
                    ['fa-instagram', 'https://www.instagram.com/sleek_nexus_creative?igsh=bmdpanczdzcwNm04&utm_source=qr', 'Instagram'],
                  ].map(([icon, href, label]) => (
                    <a key={icon} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-primary hover:text-white text-muted flex items-center justify-center transition-all duration-200">
                      <i className={`fab ${icon} text-sm`} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[      { icon: 'fa-headset', label: 'Quick Response' }, { icon: 'fa-comments', label: 'Free Consultation' }, { icon: 'fa-rocket', label: '24hr Response' }].map(({ icon, label }) => (
                  <div key={label} className="card p-4 text-center">
                    <i className={`fas ${icon} text-primary text-xl mb-2 block`} />
                    <p className="text-xs font-semibold text-dark">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Find answers to common questions about our services and process.</p>
          </div>
          <FaqAccordion items={pageSeo['/contact'].faq} />
        </div>
      </section>
    </>
  )
}
