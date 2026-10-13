import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { fadeUp } from '../lib/animations'
import SEO from '../components/ui/SEO'
import PageHeader from '../components/ui/PageHeader'
import { pageSeo } from '../lib/seo-data'
import FaqAccordion from '../components/ui/FaqAccordion'
import AnimatedCheckmark from '../components/ui/AnimatedCheckmark'
import { sendLead } from '../lib/api'
import { whatsappUrl, socials, EMAIL, PHONE_DISPLAY, PHONE_E164 } from '../lib/site'

const schema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  website: z.string().optional(), // honeypot — real visitors leave this blank
})

// Mirrors the service pages under /services, plus the two catch-alls. Values
// are the readable labels so the notification email needs no lookup.
const SERVICE_OPTIONS = ['Web Development', 'Mobile Apps', 'UI/UX Design', 'Branding', 'IT Consulting', 'Educational Technology', 'Other']

export default function Contact() {
  const [status, setStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    setStatus(null)
    try {
      await sendLead({
        type: 'contact',
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service,
        message: data.message,
        website: data.website,
      })
      setStatus('success')
      reset()
    } catch (err) {
      setErrorMessage(err.message)
      setStatus('error')
    }
  }

  return (
    <>
      <SEO {...pageSeo['/contact']} />

      <PageHeader
        tone="dark"
        label="We'd love to hear from you"
        title="Let's Talk."
        desc="We're here to answer your questions, discuss your project requirements, and explore how our technology solutions can drive your business forward."
      />

      {/* Contact Form + Info */}
      <section className="py-16 sm:py-24">
        <div className="container-page">
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
                <div role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm flex items-start gap-2">
                  <i className="fas fa-exclamation-circle mt-0.5" />
                  <span>
                    {errorMessage || 'Something went wrong. Please try again.'}{' '}
                    <a href={whatsappUrl("Hi Sleek Nexus Creative! I tried the contact form but it didn't go through.")} target="_blank" rel="noopener noreferrer" className="font-semibold underline">Message us on WhatsApp instead</a>.
                  </span>
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
                    {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
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
                    { icon: 'fa-phone', title: 'Phone', lines: [PHONE_DISPLAY, 'Mon–Fri, 9AM–6PM'], href: `tel:${PHONE_E164}` },
                    { icon: 'fa-envelope', title: 'Email', lines: [EMAIL], href: `mailto:${EMAIL}` },
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

                {/* WhatsApp — a direct line for visitors who'd rather not fill in a form */}
                <a
                  href={whatsappUrl('Hi Sleek Nexus Creative! I have a question.')}
                  target="_blank" rel="noopener noreferrer"
                  className="group mt-6 flex items-center gap-3 bg-dark text-white rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(35,61,77,0.35)]"
                >
                  <span className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <i className="fab fa-whatsapp text-white text-lg" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold text-sm">Chat on WhatsApp</span>
                    <span className="block text-white/60 text-xs">Message us directly — no form needed</span>
                  </span>
                  <i className="fas fa-arrow-right text-accent text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

              <div>
                <p className="font-semibold text-dark mb-3">Connect With Us</p>
                <div className="flex gap-3">
                  {socials.filter(({ label }) => label !== 'WhatsApp').map(({ icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-primary/10 hover:text-primary text-muted flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5">
                      <i className={`fab ${icon} text-sm`} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 bg-primary/5 border border-primary/15 rounded-xl p-4">
                {[{ icon: 'fa-rocket', label: '24hr Reply' }, { icon: 'fa-comments', label: 'Free Consultation' }, { icon: 'fa-handshake', label: 'No Obligation' }].map(({ icon, label }) => (
                  <div key={label} className="flex flex-col items-center flex-1 text-center">
                    <i className={`fas ${icon} text-primary text-lg mb-1`} />
                    <p className="text-xs font-semibold text-dark leading-tight">{label}</p>
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
