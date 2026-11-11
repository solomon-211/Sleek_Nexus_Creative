import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, scaleIn, floatAnimation } from '../lib/animations'
import SEO from '../components/ui/SEO'
import { pageSeo } from '../lib/seo-data'
import PricingEstimator from '../components/ui/PricingEstimator'
import TiltCard from '../components/ui/TiltCard'
import { packages } from '../lib/packages-data'
import Img from '../components/ui/Img'
import PageHeader from '../components/ui/PageHeader'
import CtaBand from '../components/ui/CtaBand'

const navItems = [
  { id: 'software-dev', icon: 'fa-code',         label: 'Software Dev' },
  { id: 'web-mobile',   icon: 'fa-mobile-alt',   label: 'Web & Mobile' },
  { id: 'edtech',       icon: 'fa-graduation-cap', label: 'EdTech' },
  { id: 'consulting',   icon: 'fa-laptop-code',  label: 'Consulting' },
  { id: 'all-packages', icon: 'fa-box-open',     label: 'Packages' },
]

const services = [
  {
    id: 'software-dev', icon: 'fa-code', title: 'Software Development', img: '/images/ui-ux.jpg',
    intro: 'Software built around how your organization actually works (records, payments, approvals, reporting), so the system fits the process instead of the other way round.',
    offers: ['Custom Application Development', 'Enterprise Software Solutions', 'API Development & Integration', 'Database Design & Management', 'Cloud-Based Solutions', 'Software Maintenance & Support'],
    process: ['Requirements Analysis', 'Design & Planning', 'Development', 'Testing & QA', 'Deployment & Support'],
  },
  {
    id: 'web-mobile', icon: 'fa-mobile-alt', title: 'Web & Mobile Applications', img: '/images/web-mobile-apps.jpg',
    intro: 'Websites and apps that load fast on a mid-range phone and a patchy connection, because that is how most of your users will meet them.',
    offers: ['Responsive Website Development', 'Progressive Web Apps (PWA)', 'iOS & Android App Development', 'Cross-Platform Solutions', 'E-Commerce Platforms', 'UI/UX Design'],
  },
  {
    id: 'edtech', icon: 'fa-graduation-cap', title: 'Educational Technology', img: '/images/edtech-learning.jpg',
    intro: 'Platforms for schools, training centres, and programmes that need to reach learners online, from course delivery to student records. We built EduPortal South Sudan, which serves all 10 states.',
    offers: ['Learning Management Systems (LMS)', 'Online Course Platforms', 'Student Information Systems', 'Interactive Learning Tools', 'Assessment & Analytics', 'Virtual Classroom Solutions'],
    features: [{ icon: 'fa-video', label: 'Video Learning' }, { icon: 'fa-chart-line', label: 'Progress Tracking' }, { icon: 'fa-users', label: 'Collaboration' }, { icon: 'fa-certificate', label: 'Certifications' }],
  },
  {
    id: 'consulting', icon: 'fa-laptop-code', title: 'IT Consulting & Digital Transformation', img: '/images/Torward.jpg',
    intro: 'Honest advice before you spend money on technology: what to build, what to buy, what to leave alone, and how to move off paper without disrupting the work.',
    offers: ['Technology Strategy & Planning', 'Digital Transformation', 'System Architecture Design', 'Security Audits & Compliance', 'Cloud Migration Services', 'Performance Optimization'],
    benefits: [
      { icon: 'fa-lightbulb', title: 'Built From Our Own Products', desc: 'Advice grounded in running EduPortal and HealthHub Bridge in production' },
      { icon: 'fa-shield-alt', title: 'Security Built In', desc: 'Access control, backups, and data protection planned from day one' },
      { icon: 'fa-rocket', title: 'Room to Grow', desc: 'Systems sized for today, with a clear path when usage grows' },
    ],
  },
]

