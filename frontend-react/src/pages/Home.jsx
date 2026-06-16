import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { fadeUp } from '../lib/animations'
import NewsletterForm from '../components/ui/NewsletterForm'

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  { icon: 'fa-code', title: 'Software Development', desc: 'Custom platforms engineered for speed, reliability, and clear business outcomes.', hash: '#software-dev' },
  { icon: 'fa-mobile-alt', title: 'Web & Mobile Apps', desc: 'Responsive web and mobile products optimized for adoption across all device conditions.', hash: '#web-mobile' },
  { icon: 'fa-graduation-cap', title: 'Educational Technology', desc: 'Digital learning tools that expand access, improve engagement, and increase completion rates.', hash: '#edtech' },
  { icon: 'fa-laptop-code', title: 'IT Consulting', desc: 'Technology strategy and implementation support that de-risks delivery and accelerates growth.', hash: '#consulting' },
]

const counters = [
  { icon: 'fa-project-diagram', value: 50, suffix: '+', label: 'Projects Delivered' },
  { icon: 'fa-user-graduate', value: 10000, suffix: '+', label: 'Learners Supported' },
  { icon: 'fa-handshake', value: 30, suffix: '+', label: 'Partner Organizations' },
  { icon: 'fa-calendar-check', value: 5, suffix: '+', label: 'Years of Excellence' },
]

const processSteps = [
  { num: '01', icon: 'fa-comments', title: 'Discovery Call', desc: 'We listen to your goals, challenges, and requirements to understand exactly what you need.' },
  { num: '02', icon: 'fa-pencil-ruler', title: 'Plan & Design', desc: 'We create a detailed project plan, wireframes, and design mockups for your approval.' },
  { num: '03', icon: 'fa-code', title: 'Build & Test', desc: 'Our engineers build your product with regular updates and thorough quality testing.' },
  { num: '04', icon: 'fa-rocket', title: 'Launch & Support', desc: 'We deploy your product and provide ongoing support, training, and maintenance.' },
]

const projects = [
  { img: '/images/project1.jpg', title: 'E-Learning Platform', desc: 'Comprehensive digital learning ecosystem empowering 10,000+ students with accessible, quality education.', hash: '#project1' },
  { img: '/images/project2.jpg', title: 'Business Management System', desc: 'Integrated enterprise solution driving operational excellence and scalable growth.', hash: '#project2' },
  { img: '/images/project3.jpg', title: 'Mobile Banking App', desc: 'Bank-grade secure platform delivering seamless financial services to underserved communities.', hash: '#project3' },
]

const testimonials = [
  { initials: 'JD', name: 'John Doe', role: 'CEO, Tech Corp', text: 'Sleek Nexus Creative revolutionized our operations with exceptional innovation and technical excellence. Their professionalism and deep understanding of our business objectives set them apart as true strategic partners.' },
  { initials: 'JS', name: 'Jane Smith', role: 'Director, Education Plus', text: 'Exceptional execution from start to finish. They delivered ahead of schedule while surpassing every expectation. Their technical expertise makes them our go-to partner for mission-critical projects.' },
  { initials: 'SL', name: 'Solomon Leek', role: 'Founder, StartUp Hub', text: 'Simply the most capable technology partner we have collaborated with. Their unparalleled expertise and innovative approach consistently deliver transformative results for our organization.' },
]

const whyCards = [
  { icon: 'fa-map-marker-alt', title: 'Locally Based', desc: "We understand South Sudan's unique challenges, infrastructure, and market realities better than any foreign firm." },
  { icon: 'fa-shield-alt', title: 'Secure & Reliable', desc: 'Every product we build follows security best practices with 99.9% uptime and robust backup systems.' },
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

// ─── Newsletter Banner ────────────────────────────────────────────────────────

function NewsletterBanner() {
  return (
    <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] py-14">
      <div className="max-w-[700px] mx-auto px-6 text-center">
        <i className="fas fa-envelope text-primary text-3xl mb-4 block" />
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Don't Miss Out On Exciting Updates</p>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-6">Subscribe to Our Monthly Newsletter</h2>
        <NewsletterForm id="home-newsletter-form" dark={true} />
      </div>
    </div>
  )
}

