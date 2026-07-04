import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/animations'
import SEO from '../components/ui/SEO'

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

const packages = [
  {
    tier: 'BASIC', label: 'Starter', icon: 'fa-seedling', timeline: '2–4 weeks', popular: false, color: '',
    desc: 'Perfect for getting your digital presence off the ground quickly and affordably.',
    features: ['Basic website or simple app', 'Up to 5 pages/screens', 'Mobile-friendly responsive design', 'Basic SEO setup', 'Contact form / WhatsApp integration', '30 days post-launch support'],
    bestFor: 'Small businesses, shops, personal brands, NGOs starting out',
  },
  {
    tier: 'POPULAR', label: 'Professional', icon: 'fa-rocket', timeline: '1–3 months', popular: true, color: 'text-accent',
    desc: 'The go-to choice for growing organizations that need powerful, custom-built solutions.',
    features: ['Custom website or application', 'Up to 15–25 pages/screens', 'Advanced features (dashboards, payments)', 'API integration', 'Admin panel included', '90 days post-launch support', 'Staff training included'],
    bestFor: 'Growing companies, schools, hospitals, NGOs, startups',
  },
  {
    tier: 'ENTERPRISE', label: 'Premium', icon: 'fa-city', timeline: '3–6+ months', popular: false, color: '',
    desc: 'Full-scale enterprise solutions built for complex, high-stakes environments.',
    features: ['Enterprise-level platform', 'Complex system architecture', 'Multiple integrations (payments, SMS)', 'Cloud deployment & DevOps', 'Dedicated development team', '1 year post-launch support', 'Priority support & SLA'],
    bestFor: 'Banks, telecoms, government institutions, large organizations',
  },
]

export default function Services() {
  return (
    <>
      <SEO
        title="Our Services — Web, Mobile, E-Learning & IT Consulting"
        description="Software development, web & mobile apps, educational technology, and IT consulting services in South Sudan. Affordable, reliable, and built for local realities."
        canonical="/services"
        image="https://sleeknexuscreative.com/images/software-dev.jpg"
        imageAlt="Software development and IT services in South Sudan"
        breadcrumbs={[{ name: 'Services', url: '/services' }]}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-dark to-dark-soft text-white py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }}>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Enterprise-Grade Technology Solutions</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Our Services</h1>
            <p className="text-gray-300 text-lg leading-relaxed">We deliver comprehensive technology services designed to transform your business operations and accelerate growth — from custom software development to strategic IT consulting.</p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      {services.map(({ id, icon, title, img, intro, offers, process, tech, features, benefits }, idx) => (
        <section key={id} id={id} className={`py-24 ${idx % 2 !== 0 ? 'bg-gray-50' : ''}`}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }} className={idx % 2 !== 0 ? 'lg:order-2' : ''}>
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
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className={idx % 2 !== 0 ? 'lg:order-1' : ''}>
                <img src={img} alt={title} className="rounded-2xl shadow-xl w-full object-cover h-80 lg:h-[420px]" loading="lazy" />
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Packages */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Service Packages</p>
            <h2 className="section-title">Find the Right Fit for Your Project</h2>
            <p className="section-subtitle">Every project is unique. Browse our packages to understand what's included, then contact us for a tailored quote.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map(({ tier, label, icon, timeline, popular, desc, features, bestFor }, i) => (
              <motion.div key={tier} className={`card p-8 relative ${popular ? 'border-2 border-primary shadow-xl scale-105' : ''}`} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
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
            ))}
          </div>
          <p className="text-center text-sm text-muted mt-8">
            <i className="fas fa-shield-alt text-primary mr-1" />
            All packages include a <strong>free initial consultation</strong>. Pricing is customized to your exact requirements — <Link to="/contact" className="text-primary hover:underline">reach out</Link> and we'll build a proposal just for you.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Accelerate Your Digital Transformation?</h2>
          <p className="text-gray-300 mb-8">Partner with us to unlock innovative solutions that drive growth, efficiency, and competitive advantage.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Contact Us</Link>
            <Link to="/projects" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">View Our Work</Link>
          </div>
        </div>
      </section>
    </>
  )
}
