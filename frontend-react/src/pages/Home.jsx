import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItem, scaleIn } from '../lib/animations'
import SEO from '../components/ui/SEO'

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  { icon: 'fa-code', title: 'Software Development', desc: 'Custom platforms engineered for speed, reliability, and clear business outcomes.', hash: '#software-dev' },
  { icon: 'fa-mobile-alt', title: 'Web & Mobile Apps', desc: 'Responsive web and mobile products optimized for adoption across all device conditions.', hash: '#web-mobile' },
  { icon: 'fa-graduation-cap', title: 'Educational Technology', desc: 'Digital learning tools that expand access, improve engagement, and increase completion rates.', hash: '#edtech' },
  { icon: 'fa-laptop-code', title: 'IT Consulting', desc: 'Technology strategy and implementation support that de-risks delivery and accelerates growth.', hash: '#consulting' },
]

const counters = [
  { icon: 'fa-project-diagram', value: 10, suffix: '+', label: 'Projects Delivered' },
  { icon: 'fa-user-graduate', value: 50, suffix: '+', label: 'Learners Supported' },
  { icon: 'fa-handshake', value: 5, suffix: '+', label: 'Partner Organizations' },
  { icon: 'fa-calendar-check', value: 1, suffix: '+', label: 'Years of Excellence' },
]

const processSteps = [
  { num: '01', icon: 'fa-comments', title: 'Discovery Call', desc: 'We listen to your goals, challenges, and requirements to understand exactly what you need.' },
  { num: '02', icon: 'fa-pencil-ruler', title: 'Plan & Design', desc: 'We create a detailed project plan, wireframes, and design mockups for your approval.' },
  { num: '03', icon: 'fa-code', title: 'Build & Test', desc: 'Our engineers build your product with regular updates and thorough quality testing.' },
  { num: '04', icon: 'fa-rocket', title: 'Launch & Support', desc: 'We deploy your product and provide ongoing support, training, and maintenance.' },
]

const projects = [
  { img: '/images/project1.jpg', title: 'E-Learning Platform', desc: 'Online learning platform built for a Juba-based institution, enabling students to access courses, track progress, and receive certificates digitally.', hash: '#project1' },
  { img: '/images/project2.jpg', title: 'Business Management System', desc: 'Custom inventory and operations management system built for a local retail business to streamline daily workflows.', hash: '#project2' },
  { img: '/images/project3.jpg', title: 'Mobile Payments App', desc: 'Simple and secure mobile app enabling small businesses to send and receive payments with ease.', hash: '#project3' },
]

const testimonials = [
  { initials: 'AM', name: 'Akol Mading', role: 'Director, Juba Learning Centre', text: 'SNC built our online course platform from scratch. The team was communicative, delivered on time, and trained our staff to manage it independently. Exactly what we needed.' },
  { initials: 'RC', name: 'Rebecca Chol', role: 'Owner, RC Retail Store', text: 'They built us a simple inventory system that actually works on our local network. No unnecessary complexity — just a clean solution that saves us hours every week.' },
  { initials: 'PM', name: 'Peter Majok', role: 'Program Officer, Local NGO', text: 'We needed a website quickly and within a tight budget. SNC delivered a professional, mobile-friendly site and were honest about what was realistic. Great experience.' },
]

const whyCards = [
  { icon: 'fa-map-marker-alt', title: 'Locally Based', desc: "We understand South Sudan's unique challenges, infrastructure, and market realities better than any foreign firm." },
  { icon: 'fa-shield-alt', title: 'Secure & Reliable', desc: 'Every product we build follows security best practices with robust backup systems and reliable hosting.' },
  { icon: 'fa-dollar-sign', title: 'Affordable Pricing', desc: 'World-class quality at prices designed for African markets, with flexible payment plans available.' },
  { icon: 'fa-headset', title: 'Dedicated Support', desc: 'Our team is available after launch for maintenance, updates, training, and technical support.' },
  { icon: 'fa-graduation-cap', title: 'Training Included', desc: 'We train your team to use and manage every product we deliver so you stay independent.' },
  { icon: 'fa-clock', title: 'On-Time Delivery', desc: 'We set clear milestones and consistently deliver on time without compromising quality.' },
]