// ─── Home ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Sleek Nexus Creative - Innovation That Solves Problems</title>
        <meta name="description" content="Helping organizations in South Sudan launch dependable websites, apps, and platforms that scale, perform, and deliver measurable impact." />
        <meta property="og:title" content="Sleek Nexus Creative - Innovation That Solves Problems" />
        <meta property="og:description" content="Helping organizations in South Sudan launch dependable websites, apps, and platforms that scale, perform, and deliver measurable impact." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://SNC.ss/" />
        <meta property="og:image" content="https://SNC.ss/images/hero-tech.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sleek Nexus Creative - Innovation That Solves Problems" />
        <meta name="twitter:image" content="https://SNC.ss/images/hero-tech.png" />
      </Helmet>

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
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }}>
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">Transforming Ideas Into Digital Reality</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
                We Build Digital Products That Work in the <span className="text-accent">Real World</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Sleek Nexus Creative helps organizations in South Sudan launch dependable websites, apps, and platforms that scale, perform, and deliver measurable impact.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/contact" className="btn-primary"><i className="fas fa-rocket" /> Start Your Project</Link>
                <Link to="/projects" className="btn-secondary border-white text-white hover:bg-white hover:text-primary"><i className="fas fa-eye" /> View Our Work</Link>
              </div>
              <div className="flex flex-wrap gap-8">
                {[{ value: '50+', label: 'Projects Delivered' }, { value: '10K+', label: 'Learners Supported' }, { value: '5+', label: 'Years of Excellence' }].map(({ value, label }) => (
                  <div key={label}>
                    <strong className="block text-3xl font-heading font-bold text-white">{value}</strong>
                    <span className="text-gray-400 text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.aside
              variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
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
                    <i className="fas fa-check-circle text-accent mt-0.5" />{item}
                  </li>
                ))}
              </ul>
              <Link to="/services" className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all">
                Explore Our Services <i className="fas fa-arrow-right" />
              </Link>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {counters.map(({ icon, value, suffix, label }) => (
              <div key={label}>
                <i className={`fas ${icon} text-primary text-2xl mb-3 block`} />
                <strong className="block text-4xl font-heading font-black text-dark mb-1">
                  <AnimatedCounter value={value} suffix={suffix} />
                </strong>
                <span className="text-muted text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">What We Do</p>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">From concept to launch, we design systems that solve real operational and community problems.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(({ icon, title, desc, hash }, i) => (
              <motion.div key={title} className="card p-6" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-primary text-lg`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{desc}</p>
                <Link to={`/services${hash}`} className="text-primary text-sm font-semibold hover:underline">Learn More</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Who We Are</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-5 leading-tight">
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
              <img src="/images/about-preview.jpg" alt="Sleek Nexus Creative Team collaborating" className="w-full rounded-xl object-cover h-72" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Our Process</p>
            <h2 className="section-title">How We Work</h2>
            <p className="section-subtitle">A clear, structured process from your first message to a live product.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map(({ num, icon, title, desc }, i) => (
              <motion.div key={num} className="card p-6 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="text-5xl font-heading font-black text-primary/10 mb-3">{num}</div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
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
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Our Work</p>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">Selected case studies with measurable outcomes in education, business, and finance.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {projects.map(({ img, title, desc, hash }, i) => (
              <motion.div key={title} className="card overflow-hidden" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <img src={img} alt={title} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">{desc}</p>
                  <Link to={`/projects${hash}`} className="text-primary text-sm font-semibold hover:underline">View Case Study</Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/projects" className="btn-primary">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Client Stories</p>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">Trusted by businesses, schools, and organizations across South Sudan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(({ initials, name, role, text }, i) => (
              <motion.div key={name} className="card p-6" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
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
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Our Edge</p>
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">We are not just a vendor — we are a long-term technology partner committed to your success.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyCards.map(({ icon, title, desc }, i) => (
              <motion.div key={title} className="card p-6" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-primary text-lg`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-3">
            <i className="fas fa-bolt mr-1" /> Let's Build Together
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Ready to Launch Your Next Digital Product?</h2>
          <p className="text-white/80 text-lg mb-8">Partner with Sleek Nexus Creative to build dependable, scalable technology that delivers real results for your organization.</p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Link to="/contact" className="bg-white text-primary hover:bg-gray-100 font-semibold px-7 py-3 rounded-lg inline-flex items-center gap-2 transition-colors">
              <i className="fas fa-rocket" /> Start Your Project
            </Link>
            <Link to="/services" className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-7 py-3 rounded-lg inline-flex items-center gap-2 transition-colors">
              Explore Services
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
            {['Free Consultation', 'On-Time Delivery', 'Post-Launch Support', 'Transparent Pricing'].map(item => (
              <span key={item} className="flex items-center gap-1.5"><i className="fas fa-check-circle text-white" /> {item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Banner */}
      <NewsletterBanner />
    </>
  )
}
