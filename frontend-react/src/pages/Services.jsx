import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, scaleIn, floatAnimation } from '../lib/animations'
import SEO from '../components/ui/SEO'
import { pageSeo } from '../lib/seo-data'
import MagneticButton from '../components/ui/MagneticButton'
import PricingEstimator from '../components/ui/PricingEstimator'
import { packages } from '../lib/packages-data'

const navItems = [
  { id: 'software-dev', icon: 'fa-code',         label: 'Software Dev' },
  { id: 'web-mobile',   icon: 'fa-mobile-alt',   label: 'Web & Mobile' },
  { id: 'edtech',       icon: 'fa-graduation-cap', label: 'EdTech' },
  { id: 'consulting',   icon: 'fa-laptop-code',  label: 'Consulting' },
  { id: 'all-packages', icon: 'fa-box-open',     label: 'Packages' },
]

const services = [
  {
    id: 'software-dev', icon: 'fa-code', title: 'Software Development', img: '/images/software-dev.jpg',
    intro: 'Enterprise-grade custom software engineered with cutting-edge technologies to address complex business challenges and drive sustainable growth.',
    offers: ['Custom Application Development', 'Enterprise Software Solutions', 'API Development & Integration', 'Database Design & Management', 'Cloud-Based Solutions', 'Software Maintenance & Support'],
    process: ['Requirements Analysis', 'Design & Planning', 'Development', 'Testing & QA', 'Deployment & Support'],
  },
  {
    id: 'web-mobile', icon: 'fa-mobile-alt', title: 'Web & Mobile Applications', img: '/images/web-mobile.jpg',
    intro: 'Cutting-edge responsive platforms and mobile solutions engineered to deliver exceptional user experiences across all devices.',
    offers: ['Responsive Website Development', 'Progressive Web Apps (PWA)', 'iOS & Android App Development', 'Cross-Platform Solutions', 'E-Commerce Platforms', 'UI/UX Design'],
    tech: ['React', 'Angular', 'Vue.js', 'React Native', 'Flutter', 'Node.js'],
  },
  {
    id: 'edtech', icon: 'fa-graduation-cap', title: 'Educational Technology', img: '/images/edtech.jpg',
    intro: 'Revolutionary learning ecosystems and educational tools that democratize access to quality education and deliver measurable learning outcomes.',
    offers: ['Learning Management Systems (LMS)', 'Online Course Platforms', 'Student Information Systems', 'Interactive Learning Tools', 'Assessment & Analytics', 'Virtual Classroom Solutions'],
    features: [{ icon: 'fa-video', label: 'Video Learning' }, { icon: 'fa-chart-line', label: 'Progress Tracking' }, { icon: 'fa-users', label: 'Collaboration' }, { icon: 'fa-certificate', label: 'Certifications' }],
  },
  {
    id: 'consulting', icon: 'fa-laptop-code', title: 'IT Consulting & Digital Transformation', img: '/images/consulting.jpg',
    intro: 'Strategic technology advisory services designed to navigate digital transformation complexities and position your organization for sustained competitive advantage.',
    offers: ['Technology Strategy & Planning', 'Digital Transformation', 'System Architecture Design', 'Security Audits & Compliance', 'Cloud Migration Services', 'Performance Optimization'],
    benefits: [
      { icon: 'fa-lightbulb', title: 'Expert Guidance', desc: 'Decades of combined experience across diverse industries' },
      { icon: 'fa-shield-alt', title: 'Security First', desc: 'Enterprise-grade security and compliance best practices' },
      { icon: 'fa-rocket', title: 'Scalable Solutions', desc: 'Built to grow with your business' },
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

      {/* Header */}
      <section className="relative overflow-hidden bg-noise text-white py-24 text-center" style={{background:'linear-gradient(160deg,#1a2a35 0%,#000000 60%)'}}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.8 }}>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Enterprise-Grade Technology Solutions</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Our Services</h1>
            <p className="text-gray-300 text-lg leading-relaxed">We deliver comprehensive technology services designed to transform your business operations and accelerate growth — from custom software development to strategic IT consulting.</p>
          </motion.div>
        </div>
      </section>

      {/* Sticky anchor nav */}
      <div className="sticky top-[72px] z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
            {navItems.map(({ id, icon, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  activeSection === id
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-muted hover:text-primary hover:bg-primary/8'
                }`}
              >
                <i className={`fas ${icon} text-xs`} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      {services.map(({ id, icon, title, img, intro, offers, process, tech, features, benefits }, idx) => (
        <section key={id} id={id} className={`py-24 ${idx % 2 !== 0 ? 'bg-gray-50' : ''}`}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.75 }} className={idx % 2 !== 0 ? 'lg:order-2' : ''}>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <i className={`fas ${icon} text-primary text-2xl`} />
                </div>
                <h2 className="text-3xl font-heading font-bold text-dark mb-4">{title}</h2>
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
                        <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[0.6rem] font-black">{i + 1}</span> {p}
                      </span>
                    ))}
                  </div>
                )}
                {tech && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tech.map(t => <span key={t} className="bg-dark text-white text-xs px-3 py-1 rounded-full">{t}</span>)}
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
                <img src={img} alt={title} className="rounded-2xl shadow-xl w-full object-cover h-80 lg:h-[420px]" loading="lazy" />
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Interactive pricing estimator */}
      <PricingEstimator />

      {/* Packages */}
      <section id="all-packages" className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Service Packages</p>
            <h2 className="section-title">Or Browse Every Package</h2>
            <p className="section-subtitle">Every project is unique. Browse our packages to understand what's included, then contact us for a tailored quote.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map(({ tier, label, icon, timeline, popular, desc, features, bestFor }, i) => (
              <motion.div id={`pkg-${tier.toLowerCase()}`} key={tier} className="h-full scroll-mt-28" variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}>
                <motion.div
                  animate={popular ? floatAnimation : undefined}
                  className={`card p-8 relative h-full ${popular ? 'border-2 border-primary shadow-xl scale-105' : ''}`}
                >
                  {popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <i className={`fas ${icon} text-primary text-lg`} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-muted">{tier}</span>
                  <h3 className="text-xl font-heading font-bold text-dark mt-1 mb-2">{label}</h3>
                  <p className="text-muted text-sm mb-4">{desc}</p>
                  <div className="inline-flex items-center gap-1.5 text-xs text-muted border border-gray-200 rounded-full px-3 py-1 mb-5">
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
                </motion.div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-muted mt-8">
            <i className="fas fa-shield-alt text-primary mr-1" />
            All packages include a <strong>free initial consultation</strong>. Pricing is customized to your exact requirements — <Link to="/contact" className="text-primary hover:underline">reach out</Link> and we'll build a proposal just for you.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-noise py-20 bg-dark text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="font-heading uppercase leading-[0.95] mb-4"
            style={{ fontSize: 'clamp(1.9rem,4.5vw,3rem)', fontWeight: 800, textShadow: '3px 3px 0px rgba(254,127,45,0.35), 6px 6px 0px rgba(254,127,45,0.15)' }}
          >
            <span className="block text-white">Ready to Accelerate</span>
            <span
              className="block"
              style={{ fontSize: 'clamp(1.6rem,4vw,2.5rem)', WebkitTextStroke: '1.5px #FE7F2D', color: 'transparent', textShadow: '2px 2px 0px rgba(254,127,45,0.25), 4px 4px 0px rgba(0,0,0,0.4)' }}
            >
              Your Digital Transformation?
            </span>
          </h2>
          <p className="text-gray-300 mb-8">Partner with us to unlock innovative solutions that drive growth, efficiency, and competitive advantage.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <MagneticButton>
              <Link to="/contact" className="btn-primary">Contact Us</Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/innovation-hub" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">View Our Work</Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  )
}
