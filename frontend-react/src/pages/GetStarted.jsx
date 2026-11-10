import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import SEO from '../components/ui/SEO'
import { pageSeo } from '../lib/seo-data'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, staggerItem } from '../lib/animations'
import FaqAccordion from '../components/ui/FaqAccordion'
import AnimatedCheckmark from '../components/ui/AnimatedCheckmark'
import { sendLead } from '../lib/api'
import { loadDraft, saveDraft, clearDraft } from '../lib/form-draft'
import { whatsappUrl, PHONE_DISPLAY, PHONE_E164, EMAIL } from '../lib/site'
import { packages } from '../lib/packages-data'
import Img from '../components/ui/Img'
import CtaBand from '../components/ui/CtaBand'

const DRAFT_KEY = 'project_brief'

// Hero background photo (a file in public/images). After adding a new one,
// run `npm run images` so phones get a smaller WebP version.
const GS_HERO_IMAGE = '/images/web-mobile-apps.jpg'
const EMPTY_BRIEF = { name: '', email: '', phone: '', company: '', service: '', budget: '', timeline: '', description: '', website: '' }

const schema = z.object({
  name:        z.string().min(2, 'Full name is required'),
  email:       z.string().email('Please enter a valid email'),
  phone:       z.string().optional(),
  company:     z.string().optional(),
  service:     z.string().min(1, 'Please select a service'),
  budget:      z.string().optional(),
  timeline:    z.string().optional(),
  description: z.string().min(20, 'Please describe your project (at least 20 characters)'),
  website:     z.string().optional(), // honeypot — real visitors leave this blank
})

const services = ['Website', 'Web Application', 'Mobile App', 'E-Learning Platform', 'Business System', 'UI/UX Design', 'Branding', 'IT Consulting', 'Not Sure Yet']

const channels = [
  { icon: 'fas fa-phone',        title: 'Call Us',  value: PHONE_DISPLAY,        note: 'Mon–Fri, 9AM–6PM (EAT)',             href: `tel:${PHONE_E164}` },
  { icon: 'fab fa-whatsapp',     title: 'WhatsApp', value: 'Chat with our team', note: 'Talk it through before you write',   href: whatsappUrl("Hi Sleek Nexus Creative! I'd like to talk about a project."), external: true },
  { icon: 'fas fa-envelope',     title: 'Email',    value: 'Write to us',        note: EMAIL,                                href: `mailto:${EMAIL}` },
  { icon: 'fas fa-video',        title: 'Meet Online', value: 'Book a video call', note: 'Based in Juba, working with clients everywhere', href: whatsappUrl("Hi Sleek Nexus Creative! I'd like to book a video call about a project."), external: true },
]

const hours = [
  ['Monday – Friday', '9:00 AM – 6:00 PM'],
  ['Saturday', '10:00 AM – 4:00 PM'],
  ['Sunday', 'Closed'],
]

// Returns { open, row } — row is the index into `hours` for today.
function officeStatus(now = new Date()) {
  const juba = new Date(now.getTime() + 3 * 60 * 60 * 1000)
  const day = juba.getUTCDay() // 0 = Sunday
  const hour = juba.getUTCHours() + juba.getUTCMinutes() / 60
  if (day === 0) return { open: false, row: 2 }
  if (day === 6) return { open: hour >= 10 && hour < 16, row: 1 }
  return { open: hour >= 9 && hour < 18, row: 0 }
}

const inputClass = (hasError) =>
  `w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${hasError ? 'border-red-400' : 'border-gray-200'}`
const budgets   = ['Under $500', '$500 – $1,500', '$1,500 – $5,000', '$5,000 – $15,000', '$15,000+', 'Not sure yet']
const timelines = ['As soon as possible', '1 month', '2–3 months', '3–6 months', 'Flexible']