export default function Services() {
  const [activeSection, setActiveSection] = useState('software-dev')

  useEffect(() => {
    const ids = navItems.map(n => n.id)
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <>
      <SEO {...pageSeo['/services']} />

      <PageHeader
        tone="dark"
        label="What We Build"
        title="Our Services"
        desc="Software, websites, apps, and learning platforms for organizations anywhere, designed for real networks, real devices, and the people who use them every day."
      />

      {/* Sticky anchor nav */}
      <div className="sticky top-[72px] z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container-page">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
            {navItems.map(({ id, icon, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  activeSection === id
                    ? 'text-primary'
                    : 'text-muted hover:text-primary hover:bg-primary/8'
                }`}
              >
                <i className={`fas ${icon} text-xs transition-transform duration-200 ${activeSection === id ? 'scale-110' : ''}`} />
                {label}
                {activeSection === id && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      {services.map(({ id, icon, title, img, intro, offers, process, features, benefits }, idx) => (
        <section key={id} id={id} className={`py-16 sm:py-24 ${idx % 2 !== 0 ? 'bg-gray-50' : ''}`}>
          <div className="container-page">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.75 }} className={idx % 2 !== 0 ? 'lg:order-2' : ''}>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <i className={`fas ${icon} text-primary text-2xl`} />
                </div>
                <h2 className="section-title">{title}</h2>
                <p className="text-muted leading-relaxed mb-6">{intro}</p>
                <h3 className="font-semibold text-dark mb-3">What We Offer:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {offers.map(o => (
                    <li key={o} className="flex items-center gap-2 text-sm text-muted">
                      <i className="fas fa-check text-primary text-xs" /> {o}
                    </li>
                  ))}
                </ul>
                {process && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {process.map((p, i) => (
                      <span key={p} className="inline-flex items-center gap-2 border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                        <span className="w-5 h-5 rounded-full bg-primary text-[#1B2F3B] flex items-center justify-center text-[0.6rem] font-black">{i + 1}</span> {p}
                      </span>
                    ))}
                  </div>
                )}
                {features && (
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {features.map(({ icon: fi, label }) => (
                      <div key={label} className="flex items-center gap-2 bg-primary/5 rounded-lg p-3">
                        <i className={`fas ${fi} text-primary`} />
                        <span className="text-sm font-medium text-dark">{label}</span>
                      </div>
                    ))}
                  </div>
                )}
                {benefits && (
                  <div className="space-y-3 mb-6">
                    {benefits.map(({ icon: bi, title: bt, desc: bd }) => (
                      <div key={bt} className="flex gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <i className={`fas ${bi} text-primary text-sm`} />
                        </div>
                        <div>
                          <p className="font-semibold text-dark text-sm">{bt}</p>
                          <p className="text-muted text-xs">{bd}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Link to="/contact" className="btn-primary">Request a Quote</Link>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.25 }} className={idx % 2 !== 0 ? 'lg:order-1' : ''}>
                <Img src={img} alt={title} className="rounded-2xl shadow-xl w-full object-cover h-80 lg:h-[420px]" loading="lazy" />
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Interactive pricing estimator */}
      <PricingEstimator />

      {/* Packages */}
      <section id="all-packages" className="py-16 sm:py-24 bg-gray-50">
        <div className="container-page">
          <div className="text-center mb-14">
            <p className="eyebrow">Service Packages</p>
            <h2 className="section-title">Or Browse Every Package</h2>
            <p className="section-subtitle">Every project is unique. Browse our packages to understand what's included, then contact us for a quote based on your needs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map(({ tier, label, icon, timeline, popular, desc, features, bestFor }, i) => (
              <motion.div id={`pkg-${tier.toLowerCase()}`} key={tier} className="h-full scroll-mt-28" variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}>
                <TiltCard
                  max={6}
                  animate={popular ? floatAnimation : undefined}
                  className={`card p-8 relative h-full ${popular ? 'border-2 border-primary shadow-xl scale-105' : ''}`}
                >
                  {popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-[#1B2F3B] text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <i className={`fas ${icon} text-primary text-lg`} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-muted">{tier}</span>
                  <h3 className="text-2xl font-heading font-black text-dark mt-1 mb-2">{label}</h3>
                  <p className="text-muted text-sm mb-4">{desc}</p>
                  <div className="inline-flex items-center gap-1.5 text-xs text-muted bg-gray-50 rounded-full px-3 py-1 mb-5">
                    <i className="fas fa-clock text-primary" /> {timeline} delivery
                  </div>
                  <ul className="space-y-2 mb-6">
                    {features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted">
                        <i className="fas fa-check text-primary text-xs mt-1 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted bg-gray-50 rounded-lg p-3 mb-5">
                    <i className="fas fa-users text-primary mr-1" /> {bestFor}
                  </p>
                  <Link to="/contact" className={popular ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}>Get a Free Quote</Link>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-muted mt-8">
            <i className="fas fa-shield-alt text-primary mr-1" />
            All packages include a <strong>free initial consultation</strong>. Pricing depends on your exact requirements. <Link to="/contact" className="text-primary hover:underline">Get in touch</Link> and we'll build a proposal just for you.
          </p>
        </div>
      </section>

      {/* CTA */}
      <CtaBand
        title="Have Something in Mind?"
        desc="Tell us what's slowing your organization down. We'll reply within 24 hours with honest next steps."
        primary={{ to: '/contact', label: "Contact Us" }}
      />
    </>
  )
}