// ─── Animated Counter ────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1800
        const steps = 60
        const increment = value / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= value) { setCount(value); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, duration / steps)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ─── Home ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <SEO
        title="Sleek Nexus Creative — Technology & Innovation for South Sudan"
        description="Sleek Nexus Creative helps organizations in South Sudan launch dependable websites, apps, and platforms that scale, perform, and deliver measurable impact. Based in Juba."
        canonical="/"
        keywords="web development South Sudan, mobile apps Juba, IT consulting South Sudan, e-learning platform South Sudan, software company Juba, Sleek Nexus Creative, SNC technology"
        image="https://sleeknexuscreative.com/images/og-cover.jpg"
        imageAlt="Sleek Nexus Creative — Technology & Innovation for South Sudan"
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Sleek Nexus Creative',
            url: 'https://sleeknexuscreative.com',
            logo: 'https://sleeknexuscreative.com/images/snc-logo.png',
            description: 'Sleek Nexus Creative is a technology and innovation company based in Juba, South Sudan, building websites, mobile apps, e-learning platforms, and digital solutions for organizations across Africa.',
            foundingDate: '2024',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Juba',
              addressCountry: 'SS',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              email: 'info@sleeknexuscreative.com',
              availableLanguage: 'English',
            },
            sameAs: [
              'https://www.linkedin.com/company/sleek-nexus-creative',
              'https://www.facebook.com/sleeknexuscreative',
              'https://twitter.com/SleekNexus',
              'https://www.instagram.com/sleeknexuscreative',
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Sleek Nexus Creative',
            url: 'https://sleeknexuscreative.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://sleeknexuscreative.com/?s={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          },
        ]}
      />

      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: `radial-gradient(ellipse at 70% 50%, rgba(196,30,58,.18), transparent 55%),
            radial-gradient(ellipse at 10% 80%, rgba(255,140,66,.12), transparent 45%),
            linear-gradient(120deg, rgba(8,10,20,.82), rgba(15,20,35,.78)),
            url('/images/hero-tech.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }}>
              <p className="section-label text-accent">Technology Built for South Sudan</p>
              <h1 className="text-white mb-5 sm:mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4.2vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                <span className="block text-white">We Build Digital Products</span>
                <span className="block text-white">That Work in</span>
                <span className="block">the{' '}
                  <span className="bg-gradient-to-r from-accent via-orange-300 to-yellow-300 bg-clip-text text-transparent">Real World</span>
                </span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-7 sm:mb-8">
                Sleek Nexus Creative helps organizations in South Sudan launch dependable websites, apps, and platforms that scale, perform, and deliver measurable impact.
              </p>
              <div className="flex flex-wrap gap-3 mb-8 sm:mb-12">
                <Link to="/contact" className="btn-primary">Start Your Project</Link>
                <Link to="/projects" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">View Our Work</Link>
              </div>
              <div className="flex flex-wrap gap-6 sm:gap-8">
                {[{ value: '10+', label: 'Projects Delivered' }, { value: '50+', label: 'Learners Supported' }, { value: '1+', label: 'Years of Excellence' }].map(({ value, label }) => (
                  <div key={label}>
                    <strong className="block text-2xl sm:text-3xl font-heading font-bold text-white">{value}</strong>
                    <span className="text-gray-400 text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.aside
              variants={fadeRight} initial="hidden" animate="show" transition={{ duration: 0.6, delay: 0.25 }}
              className="bg-white/[0.07] backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.15)]"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)' }}
            >
              <p className="text-accent text-xs font-bold uppercase tracking-widest mb-4">What You Get</p>
              <ul className="space-y-3 mb-6">
                {[
                  'Discovery and planning before every build',
                  'Fast, mobile-first interfaces users actually adopt',
                  'Secure architecture and post-launch support',
                  'Dedicated team throughout the project',
                  'On-time delivery with clear milestones',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-gray-200 text-sm">
                    <i className="fas fa-check-circle text-accent mt-0.5 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <Link to="/services" className="inline-flex items-center gap-2 text-accent font-semibold text-sm">
                Explore Our Services <i className="fas fa-arrow-right" />
              </Link>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {counters.map(({ icon, value, suffix, label }) => (
              <motion.div key={label} variants={scaleIn}>
                <i className={`fas ${icon} text-primary text-xl sm:text-2xl mb-2 sm:mb-3 block`} />
                <strong className="block text-3xl sm:text-4xl font-heading font-black text-dark mb-1">
                  <AnimatedCounter value={value} suffix={suffix} />
                </strong>
                <span className="text-muted text-xs sm:text-sm">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div className="text-center mb-10 sm:mb-14" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">What We Do</p>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">From concept to launch, we design systems that solve real operational and community problems.</p>
          </motion.div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {services.map(({ icon, title, desc, hash }) => (
              <motion.div key={title} className="card p-5 sm:p-6" variants={staggerItem}>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-primary text-lg`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{desc}</p>
                <Link to={`/services${hash}`} className="text-primary text-sm font-semibold hover:underline">Learn More</Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Who We Are</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-dark mb-5 leading-tight">
                Building Reliable Technology for South Sudanese Organizations
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Based in Juba, we partner with businesses, schools, NGOs, and public initiatives to design practical, scalable digital systems for local realities.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Our team combines product strategy, engineering, and training to help clients launch faster, operate more efficiently, and sustain long-term digital growth.
              </p>
              <Link to="/about" className="btn-primary">Learn About Us</Link>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
              <img src="/images/about-preview.jpg" alt="Sleek Nexus Creative — Building Reliable Technology for South Sudan" className="w-full rounded-xl object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Our Process</p>
            <h2 className="section-title">How We Work</h2>
            <p className="section-subtitle">A clear, structured process from your first message to a live product.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {processSteps.map(({ num, icon, title, desc }, i) => (
              <motion.div key={num} className="card p-5 sm:p-6 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="text-4xl sm:text-5xl font-heading font-black text-primary/10 mb-3">{num}</div>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${icon} text-primary text-lg`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Our Work</p>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">Selected case studies with measurable outcomes in education, business, and finance.</p>
          </div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-10"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {projects.map(({ img, title, desc, hash }) => (
              <motion.div key={title} className="card overflow-hidden" variants={staggerItem}>
                <img src={img} alt={title} className="w-full h-44 sm:h-48 object-cover" loading="lazy" />
                <div className="p-4 sm:p-5">
                  <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">{desc}</p>
                  <Link to={`/projects${hash}`} className="text-primary text-sm font-semibold hover:underline">View Case Study</Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center">
            <Link to="/projects" className="btn-primary">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Client Stories</p>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">Trusted by businesses, schools, and organizations across South Sudan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map(({ initials, name, role, text }, i) => (
              <motion.div key={name} className="card p-5 sm:p-6" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="flex gap-1 text-accent mb-4">
                  {Array(5).fill(0).map((_, j) => <i key={j} className="fas fa-star text-sm" />)}
                </div>
                <p className="text-muted text-sm leading-relaxed italic mb-5">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">{initials}</div>
                  <div>
                    <p className="font-semibold text-dark text-sm">{name}</p>
                    <p className="text-muted text-xs">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Our Edge</p>
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">We are not just a vendor — we are a long-term technology partner committed to your success.</p>
          </div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {whyCards.map(({ icon, title, desc }) => (
              <motion.div key={title} className="card p-5 sm:p-6" variants={staggerItem}>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-primary text-lg`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary to-primary-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="section-label text-white/70">Work With Us</p>
          <h2 className="display-heading-sm mb-4">Have a Project in Mind?</h2>
          <p className="text-white/80 text-base sm:text-lg mb-7 sm:mb-8">Tell us what you need. We will assess it honestly, scope it clearly, and build it right.</p>
          <div className="flex flex-wrap gap-3 justify-center mb-6 sm:mb-8">
            <Link to="/contact" className="bg-white text-primary hover:bg-gray-100 font-semibold px-6 sm:px-7 py-3 rounded-lg inline-flex items-center gap-2 transition-colors touch-manipulation">
              Get in Touch
            </Link>
            <Link to="/services" className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-6 sm:px-7 py-3 rounded-lg inline-flex items-center gap-2 transition-colors touch-manipulation">
              Our Services
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-white/80">
            {['Free Consultation', 'On-Time Delivery', 'Post-Launch Support', 'Transparent Pricing'].map(item => (
              <span key={item} className="flex items-center gap-1.5"><i className="fas fa-check-circle text-white" /> {item}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
