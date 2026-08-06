import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useAnimationControls } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight, rotateIn, staggerContainer, scaleIn, stackReveal } from '../lib/animations'
import SEO from '../components/ui/SEO'
import { pageSeo } from '../lib/seo-data'
import MagneticButton from '../components/ui/MagneticButton'
import ScrollySteps from '../components/ui/ScrollySteps'
import Hero3DAccent from '../components/ui/Hero3DAccent'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import GlitchText from '../components/ui/GlitchText'
import MarqueeTicker from '../components/ui/MarqueeTicker'
import SpotlightCard from '../components/ui/SpotlightCard'
import KineticHeadline from '../components/ui/KineticHeadline'
// ─── Data ────────────────────────────────────────────────────────────────────

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

  // Float is kicked off imperatively in an effect (post-mount, post-paint) rather
  // than left to the declarative `animate` prop on first render. On a cold load —
  // first visit straight to "/", nothing cached yet — an `animate` prop with
  // `repeat: Infinity` can start before layout has settled and silently never begin;
  // it only kicks in once something (like a route change) forces a fresh mount.
  // Starting it explicitly in useEffect sidesteps that race entirely.
  const floatControls = useAnimationControls()

  useEffect(() => {
    floatControls.start({ y: [0, -10, 0], transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' } })
  }, [floatControls])

  return (
    <>
      <SEO {...pageSeo['/']} />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center bg-white overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(ellipse at 70% 20%, rgba(254,127,45,.08), transparent 55%),
            radial-gradient(ellipse at 10% 90%, rgba(35,61,77,.07), transparent 45%)`,
        }}
      >
        {/* Ambient glow orbs — soft color wash over the white background, parallaxed on scroll */}
        <motion.div style={{ y: orb1Y }} className="absolute top-1/4 right-[8%] w-96 h-96 bg-primary/10 rounded-full blur-[130px] pointer-events-none" />
        <motion.div style={{ y: orb2Y }} className="absolute bottom-0 left-[5%] w-80 h-80 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        {/* Giant background wordmark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-heading text-[22vw] uppercase leading-none text-stroke-1 text-primary/5 whitespace-nowrap">SNC</span>
        </div>
        {/* Dot grid overlay */}
        <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.8 }}>
              <p className="section-label text-accent">Based in Juba, South Sudan</p>
              <h1 className="text-dark mb-5 sm:mb-6 font-heading" style={{ fontWeight: 900, fontSize: 'clamp(2rem, 4.2vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                <KineticHeadline lines={[
                  ['We', 'Build', 'Digital', 'Products'],
                  ['That', 'Work', 'in'],
                  ['the', (
                    <span key="real-world" className="relative inline-block">
                      <span className="text-accent">Real World</span>
                      <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
                    </span>
                  )],
                ]} />
              </h1>
              <p className="text-muted text-base sm:text-lg leading-relaxed mb-7 sm:mb-8">
                Sleek Nexus Creative is a Juba-based studio helping organizations — in South Sudan and beyond — launch dependable websites, apps, and platforms that scale, perform, and deliver measurable impact.
              </p>
              <div className="flex flex-wrap gap-3 mb-8 sm:mb-12">
                <MagneticButton liquid>
                  <Link to="/contact" className="btn-primary">Start Your Project</Link>
                </MagneticButton>
                <MagneticButton liquid>
                  <Link to="/services" className="btn-secondary">View Our Services</Link>
                </MagneticButton>
              </div>
            </motion.div>

            <motion.aside
              variants={fadeRight} initial="hidden" animate="show" transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Abstract 3D wireframe accent — sits furthest back, extending beyond
                  the card's edges as a subtle brand halo. Desktop-only, lazy-loaded,
                  and skipped entirely under prefers-reduced-motion. */}
              <Hero3DAccent className="absolute inset-0 items-center justify-center" />

              {/* Static gradient glow — both layers now still, kept small and subtle
                  so the color wash stays close to the card instead of bleeding out. */}
              <div
                className="absolute -inset-3 rounded-[1.75rem] pointer-events-none blur-md opacity-50"
                style={{ background: 'conic-gradient(from 0deg, #FE7F2D, #FE7F2D, #233D4D, #FE7F2D, #FE7F2D)' }}
              />
              <div
                className="absolute -inset-1 rounded-2xl pointer-events-none opacity-40"
                style={{ background: 'conic-gradient(from 180deg, #FE7F2D, #233D4D, #FE7F2D, #FE7F2D)' }}
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

      {/* ── Marquee ticker ── */}
      <div className="bg-dark py-3 border-y border-white/5">
        <MarqueeTicker
          speed={18}
          items={['Web Development', 'Mobile Apps', 'UI/UX Design', 'E-Learning', 'IT Consulting', 'Branding', 'Innovation Hub'].map(t => (
            <GlitchText key={t} className="text-white font-heading font-black uppercase text-sm tracking-widest">{t}</GlitchText>
          ))}
        />
      </div>

      {/* ── Orbital Stats ── */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {counters.map(({ icon, value, suffix, label }) => (
              <motion.div key={label} variants={scaleIn} className="relative group flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-300">
                  <i className={`fas ${icon} text-primary text-xl`} />
                </div>
                <strong className="block text-3xl sm:text-4xl font-heading font-black text-dark mb-1">
                  <AnimatedCounter value={value} suffix={suffix} />
                </strong>
                <span className="text-muted text-xs sm:text-sm">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Bento Services Grid ── */}
      <section className="py-16 sm:py-24 aurora-bg">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div className="text-center mb-10 sm:mb-14" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">What We Do</p>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">From concept to launch, we design systems that solve real operational and community problems.</p>
          </motion.div>

          {/* Bento asymmetric grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] gap-4">

            {/* Large feature cell — spans 2 cols + 2 rows */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} transition={{duration:0.5}}
              className="bento-cell lg:col-span-2 lg:row-span-2 relative overflow-hidden group cursor-pointer bg-dark">
              <div className="absolute inset-0 bg-primary/15" />
              <div className="absolute inset-0 bg-dots-light opacity-40" />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
              <div className="relative h-full flex flex-col justify-between p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <i className="fas fa-code text-primary text-2xl" />
                </div>
                <div>
                  <h3 className="font-heading text-white text-5xl uppercase leading-none mb-3">Software<br/>Development</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-sm">Custom platforms engineered for speed, reliability, and clear business outcomes.</p>
                  <Link to="/services#software-dev" className="inline-flex items-center gap-2 text-accent font-bold text-sm hover:gap-3 transition-all">
                    Explore <i className="fas fa-arrow-right text-xs" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Small cell 1 */}
            <SpotlightCard variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} transition={{duration:0.5,delay:0.1}}
              className="bento-cell group cursor-pointer" spotlightColor="rgba(254,127,45,0.18)">
              <div className="absolute inset-0 bg-primary/5" />
              <div className="relative h-full flex flex-col justify-between p-6">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <i className="fas fa-mobile-alt text-primary text-lg" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-dark text-xl uppercase leading-tight mb-1">Web &amp; Mobile</h3>
                  <p className="text-muted text-xs leading-relaxed">Responsive products for all devices.</p>
                </div>
              </div>
            </SpotlightCard>

            {/* Small cell 2 */}
            <SpotlightCard variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} transition={{duration:0.5,delay:0.2}}
              className="bento-cell group cursor-pointer bg-primary" spotlightColor="rgba(255,255,255,0.25)">
              <div className="absolute inset-0 bg-grid-light opacity-30" />
              <div className="relative h-full flex flex-col justify-between p-6">
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                  <i className="fas fa-graduation-cap text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-white text-xl uppercase leading-tight mb-1">EdTech</h3>
                  <p className="text-white/70 text-xs leading-relaxed">Digital learning tools that expand access.</p>
                </div>
              </div>
            </SpotlightCard>

            {/* Wide cell — spans 2 cols */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} transition={{duration:0.5,delay:0.3}}
              className="bento-cell sm:col-span-2 lg:col-span-2 relative overflow-hidden group cursor-pointer">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-primary/5" />
              <div className="relative h-full flex items-center gap-8 p-6">
                <div className="w-14 h-14 rounded-2xl bg-dark flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-laptop-code text-accent text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-black text-dark text-2xl uppercase leading-tight mb-1">IT Consulting &amp; Digital Transformation</h3>
                  <p className="text-muted text-sm">Strategy and implementation that de-risks delivery and accelerates growth.</p>
                </div>
                <Link to="/services#consulting" className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center text-primary hover:text-white transition-all group-hover:scale-110">
                  <i className="fas fa-arrow-right" />
                </Link>
              </div>
            </motion.div>

            {/* CTA cell */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} transition={{duration:0.5,delay:0.4}}
              className="bento-cell relative overflow-hidden bg-dark-soft flex items-center justify-center cursor-pointer group">
              <div className="absolute inset-0 bg-dots-light opacity-20" />
              <Link to="/services" className="relative flex flex-col items-center gap-3 text-center p-6">
                <div className="w-12 h-12 rounded-full border-2 border-white/20 group-hover:border-primary flex items-center justify-center transition-colors">
                  <i className="fas fa-plus text-white group-hover:text-primary transition-colors" />
                </div>
                <span className="text-white font-heading font-bold text-sm uppercase tracking-widest">All Services</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Who We Are</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase text-dark mb-5 leading-tight">
                Reliable Technology, Built in Juba
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Headquartered in Juba, South Sudan, we partner with businesses, schools, NGOs, and organizations — locally and internationally — to design practical, scalable digital systems built for real-world conditions.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Our team combines product strategy, engineering, and training to help clients launch faster, operate more efficiently, and sustain long-term digital growth.
              </p>
              <MagneticButton>
                <Link to="/about" className="btn-primary">Learn About Us</Link>
              </MagneticButton>
            </motion.div>
            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.15 }}>
              <img src="/images/about-preview.jpg" alt="Sleek Nexus Creative — Reliable Technology, Built in Juba" className="w-full rounded-xl object-cover" loading="lazy" />
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
              <h2 className="display-heading-sm mb-5">A Real Platform We Built — Live Across South Sudan</h2>
              <p className="text-white/70 leading-relaxed mb-8">
                <strong className="text-white">EduPortal South Sudan</strong> is a full-scale education platform we designed, built, and deployed — helping learners across all 10 states discover schools, apply for scholarships, and track their progress, completely free.
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
                  <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Get in Touch</Link>
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
                <div className="flex items-center gap-2 bg-black px-4 py-3 border-b border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  <span className="ml-3 flex-1 bg-white/5 rounded-md px-3 py-1 text-white/50 text-xs flex items-center gap-1.5 truncate">
                    <i className="fas fa-lock text-[0.6rem]" /> eduportalss.solomonleek.tech
                  </span>
                  <i className="fas fa-arrow-up-right-from-square text-white/30 text-xs group-hover:text-accent transition-colors" />
                </div>
                <div className="relative p-8 sm:p-10 min-h-[320px] flex flex-col items-center justify-center text-center bg-dark-soft">
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
              <motion.div key={name}
                className="relative rounded-xl border border-primary/25"
                style={{ transformPerspective: 800 }}
                variants={stackReveal(i)} initial="hidden" whileInView="show" viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}>
                <div className="bg-white rounded-[10px] p-5 sm:p-6 h-full flex flex-col">
                  <div className="flex gap-1 text-accent mb-4">
                    {Array(5).fill(0).map((_, j) => <i key={j} className="fas fa-star text-sm" />)}
                  </div>
                  <p className="text-muted text-sm leading-relaxed italic mb-5 flex-1">"{text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">{initials}</div>
                    <div>
                      <p className="font-semibold text-dark text-sm">{name}</p>
                      <p className="text-muted text-xs">{role}</p>
                    </div>
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
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Why SNC</p>
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">We're based here, we understand the context, and we stay involved after launch.</p>
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

      {/* ── CTA ── */}
      <section className="relative overflow-hidden">
        {/* Left half — dark, Right half — primary */}
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-dark" />
          <div className="w-1/2 bg-primary" />
        </div>
        {/* Diagonal divider */}
        <div className="absolute inset-0 bg-primary" style={{clipPath:'polygon(45% 0, 100% 0, 100% 100%, 55% 100%)'}} />
        <div className="absolute inset-0 bg-dark" style={{clipPath:'polygon(0 0, 55% 0, 45% 100%, 0 100%)'}} />
        {/* Noise + glow */}
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-[20%] w-72 h-72 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-[20%] w-72 h-72 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — dark side */}
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{once:true}} className="text-white">
              <p className="inline-flex items-center gap-2 text-primary text-sm font-black uppercase tracking-widest mb-6">
                <span className="w-6 h-px bg-primary" /> Work With Us
              </p>
              <h2
                className="font-heading uppercase leading-[0.9] mb-6"
                style={{
                  fontSize: 'clamp(4rem,9vw,8rem)',
                  fontWeight: 800,
                  textShadow: '4px 4px 0px rgba(254,127,45,0.35), 8px 8px 0px rgba(254,127,45,0.15)',
                }}
              >
                <span className="block text-white">Have a</span>
                <span
                  className="block"
                  style={{
                    fontSize: 'clamp(3rem, 7vw, 6rem)',
                    WebkitTextStroke: '2px #FE7F2D',
                    color: 'transparent',
                    textShadow: '4px 4px 0px rgba(254,127,45,0.25), 8px 8px 0px rgba(0,0,0,0.4)',
                  }}
                >Project?</span>
              </h2>
              <p className="text-white/70 text-base sm:text-lg mb-8 max-w-sm">Tell us what you need. We'll assess it honestly, scope it clearly, and build it right.</p>
              <MagneticButton>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-dark hover:bg-gray-100 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-xl">
                  Get in Touch <i className="fas fa-arrow-right" />
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Right — primary side */}
            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{once:true}} className="text-white flex flex-col items-center">
              <p className="text-white/70 text-sm font-black uppercase tracking-widest mb-5 text-center">What's Included</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: 'fa-comments',      label: 'Free initial consultation' },
                  { icon: 'fa-file-alt',       label: 'Honest project scoping' },
                  { icon: 'fa-clock',          label: 'On-time delivery' },
                  { icon: 'fa-headset',        label: 'Post-launch support' },
                  { icon: 'fa-graduation-cap', label: 'Staff training included' },
                  { icon: 'fa-tag',            label: 'Transparent pricing' },
                ].map(({ icon, label }, i) => (
                  <motion.div key={label}
                    initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay: i * 0.07, duration: 0.5}}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 hover:border-white/30 rounded-xl px-4 py-3 transition-all duration-200 group">
                    <div className="w-8 h-8 rounded-lg bg-white/20 group-hover:bg-white/30 flex items-center justify-center flex-shrink-0 transition-colors">
                      <i className={`fas ${icon} text-white text-xs`} />
                    </div>
                    <span className="text-white font-medium text-sm">{label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}