export default function GetStarted() {
  const [status, setStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  // Picks up where the visitor left off, if they started this form before.
  const [restored, setRestored] = useState(() => Boolean(loadDraft(DRAFT_KEY)))
  const { register, handleSubmit, reset, subscribe, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { ...EMPTY_BRIEF, ...loadDraft(DRAFT_KEY) },
  })

  // Save as they type, so a dropped connection doesn't lose the brief.
  useEffect(() => subscribe({
    formState: { values: true },
    callback: ({ values }) => saveDraft(DRAFT_KEY, values),
  }), [subscribe])

  // Current chip selections, so the chosen chip shows as selected.
  const [office] = useState(() => officeStatus())

  const onSubmit = async (data) => {
    setStatus(null)
    try {
      await sendLead({
        type:     'get_started',
        name:     data.name,
        email:    data.email,
        phone:    data.phone,
        company:  data.company,
        service:  data.service,
        budget:   data.budget,
        timeline: data.timeline,
        message:  data.description,
        website:  data.website,
      })
      setStatus('success')
      clearDraft(DRAFT_KEY)
      reset(EMPTY_BRIEF)
    } catch (err) {
      setErrorMessage(err.message)
      setStatus('error')
    }
  }

  return (
    <>
      <SEO {...pageSeo['/get-started']} />

      {/* Header — static photo under a navy wash, same construction as Home */}
      <section className="relative pt-20 sm:pt-24 pb-44 sm:pb-52 flex items-center overflow-hidden text-white bg-dark">
        <Img
          src={GS_HERO_IMAGE}
          alt=""
          aria-hidden="true"
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-dark via-dark/85 to-dark/40" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-dark/80 via-transparent to-dark/30" />
        <div className="relative container-page w-full">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }} className="max-w-2xl">
            <p className="hero-eyebrow">Free Consultation · 24hr Response</p>
            <h1 className="display-heading mb-6">
              Let's Build<br />
              <span className="text-primary">Something That Works</span>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed max-w-xl">
              Tell us about your project and we'll get back to you within 24 hours with a free discovery call and a custom proposal. No commitment required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brief — a guided form on the left, and on the right the brief itself,
          filling in as the visitor answers. What they see is what we receive. */}
      <section id="brief" className="relative z-10 -mt-32 sm:-mt-40 pb-16 sm:pb-24 scroll-mt-24">
        <div className="container-page">
          <h2 className="sr-only">Project brief</h2>

          {/* Ways to reach us — the same four channels, for anyone who'd rather talk first */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-10"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {channels.map(({ icon, title, value, note, href, external }) => (
              <motion.a
                key={title}
                variants={staggerItem}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="card group p-4 sm:p-6 flex flex-col border-2 border-primary/40 hover:border-primary"
              >
                <div className="mb-4 sm:mb-5">
                  <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-dark flex items-center justify-center">
                    <i className={`${icon} text-accent`} />
                  </span>
                </div>
                <p className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-widest text-muted mb-1">{title}</p>
                <p className="font-heading font-bold text-dark text-sm sm:text-base break-words">{value}</p>
                <p className="text-muted text-xs mt-1 hidden sm:block">{note}</p>
              </motion.a>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">

            {/* The brief — a plain form, nothing clever */}
            <motion.div className="lg:col-span-3 card p-6 sm:p-10" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h3 className="text-2xl md:text-3xl font-heading font-black uppercase text-dark mb-2">Tell Us About Your Project</h3>
              <p className="text-muted text-sm mb-8">A few honest sentences are enough. We'll reply within 24 hours.</p>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                  role="status"
                  className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 sm:p-5 mb-6 text-sm flex items-start gap-3"
                >
                  <AnimatedCheckmark className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div className="leading-relaxed">
                    <p className="font-bold text-green-900 text-base mb-1">Thank you, your project brief has been received.</p>
                    <p>
                      Our team will review your requirements and contact you within 24 hours (Monday to Friday) to arrange a free discovery call.
                      If your project is time-sensitive, <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2 hover:text-green-950">message us on WhatsApp</a>.
                    </p>
                  </div>
                </motion.div>
              )}
              {status === 'error' && (
                <div role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm flex items-start gap-2">
                  <i className="fas fa-exclamation-circle mt-0.5" />
                  <span>
                    {errorMessage || 'Something went wrong. Please try again.'}{' '}
                    <a href={whatsappUrl("Hi Sleek Nexus Creative! I tried to submit a project brief but it didn't go through.")} target="_blank" rel="noopener noreferrer" className="font-semibold underline">Message us on WhatsApp instead</a>.
                  </span>
                </div>
              )}
              {restored && status !== 'success' && (
                <p className="text-sm text-muted mb-6">
                  We kept what you started last time.{' '}
                  <button type="button" onClick={() => { clearDraft(DRAFT_KEY); reset(EMPTY_BRIEF); setRestored(false) }} className="text-primary font-semibold hover:underline">Start over</button>
                </p>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Honeypot — hidden from real visitors, bots tend to fill every field */}
                <input {...register('website')} type="text" tabIndex="-1" autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden" />

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="gs-name" className="block text-sm font-medium text-dark mb-1.5">Full Name *</label>
                    <input id="gs-name" {...register('name')} aria-invalid={!!errors.name} placeholder="Your full name" className={inputClass(errors.name)} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="gs-email" className="block text-sm font-medium text-dark mb-1.5">Email Address *</label>
                    <input id="gs-email" {...register('email')} type="email" aria-invalid={!!errors.email} placeholder="your@email.com" className={inputClass(errors.email)} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="gs-phone" className="block text-sm font-medium text-dark mb-1.5">Phone / WhatsApp</label>
                    <input id="gs-phone" {...register('phone')} type="tel" placeholder="+211 xxx xxx xxx" className={inputClass(false)} />
                  </div>
                  <div>
                    <label htmlFor="gs-company" className="block text-sm font-medium text-dark mb-1.5">Organization</label>
                    <input id="gs-company" {...register('company')} placeholder="Your organization" className={inputClass(false)} />
                  </div>
                </div>

                <div>
                  <label htmlFor="gs-service" className="block text-sm font-medium text-dark mb-1.5">What do you need? *</label>
                  <select id="gs-service" {...register('service')} aria-invalid={!!errors.service} className={inputClass(errors.service)}>
                    <option value="">Select a service</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="gs-budget" className="block text-sm font-medium text-dark mb-1.5">Budget</label>
                    <select id="gs-budget" {...register('budget')} className={inputClass(false)}>
                      <option value="">Select a range</option>
                      {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="gs-timeline" className="block text-sm font-medium text-dark mb-1.5">Timeline</label>
                    <select id="gs-timeline" {...register('timeline')} className={inputClass(false)}>
                      <option value="">Select a timeline</option>
                      {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="gs-description" className="block text-sm font-medium text-dark mb-1.5">About the project *</label>
                  <textarea id="gs-description" {...register('description')} rows={5} aria-invalid={!!errors.description} placeholder="What problem should it solve, and who will use it?" className={inputClass(errors.description) + ' resize-none'} />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
                  {isSubmitting ? <><i className="fas fa-spinner fa-spin" /> Sending...</> : 'Send Project Brief'}
                </button>
                <p className="text-muted text-xs text-center">Your answers are saved on this device until you send them.</p>
              </form>
            </motion.div>

            {/* Side panel */}
            <motion.aside className="lg:col-span-2 space-y-5 lg:sticky lg:top-24" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
              {/* Live office status, worked out in Juba time */}
              <div className="card p-6">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h3 className="font-heading font-bold text-dark">Working Hours</h3>
                  <span className={`inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-widest rounded-full px-2.5 py-1 ${office.open ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-muted'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${office.open ? 'bg-primary animate-pulse' : 'bg-gray-400'}`} />
                    {office.open ? 'Open now' : 'Closed now'}
                  </span>
                </div>
                <dl className="divide-y divide-gray-100">
                  {hours.map(([day, time], i) => (
                    <div key={day} className={`flex items-center justify-between py-2.5 text-sm ${office.row === i ? 'font-semibold' : ''}`}>
                      <dt className={office.row === i ? 'text-dark' : 'text-muted'}>{day}{office.row === i && <span className="text-primary"> · today</span>}</dt>
                      <dd className={time === 'Closed' ? 'text-muted' : 'text-dark font-semibold'}>{time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="text-muted text-xs mt-4 flex items-start gap-2">
                  <i className="fas fa-globe text-primary mt-0.5" />
                  Times are Juba (EAT). Briefs sent outside these hours are read first thing next working day.
                </p>
              </div>

              {/* Packages at a glance — a sense of scope before writing */}
              <div className="card p-6">
                <h3 className="font-heading font-bold text-dark mb-1">Not sure of the scope?</h3>
                <p className="text-muted text-sm mb-4">Most projects fit one of three packages.</p>
                <ul className="space-y-2">
                  {packages.map(({ label, icon, timeline: weeks, bestFor, popular }) => (
                    <li key={label}>
                      <Link to="/services#all-packages" className="group flex items-center gap-3 rounded-xl px-3 py-2.5 bg-gray-50 hover:bg-primary/5 transition-colors">
                        <span className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${popular ? 'bg-primary' : 'bg-dark'}`}>
                          <i className={`fas ${icon} text-sm ${popular ? 'text-white' : 'text-accent'}`} />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="flex items-center gap-2 text-sm font-semibold text-dark">{label} <span className="text-muted font-normal text-xs">· {weeks}</span></span>
                          <span className="block text-xs text-muted truncate">{bestFor}</span>
                        </span>
                       
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Questions go to Contact, not here */}
              <div className="relative overflow-hidden bg-noise bg-dark text-white rounded-2xl p-6">
                <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">Just a Quick Question?</p>
                <p className="text-white/70 text-sm leading-relaxed mb-5">Not ready for a brief yet? Ask us anything: pricing, timelines, or whether we're the right fit.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-accent transition-colors">
                  Send us a message
                </Link>
              </div>
            </motion.aside>
          </div>

          {/* Other ways in — one slim strip */}
          <div className="mt-12 sm:mt-16 rounded-2xl bg-gray-50 px-6 py-6 sm:px-8 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
            <div className="lg:w-56 flex-shrink-0">
              <p className="font-heading font-black uppercase text-dark leading-tight">Not here to hire us?</p>
              <p className="text-muted text-xs mt-1">There are other ways to work with SNC.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 flex-1">
              {[
                { icon: 'fa-building',            label: 'Organizations & NGOs' },
                { icon: 'fa-hand-holding-dollar', label: 'Investors & Funders' },
                { icon: 'fa-rocket',              label: 'Startups & Innovators' },
                { icon: 'fa-graduation-cap',      label: 'Students & Researchers' },
              ].map(({ icon, label }) => (
                <Link key={label} to="/innovation-hub" className="group flex items-center gap-2.5 text-sm font-semibold text-dark hover:text-primary transition-colors">
                  <i className={`fas ${icon} text-primary w-4`} />
                  {label}
                 
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="eyebrow">Before You Reach Out</p>
            <h2 className="section-title">Common Questions</h2>
            <p className="section-subtitle">Answers to what people usually ask before starting a project with us.</p>
          </div>
          <FaqAccordion items={pageSeo['/get-started'].faq} />
        </div>
      </section>

      <CtaBand
        title="Still Weighing It Up?"
        desc="Browse our services and packages, or ask us anything first. No commitment either way."
        primary={{ to: '/services', label: "Explore Services" }}
        secondary={{ to: '/contact', label: "Ask a Question" }}
      />
    </>
  )
}
