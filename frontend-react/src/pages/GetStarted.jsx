import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/animations'

const services = [
  { icon: 'fa-code',         label: 'Web Development' },
  { icon: 'fa-mobile-alt',   label: 'Mobile App' },
  { icon: 'fa-pencil-ruler', label: 'UI/UX Design' },
  { icon: 'fa-palette',      label: 'Branding' },
  { icon: 'fa-laptop-code',  label: 'IT Consulting' },
  { icon: 'fa-question',     label: 'Not Sure Yet' },
]

const steps = [
  { num: '01', icon: 'fa-paper-plane', title: 'Tell Us About Your Project', desc: 'Fill in the form with your project idea, goals, and timeline. No technical knowledge required — just tell us what you need.' },
  { num: '02', icon: 'fa-calendar-check', title: 'We Schedule a Discovery Call', desc: 'Within 24 hours we reach out to book a free call to understand your requirements in detail.' },
  { num: '03', icon: 'fa-file-alt', title: 'Receive a Custom Proposal', desc: 'We send you a clear proposal with scope, timeline, and pricing — no hidden fees, no surprises.' },
  { num: '04', icon: 'fa-rocket', title: 'We Build & Deliver', desc: 'Once approved, our team gets to work. You get regular updates and a final product that works in the real world.' },
]

const faqs = [
  { q: 'How much does a project cost?', a: 'Every project is different. After our discovery call we send a custom proposal with transparent pricing based on your scope and timeline.' },
  { q: 'How long does a project take?', a: 'A simple website takes 2–4 weeks. A full web or mobile application typically takes 6–16 weeks depending on complexity.' },
  { q: 'Do you work with clients outside South Sudan?', a: 'Yes. We work with clients across Africa and internationally. All communication and delivery is handled remotely.' },
  { q: 'What information do I need to get started?', a: 'Just a rough idea of what you want to build and your goals. We guide you through the rest during the discovery call.' },
  { q: 'Do you offer ongoing support after launch?', a: 'Yes. We offer maintenance, hosting support, and feature updates after launch. We discuss this as part of your proposal.' },
]

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-dark text-sm gap-4"
      >
        {q}
        <i className={`fas fa-chevron-down text-primary text-xs transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="px-6 pb-5 text-muted text-sm leading-relaxed border-t border-gray-50 pt-3">{a}</p>}
    </div>
  )
}

export default function GetStarted() {
  const [selected, setSelected] = useState([])
  const [openFaq, setOpenFaq] = useState(null)

  const toggle = (label) =>
    setSelected(s => s.includes(label) ? s.filter(x => x !== label) : [...s, label])

  const subject = selected.length
    ? `Project Inquiry — ${selected.join(', ')}`
    : 'Project Inquiry'

  return (
    <>
      <SEO
        title="Get Started — Start a Project with Sleek Nexus Creative"
        description="Ready to build something? Tell us about your project and we'll get back to you within 24 hours with a free consultation and custom proposal."
        canonical="/get-started"
        keywords="start a project, hire software developers South Sudan, web development quote, mobile app development Africa, digital solutions Juba"
        image="https://sleeknexuscreative.com/images/about-preview.jpg"
        imageAlt="Start a project with Sleek Nexus Creative"
        breadcrumbs={[{ name: 'Get Started', url: '/get-started' }]}
      />

      {/* ── HERO ── */}
      <section
        className="relative py-28 flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d0f1a 0%, #1a0a10 50%, #0f1520 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-5 bg-accent/10 border border-accent/25 px-4 py-2 rounded-full">
              <i className="fas fa-rocket text-[0.7rem]" /> Free Consultation · 24hr Response
            </span>
            <h1 className="text-white font-heading font-black uppercase leading-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              Let's Build Something<br /><span className="text-primary">That Works</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Tell us about your project and we'll get back to you within 24 hours with a free discovery call and a custom proposal — no commitment required.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#start" className="btn-primary text-base px-8 py-3.5">
                <i className="fas fa-arrow-down" /> Start Your Project
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:border-white font-semibold px-8 py-3.5 rounded-lg transition-all">
                <i className="fas fa-envelope" /> Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
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

      {/* ── START FORM ── */}
      <section id="start" className="py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left — service picker */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Step 1</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-4 leading-tight">
                What Are You Looking to Build?
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                Select the service(s) you need. Then we'll take you to our contact form with everything pre-filled.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {services.map(({ icon, label }) => {
                  const active = selected.includes(label)
                  return (
                    <button
                      key={label}
                      onClick={() => toggle(label)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                        active
                          ? 'border-primary bg-primary text-white shadow-md'
                          : 'border-gray-200 bg-white text-dark-soft hover:border-primary/50 hover:bg-primary/5'
                      }`}
                    >
                      <i className={`fas ${icon} text-lg ${active ? 'text-white' : 'text-primary'}`} />
                      {label}
                    </button>
                  )
                })}
              </div>
              <Link
                to={`/contact?subject=${encodeURIComponent(subject)}`}
                className="btn-primary text-base px-8 py-3.5 w-full justify-center"
              >
                <i className="fas fa-arrow-right" /> Continue to Contact Form
              </Link>
              <p className="text-xs text-muted mt-3 text-center">Free consultation · No commitment · Reply within 24 hours</p>
            </motion.div>

            {/* Right — what to expect */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-white">
                <h3 className="text-xl font-heading font-bold mb-2">What to Expect</h3>
                <p className="text-white/70 text-sm mb-7">Here's what happens after you reach out.</p>
                <div className="space-y-6">
                  {[
                    { icon: 'fa-clock', title: 'Response within 24 hours', desc: 'We confirm receipt and book a free discovery call at a time that works for you.' },
                    { icon: 'fa-comments', title: 'Free discovery call', desc: 'A 30–45 minute call to understand your goals, users, and technical requirements.' },
                    { icon: 'fa-file-invoice', title: 'Custom proposal', desc: 'A clear document with scope, timeline, deliverables, and transparent pricing.' },
                    { icon: 'fa-check-circle', title: 'You decide', desc: 'No pressure. Review the proposal and let us know if you want to move forward.' },
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
                <div className="mt-8 pt-6 border-t border-white/20 flex items-center gap-3">
                  <i className="fas fa-envelope text-accent" />
                  <a href="mailto:info@sleeknexuscreative.com" className="text-white/80 text-sm hover:text-white transition-colors">
                    info@sleeknexuscreative.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Common Questions</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <FAQItem key={i} {...item} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-heading font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Tell us what you need and we'll get back to you within 24 hours with a free consultation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#start" className="btn-primary text-base px-8 py-3.5">
                <i className="fas fa-rocket" /> Start Your Project
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:border-white font-semibold px-8 py-3.5 rounded-lg transition-all">
                <i className="fas fa-envelope" /> Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
