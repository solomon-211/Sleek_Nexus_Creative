import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import emailjs from '@emailjs/browser'
import SEO from '../components/ui/SEO'
import { pageSeo } from '../lib/seo-data'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, scaleIn, rotateIn } from '../lib/animations'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import FaqAccordion from '../components/ui/FaqAccordion'
import GlitchText from '../components/ui/GlitchText'
import AnimatedCheckmark from '../components/ui/AnimatedCheckmark'

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
      <section className="relative py-28 sm:py-36 flex items-center overflow-hidden text-white bg-[#215E61]">
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }} className="max-w-2xl">
            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-accent" /> Free Consultation · 24hr Response
            </p>
            <h1 className="display-heading font-heading mb-6" style={{ letterSpacing: '0.01em' }}>
              Let's Build<br />
              <GlitchText className="text-primary">Something That Works</GlitchText>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl">
              Tell us about your project and we'll get back to you within 24 hours with a free discovery call and a custom proposal — no commitment required.
            </p>
            <a
              href="https://wa.me/211925277700?text=Hi%20Sleek%20Nexus%20Creative!%20I%27d%20like%20to%20talk%20about%20a%20project."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-full pl-2 pr-6 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5"
            >
              <span className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <i className="fab fa-whatsapp text-white" />
              </span>
              Prefer to talk now? WhatsApp us instantly
            </a>
          </motion.div>
        </div>
      </section>

      {/* Trust stats — floating bridge card overlapping the hero */}
      <section className="relative -mt-10 sm:-mt-14 z-10 pb-6">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white rounded-[1.75rem] shadow-[0_30px_70px_-25px_rgba(17,17,17,0.25)] border border-gray-100 p-6 sm:p-8 text-center"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {trustStats.map(({ icon, value, suffix, label }, i) => (
              <motion.div key={label} variants={scaleIn} className={`relative ${i !== trustStats.length - 1 ? 'sm:border-r sm:border-gray-100' : ''}`}>
                <i className={`fas ${icon} text-primary text-xl mb-2 block`} />
                <strong className="block text-2xl sm:text-3xl font-heading font-black text-dark">
                  <AnimatedCounter value={value} suffix={suffix} />
                </strong>
                <span className="text-muted text-xs">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works — zigzag stepped timeline */}
      <section className="py-20 sm:py-28 bg-white bg-dots relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">From idea to delivered product in four clear steps.</p>
          </div>
          <div className="hidden lg:block absolute left-0 right-0 top-[13.5rem] h-px bg-primary/20" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map(({ num, icon, title, desc }, i) => (
              <motion.div key={num}
                className={`relative p-7 rounded-[1.5rem] bg-white transition-all duration-300 hover:-translate-y-2 ${i % 2 === 1 ? 'lg:mt-12' : ''}`}
                style={{ boxShadow: '0 20px 50px -22px rgba(17,17,17,0.18)' }}
                variants={rotateIn} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}>
                <span className="text-6xl font-black text-primary/[0.06] font-heading leading-none absolute -top-2 right-4 select-none">{num}</span>
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-5 shadow-[0_10px_24px_rgba(254,127,45,0.35)]">
                  <i className={`fas ${icon} text-white`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2 text-base">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
                {i < steps.length - 1 && (
                  <i className="fas fa-arrow-right text-primary/30 text-lg hidden lg:block absolute top-1/2 -right-7 -translate-y-1/2" />
                )}
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
      <section className="relative py-20 sm:py-28 bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-grid-light opacity-40 pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2">Let's Talk Details</p>
            <h2 className="display-heading-sm text-white">Tell Us About <span className="text-primary">Your Project</span></h2>
          </div>
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">

            {/* Left — form */}
            <div className="lg:col-span-3 space-y-6">
            <motion.div className="neo-panel p-6 sm:p-10"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h3 className="text-xl font-heading font-bold text-dark mb-2">Project Brief</h3>
              <p className="text-muted text-sm mb-6">The more detail you provide, the more accurate our proposal will be.</p>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                  className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6 text-sm flex items-center gap-3"
                >
                  <AnimatedCheckmark className="w-8 h-8 text-green-600 flex-shrink-0" />
                  Received. We'll be in touch within 24 hours.
                </motion.div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm flex items-center gap-2">
                  <i className="fas fa-exclamation-circle" /> Something went wrong. Please try again or email us directly.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="gs-name" className="block text-sm font-medium text-dark mb-1.5">Full Name *</label>
                    <input id="gs-name" {...register('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'gs-name-error' : undefined} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${errors.name ? 'border-red-400' : 'border-gray-200'}`} placeholder="Your full name" />
                    {errors.name && <p id="gs-name-error" className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="gs-email" className="block text-sm font-medium text-dark mb-1.5">Email Address *</label>
                    <input id="gs-email" {...register('email')} type="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'gs-email-error' : undefined} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${errors.email ? 'border-red-400' : 'border-gray-200'}`} placeholder="your@email.com" />
                    {errors.email && <p id="gs-email-error" className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="gs-phone" className="block text-sm font-medium text-dark mb-1.5">Phone / WhatsApp</label>
                    <input id="gs-phone" {...register('phone')} type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" placeholder="+211 xxx xxx xxx" />
                  </div>
                  <div>
                    <label htmlFor="gs-company" className="block text-sm font-medium text-dark mb-1.5">Organization</label>
                    <input id="gs-company" {...register('company')} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" placeholder="Your organization" />
                  </div>
                </div>
                <div>
                  <label htmlFor="gs-service" className="block text-sm font-medium text-dark mb-1.5">Service Needed *</label>
                  <select id="gs-service" {...register('service')} aria-invalid={!!errors.service} aria-describedby={errors.service ? 'gs-service-error' : undefined} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${errors.service ? 'border-red-400' : 'border-gray-200'}`}>
                    <option value="">Select a service</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <p id="gs-service-error" className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="gs-budget" className="block text-sm font-medium text-dark mb-1.5">Budget Range</label>
                    <select id="gs-budget" {...register('budget')} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors">
                      <option value="">Select budget</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="gs-timeline" className="block text-sm font-medium text-dark mb-1.5">Timeline</label>
                    <select id="gs-timeline" {...register('timeline')} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors">
                      <option value="">Select timeline</option>
                      {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="gs-description" className="block text-sm font-medium text-dark mb-1.5">Project Description *</label>
                  <textarea id="gs-description" {...register('description')} rows={5} aria-invalid={!!errors.description} aria-describedby={errors.description ? 'gs-description-error' : undefined} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none ${errors.description ? 'border-red-400' : 'border-gray-200'}`} placeholder="Describe your project — what problem does it solve, who uses it, and what features do you need?" />
                  {errors.description && <p id="gs-description-error" className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
                  {isSubmitting ? <><i className="fas fa-spinner fa-spin" /> Sending...</> : 'Submit Project Brief'}
                </button>
              </form>
            </motion.div>

            {/* Partner/support callout — a different path for visitors who aren't
                here to hire us for a single project. Mirrors the engagement paths
                on the Innovation Hub page so the two stay consistent. */}
            <motion.div
              className="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-8"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-handshake text-accent text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-heading font-bold mb-1">Not Looking to Hire Us?</h3>
                  <p className="text-white/60 text-sm leading-relaxed">There's more than one way to work with SNC. Here's how organizations, funders, and individuals get involved beyond a single project.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-7">
                {[
                  { icon: 'fa-building', title: 'Organizations & NGOs', desc: 'Co-create digital impact through joint programs, sponsorships, or bringing your team into an ongoing initiative.' },
                  { icon: 'fa-hand-holding-dollar', title: 'Investors & Funders', desc: "Support the Innovation Hub's mission to build South Sudan's digital infrastructure and back local tech talent." },
                  { icon: 'fa-rocket', title: 'Startups & Innovators', desc: 'Looking for prototyping support or a place to build? Reach out early to join the first Innovation Lab cohort.' },
                  { icon: 'fa-graduation-cap', title: 'Students & Researchers', desc: 'Interested in mentorship, research collaboration, or early career opportunities in tech? We want to hear from you.' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <i className={`fas ${icon} text-accent text-sm`} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-0.5">{title}</p>
                      <p className="text-white/55 text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link to="/innovation-hub" className="btn-secondary border-white text-white hover:bg-white hover:text-primary whitespace-nowrap">
                  Explore the Innovation Hub
                </Link>
                <a href="mailto:info@sleeknexuscreative.com?subject=Partnership%20Inquiry" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold transition-colors">
                  Or email us directly <i className="fas fa-arrow-right text-xs" />
                </a>
              </div>
            </motion.div>
            </div>

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
