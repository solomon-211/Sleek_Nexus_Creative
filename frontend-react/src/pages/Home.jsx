import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useAnimationControls } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight, rotateIn, staggerContainer, staggerItem, scaleIn, revealUp, stackReveal } from '../lib/animations'
import SEO from '../components/ui/SEO'
import { pageSeo } from '../lib/seo-data'
import TiltCard from '../components/ui/TiltCard'
import MagneticButton from '../components/ui/MagneticButton'
import ScrollySteps from '../components/ui/ScrollySteps'
import Hero3DAccent from '../components/ui/Hero3DAccent'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import FlipCard from '../components/ui/FlipCard'

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

const EDUPORTAL_URL = 'https://eduportalss.solomonleek.tech'

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

// ─── Home ─────────────────────────────────────────────────────────────────────

export default function Home() {
  // Parallax: the background glow orbs drift at a fraction of scroll speed while the
  // hero content scrolls at normal speed — the classic "background slower than
  // foreground" parallax effect, scoped to the hero section only.
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -80])

  // "What You Get" card's rotating ring — pauses and squares itself up on hover.
  const [ringHovered, setRingHovered] = useState(false)

  // Ring + float are kicked off imperatively in an effect (post-mount, post-paint)
  // rather than left to the declarative `animate` prop on first render. On a cold
  // load — first visit straight to "/", nothing cached yet — an `animate` prop with
  // `repeat: Infinity` can start before layout has settled and silently never begin;
  // it only kicks in once something (like a route change) forces a fresh mount.
  // Starting it explicitly in useEffect sidesteps that race entirely.
  const ringControls = useAnimationControls()
  const floatControls = useAnimationControls()

  useEffect(() => {
    floatControls.start({ y: [0, -10, 0], transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' } })
  }, [floatControls])

  useEffect(() => {
    if (ringHovered) {
      ringControls.start({ rotate: 0, transition: { duration: 0.5, ease: 'easeOut' } })
    } else {
      ringControls.start({ rotate: 360, transition: { duration: 10, repeat: Infinity, ease: 'linear' } })
    }
  }, [ringHovered, ringControls])

  return (
    <>
      <SEO {...pageSeo['/']} />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center bg-white overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(ellipse at 70% 20%, rgba(254,127,45,.08), transparent 55%),
            radial-gradient(ellipse at 10% 90%, rgba(254,153,87,.07), transparent 45%)`,
        }}
      >
        {/* Ambient glow orbs — soft color wash over the white background, parallaxed on scroll */}
        <motion.div style={{ y: orb1Y }} className="absolute top-1/4 right-[8%] w-96 h-96 bg-primary/10 rounded-full blur-[130px] pointer-events-none" />
        <motion.div style={{ y: orb2Y }} className="absolute bottom-0 left-[5%] w-80 h-80 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.8 }}>
              <p className="section-label text-accent">Transforming Ideas Into Digital Reality</p>
              <h1 className="text-dark mb-5 sm:mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4.2vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                <span className="block">We Build Digital Products</span>
                <span className="block">That Work in</span>
                <span className="block">the{' '}
                  <span className="text-accent">Real World</span>
                </span>
              </h1>
              <p className="text-muted text-base sm:text-lg leading-relaxed mb-7 sm:mb-8">
                Sleek Nexus Creative helps organizations in South Sudan launch dependable websites, apps, and platforms that scale, perform, and deliver measurable impact.
              </p>
              <div className="flex flex-wrap gap-3 mb-8 sm:mb-12">
                <MagneticButton>
                  <Link to="/contact" className="btn-primary">Start Your Project</Link>
                </MagneticButton>
                <MagneticButton>
                  <Link to="/projects" className="btn-secondary">View Our Work</Link>
                </MagneticButton>
              </div>
              <div className="flex flex-wrap gap-6 sm:gap-8">
                {[{ value: '10+', label: 'Projects Delivered' }, { value: '50+', label: 'Learners Supported' }, { value: '1+', label: 'Years of Excellence' }].map(({ value, label }) => (
                  <div key={label}>
                    <strong className="block text-2xl sm:text-3xl font-heading font-bold text-dark">{value}</strong>
                    <span className="text-muted text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.aside
              variants={fadeRight} initial="hidden" animate="show" transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
              onMouseEnter={() => setRingHovered(true)}
              onMouseLeave={() => setRingHovered(false)}
            >
              {/* Abstract 3D wireframe accent — sits furthest back, extending beyond
                  the card's edges as a subtle brand halo. Desktop-only, lazy-loaded,
                  and skipped entirely under prefers-reduced-motion. */}
              <Hero3DAccent className="absolute inset-0 items-center justify-center" />

              {/* Rotating yellow ring — sits behind the card, offset outward, so its
                  corners sweep past the card's edges as it spins. Hovering the card
                  stops the spin and squares the ring back up flush with the card. */}
              <motion.div
                className="absolute -inset-4 rounded-2xl border-[3px] border-yellow-400 pointer-events-none"
                initial={{ rotate: 0 }}
                animate={ringControls}
              />

              {/* Continuous idle float once the card has entered — a small "alive" touch */}
              <motion.div
                initial={{ y: 0 }}
                animate={floatControls}
                className="relative bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
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
                    <li key={item} className="flex items-start gap-3 text-dark-soft text-sm">
                      <i className="fas fa-check-circle text-accent mt-0.5 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
                <Link to="/services" className="inline-flex items-center gap-2 text-accent font-semibold text-sm">
                  Explore Our Services <i className="fas fa-arrow-right" />
                </Link>
              </motion.div>
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
              <FlipCard
                key={title}
                className="h-56 sm:h-60"
                variants={staggerItem}
                front={
                  <div className="card p-5 sm:p-6 h-full flex flex-col items-center justify-center text-center cursor-pointer">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <i className={`fas ${icon} text-primary text-lg`} />
                    </div>
                    <h3 className="font-heading font-bold text-dark text-xl sm:text-2xl leading-snug">{title}</h3>
                  </div>
                }
                back={
                  <div className="card p-5 sm:p-6 h-full flex flex-col justify-center bg-dark text-white cursor-pointer">
                    <h3 className="font-heading font-bold mb-2">{title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{desc}</p>
                    <Link to={`/services${hash}`} className="text-accent text-sm font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>
                      Learn More <i className="fas fa-arrow-right text-xs" />
                    </Link>
                  </div>
                }
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
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
              <MagneticButton>
                <Link to="/about" className="btn-primary">Learn About Us</Link>
              </MagneticButton>
            </motion.div>
            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.15 }}>
              <img src="/images/about-preview.jpg" alt="Sleek Nexus Creative — Building Reliable Technology for South Sudan" className="w-full rounded-xl object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Work — pinned scrollytelling */}
      <ScrollySteps
        eyebrow="Our Process"
        heading="How We Work"
        subheading="A clear, structured process from your first message to a live product."
        steps={processSteps}
      />

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
            transition={{ staggerChildren: 0.18, delayChildren: 0.15 }}
          >
            {projects.map(({ img, title, desc, hash }) => (
              <TiltCard key={title} className="card overflow-hidden group" variants={revealUp}>
                <div className="relative overflow-hidden h-44 sm:h-48">
                  <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 text-white text-xs font-bold uppercase tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      View Case Study <i className="fas fa-arrow-right text-[0.65rem]" />
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">{desc}</p>
                  <Link to={`/projects${hash}`} className="text-primary text-sm font-semibold hover:underline">View Case Study</Link>
                </div>
              </TiltCard>
            ))}
          </motion.div>
          <div className="text-center">
            <MagneticButton>
              <Link to="/projects" className="btn-primary">View All Projects</Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Live Product Spotlight — EduPortal South Sudan */}
      <section className="relative overflow-hidden bg-noise py-16 sm:py-24 bg-dark text-white">
        <div className="absolute top-0 left-[10%] w-80 h-80 bg-primary/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-[8%] w-72 h-72 bg-accent/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5 mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Live Product</span>
              </span>
              <h2 className="display-heading-sm mb-5">Not Just a Case Study — A Real Platform, Live Today</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                <strong className="text-white">EduPortal South Sudan</strong> is a full-scale education platform we designed, built, and deployed — helping learners across all 10 states of South Sudan discover schools, apply for scholarships, and track their progress, completely free.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                It's in production right now, serving real users. This is the kind of dependable, real-world system we build for every client — see it for yourself.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                {[{ icon: 'fa-map-marker-alt', label: '10 States Covered' }, { icon: 'fa-hand-holding-heart', label: 'Free — Always' }, { icon: 'fa-signal', label: 'Live In Production' }].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-white/70">
                    <i className={`fas ${icon} text-accent`} /> {label}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <MagneticButton>
                  <a href={EDUPORTAL_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                    Visit EduPortal Live <i className="fas fa-arrow-up-right-from-square text-sm" />
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <Link to="/projects" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">View All Projects</Link>
                </MagneticButton>
              </div>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.15 }}>
              {/* Browser-chrome mockup — X-Frame-Options on the live site blocks a real
                  iframe embed, so this is a styled preview frame linking out instead. */}
              <a
                href={EDUPORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(254,127,45,0.25)] transition-all duration-500"
              >
                <div className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-3 border-b border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  <span className="ml-3 flex-1 bg-white/5 rounded-md px-3 py-1 text-white/50 text-xs flex items-center gap-1.5 truncate">
                    <i className="fas fa-lock text-[0.6rem]" /> eduportalss.solomonleek.tech
                  </span>
                  <i className="fas fa-arrow-up-right-from-square text-white/30 text-xs group-hover:text-accent transition-colors" />
                </div>
                <div
                  className="relative p-8 sm:p-10 min-h-[320px] flex flex-col items-center justify-center text-center"
                  style={{ backgroundImage: 'linear-gradient(135deg, #233D4D 0%, #000000 100%)' }}
                >
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, #FE7F2D, transparent 45%), radial-gradient(circle at 80% 80%, #FE9957, transparent 40%)' }} />
                  <div className="relative w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-5">
                    <i className="fas fa-graduation-cap text-accent text-2xl" />
                  </div>
                  <p className="relative font-heading font-black text-white text-2xl sm:text-3xl uppercase tracking-tight mb-2">EduPortal South Sudan</p>
                  <p className="relative text-white/60 text-sm mb-6">Empowering every learner across South Sudan</p>
                  <div className="relative flex flex-wrap justify-center gap-2">
                    {['School Discovery', 'Scholarships', 'Progress Tracking'].map(chip => (
                      <span key={chip} className="text-xs font-semibold text-white/80 bg-white/10 border border-white/15 rounded-full px-3 py-1">{chip}</span>
                    ))}
                  </div>
                </div>
              </a>
            </motion.div>
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
              <motion.div key={name} className="card p-5 sm:p-6" style={{ transformPerspective: 800 }} variants={stackReveal(i)} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}>
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
              <motion.div key={title} className="card p-5 sm:p-6" variants={rotateIn}>
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
      <section className="relative overflow-hidden bg-noise py-16 sm:py-20 bg-primary text-white text-center">
        <div className="absolute -top-10 right-[10%] w-72 h-72 bg-accent/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <p className="section-label text-white/70">Work With Us</p>
          <h2 className="display-heading-sm mb-4">Have a Project in Mind?</h2>
          <p className="text-white/80 text-base sm:text-lg mb-7 sm:mb-8">Tell us what you need. We will assess it honestly, scope it clearly, and build it right.</p>
          <div className="flex flex-wrap gap-3 justify-center mb-6 sm:mb-8">
            <MagneticButton>
              <Link to="/contact" className="bg-white text-primary hover:bg-gray-100 font-semibold px-6 sm:px-7 py-3 rounded-lg inline-flex items-center gap-2 transition-colors touch-manipulation">
                Get in Touch
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/services" className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-6 sm:px-7 py-3 rounded-lg inline-flex items-center gap-2 transition-colors touch-manipulation">
                Our Services
              </Link>
            </MagneticButton>
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
