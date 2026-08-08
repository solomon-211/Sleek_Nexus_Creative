// Team section disabled — useState/useRef/useIntersectionObserver were only used by the commented-out team marquee below.
// import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, staggerItem, revealUp } from '../lib/animations'
// import { useIntersectionObserver } from '../hooks'
import SEO from '../components/ui/SEO'
import { pageSeo } from '../lib/seo-data'
import MagneticButton from '../components/ui/MagneticButton'

// Outer cards slide in first, like photos sliding into a frame; the middle
// card pops in afterward, once both side cards have settled.
const slideInLeft = {
  hidden: { opacity: 0, x: -140, rotate: -5 },
  show: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}
const slideInRight = {
  hidden: { opacity: 0, x: 140, rotate: 5 },
  show: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}
const popInMiddle = {
  hidden: { opacity: 0, scale: 0.75, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut', delay: 0.6 } },
}
const nameMeaningVariants = [slideInLeft, popInMiddle, slideInRight]

const nameMeaning = [
  { letter: 'S', word: 'Sleek', value: 'Excellence', desc: "Excellence is not an aspiration — it is our standard. We design with purpose, engineer with precision, and deliver solutions built to last. In a world where \"good enough\" is often accepted, we choose to build technology that earns trust." },
  { letter: 'N', word: 'Nexus', value: 'Ecosystem', desc: "No single organization builds a country's digital future alone. We connect businesses with practical solutions, schools with tools built for their reality, and young innovators with the mentorship to build meaningful careers at home." },
  { letter: 'C', word: 'Creative', value: 'Transformation', desc: "We believe transformation means turning ideas into innovation, challenges into opportunities, and potential into measurable impact — empowering people and communities to shape a stronger, digitally independent South Sudan." },
]

const timeline = [
  { year: '2024', color: 'bg-primary', border: 'border-t-primary', title: 'Founded in Juba', desc: 'Officially registered in South Sudan. First team of 4 co-founders begins operations from a co-working space in Juba. Delivered first client projects and launched the initial training cohort.' },
  { year: '2025', color: 'bg-accent', border: 'border-t-accent', title: 'Growing & Delivering', desc: 'Delivering digital projects for businesses, schools, and NGOs across Juba. Launched the SNC Academy with practical courses in web development, mobile apps, UI/UX, and digital marketing.' },
]

const values = [
  { icon: 'fa-award',        title: 'Excellence',      desc: 'Every line of code, every pixel, every interaction reflects our commitment to work that exceeds expectations.' },
  { icon: 'fa-balance-scale',title: 'Integrity',       desc: 'Transparent pricing, honest timelines, and ethical conduct are non-negotiable in every client relationship.' },
  { icon: 'fa-users',        title: 'Inclusion',       desc: 'We design for accessibility, build for low-bandwidth environments, and create opportunities for underserved communities.' },
  { icon: 'fa-lightbulb',    title: 'Innovation',      desc: 'We bring global best practices to South Sudan and create locally relevant solutions that challenge the status quo.' },
  { icon: 'fa-globe-africa', title: 'Local Impact',    desc: "We measure success by the jobs created, skills transferred, and communities transformed. South Sudan's growth is our growth." },
  { icon: 'fa-chart-line',   title: 'Growth Mindset',  desc: 'We invest continuously in our team, embrace new technologies, and treat every challenge as a chance to improve.' },
]

// Team members hidden from public site — data kept for future re-enabling.
/*
const team = [
  { name: 'Solomon Leek',    role: 'CEO & Founder',   bio: 'Founder of SNC with a background in software engineering and a passion for building practical digital solutions for South Sudan.', img: '/images/Solomon-leek.png', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/solomon-leek' }] },
  { name: 'Gideon Erioluwa', role: 'CTO',             bio: 'Leads technical architecture and development. Experienced in building web and mobile systems with a focus on reliability and performance.', img: '/images/team-member2.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/gideon-erioluwa' }] },
  { name: 'Genesis Goch',    role: 'Lead Developer',  bio: 'Full-stack developer specializing in React and Node.js, focused on writing clean, maintainable code that solves real problems.', img: '/images/team-member3.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/genesis-goch' }] },
  { name: 'Philip Bior',     role: 'UX/UI Designer',  bio: 'Designs user interfaces and experiences for SNC client products, with a focus on simplicity and usability in low-bandwidth environments.', img: '/images/team-member4.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/philip-bior' }] },
]
*/

const stats = [
  { value: '10+', label: 'Projects Delivered' },
  { value: '50+', label: 'Learners Supported' },
  { value: '5+',  label: 'Partner Organizations' },
  { value: '1+',  label: 'Years Operating' },
]

// ─── Team Marquee (disabled — not rendered publicly) ─────────────────────────
// Continuous, seamless, infinite horizontal scroll. The team array is rendered
// twice back-to-back so the CSS animation loops invisibly. Pressing any card
// pauses the whole strip — and every card settles into a clean, level resting
// pose (tilt straightens out, float stops, a slight lift) instead of freezing
// wherever it happened to be mid-bob. Pressing again resumes the drift.
/*
function TeamCard({ member, i, paused, setPaused, containerRef }) {
  const { name, role, bio, img, socials } = member
  const { ref, isIntersecting } = useIntersectionObserver({ root: containerRef, threshold: 0.2 })
  const tilt = i % 2 === 0 ? -4 : 4

  return (
    <motion.div
      ref={ref}
      onClick={() => setPaused(p => !p)}
      role="button"
      tabIndex={0}
      aria-pressed={paused}
      aria-label={`${paused ? 'Resume' : 'Pause'} team gallery`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPaused(p => !p) } }}
      className="card overflow-hidden w-64 flex-shrink-0 cursor-pointer relative group shadow-[0_10px_15px_-3px_rgba(0,0,0,0.15),0_20px_35px_-8px_rgba(0,0,0,0.2),0_0_45px_-8px_rgba(254,127,45,0.3)]"
      style={{ transformPerspective: 1000 }}
      animate={{
        rotate: paused ? 0 : tilt,
        y: paused ? -4 : [0, -8, 0],
        scale: !isIntersecting ? 0.85 : paused ? 1.04 : 1,
        opacity: isIntersecting ? 1 : 0.35,
        filter: isIntersecting ? 'blur(0px)' : 'blur(6px)',
      }}
      transition={{
        rotate: { duration: 0.4, ease: 'easeOut' },
        y: paused ? { duration: 0.4, ease: 'easeOut' } : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
        scale: { duration: 0.4, ease: 'easeOut' },
        opacity: { duration: 0.7, ease: 'easeOut' },
        filter: { duration: 0.7, ease: 'easeOut' },
      }}
    >
      <div className="relative">
        <img src={img} alt={name} className="w-full h-52 object-cover" loading="lazy" />
        <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-dark/60 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <i className={`fas ${paused ? 'fa-play' : 'fa-pause'} text-[0.6rem]`} />
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-heading font-bold text-dark">{name}</h3>
        <p className="text-primary text-xs font-semibold mb-2">{role}</p>
        <p className="text-muted text-xs leading-relaxed mb-4">{bio}</p>
        <div className="flex gap-3">
          {socials.map(({ icon, href }) => (
            <a key={icon} href={href} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted hover:text-primary transition-colors" aria-label={icon.replace('fa-', '')}>
              <i className={`fab ${icon}`} />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function TeamMarquee({ team }) {
  const [paused, setPaused] = useState(false)
  const containerRef = useRef(null)
  const loop = [...team, ...team]

  return (
    <div ref={containerRef} className="overflow-hidden py-6">
      <div
        className="flex gap-8 w-max animate-marquee"
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
      >
        {loop.map((member, i) => (
          <TeamCard key={`${member.name}-${i}`} member={member} i={i} paused={paused} setPaused={setPaused} containerRef={containerRef} />
        ))}
      </div>
    </div>
  )
}
*/

export default function About() {
  return (
    <>
      <SEO {...pageSeo['/about']} />

      {/* Header */}
      <section className="relative overflow-hidden bg-noise text-white py-16 sm:py-24 text-center" style={{background:'linear-gradient(160deg,#233D4D 0%,#000000 60%)'}}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.8 }}>
            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-3">Who We Are</p>
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase mb-6">About SNC</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Sleek Nexus Creative is a startup technology and innovation firm based in Juba, South Sudan, building digital solutions that work in real-world applications — for businesses, schools, NGOs, and public institutions in South Sudan and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What SNC Stands For */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Our Name</p>
            <h2 className="section-title">What SNC Stands For</h2>
            <p className="section-subtitle">Three words, three commitments — the identity behind every product we build.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {nameMeaning.map(({ letter, word, value, desc }, i) => (
              <motion.div
                key={letter} className="card p-7 text-center"
                variants={nameMeaningVariants[i]} initial="hidden" whileInView="show" viewport={{ once: true }}
              >
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary font-heading font-black text-2xl mb-5">
                  {letter}
                </span>
                <h3 className="font-heading font-bold text-dark text-lg mb-1">{word}</h3>
                <p className="text-accent text-xs font-bold uppercase tracking-widest mb-4">{value}</p>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div className="bg-primary text-white rounded-2xl p-10"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.75 }}>
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                <i className="fas fa-bullseye text-white text-xl" />
              </div>
              <h2 className="text-xl font-heading font-bold mb-3">Our Mission</h2>
              <p className="opacity-90 leading-relaxed">To empower individuals, institutions, and communities — across South Sudan and beyond — by creating practical digital solutions, nurturing the next generation of technology leaders, and driving creative innovation that solves real problems and creates lasting opportunity.</p>
            </motion.div>
            <motion.div className="bg-dark text-white rounded-2xl p-10 border border-white/10"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.15 }}>
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                <i className="fas fa-eye text-accent text-xl" />
              </div>
              <h2 className="text-xl font-heading font-bold mb-3">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed">To prove that world-class technology can be built from Juba — where local talent creates products that compete globally, schools and institutions run on systems built by people who understand their reality, and "Built in South Sudan" becomes a mark of excellence recognized far beyond our borders.</p>
            </motion.div>
          </div>

          {/* Our Story */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.75 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Our Story</p>
              <h2 className="text-3xl md:text-5xl font-heading font-black uppercase text-dark mb-6">Born in Juba, Built for Anywhere</h2>
              <p className="text-muted leading-relaxed mb-4">In 2024, a group of young South Sudanese technologists gathered with one shared frustration: brilliant talent in South Sudan was going unrecognized, unequipped, and underserved by the digital economy.</p>
              <p className="text-muted leading-relaxed mb-4">Organizations across Juba needed websites, apps, and digital systems — but had nowhere local to turn for quality, affordable, context-aware solutions.</p>
              <p className="text-muted leading-relaxed">We started with two laptops, one co-working space, and an unshakeable belief that <strong className="text-primary">Africa's youngest nation deserved the best technology.</strong></p>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.25 }}>
              <img src="/images/company-story.jpg" alt="Sleek Nexus Creative founding story" className="rounded-2xl shadow-xl w-full h-[400px] object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Our Journey</p>
            <h2 className="section-title">Where We've Been</h2>
            <p className="section-subtitle">Every milestone represents a commitment kept to the people of South Sudan.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {timeline.map(({ year, color, border, title, desc }, i) => (
              <motion.div
                key={year}
                className="relative"
                variants={revealUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
              >
                <div className={`card h-full p-7 sm:p-8 relative overflow-hidden border-t-4 ${border}`}>
                  <span className="absolute -top-3 -right-2 text-8xl font-heading font-black text-primary/[0.06] leading-none select-none pointer-events-none">
                    {year}
                  </span>
                  <span className={`relative inline-block text-xs font-black tracking-wide px-3 py-1.5 rounded-full text-white mb-4 ${color}`}>
                    {year}
                  </span>
                  <h3 className="relative font-heading font-bold text-dark text-xl mb-2">{title}</h3>
                  <p className="relative text-muted text-sm leading-relaxed">{desc}</p>
                </div>

                {/* Connector to the next milestone */}
                {i < timeline.length - 1 && (
                  <div className="hidden sm:flex absolute top-1/2 -right-4 md:-right-5 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center">
                    <i className="fas fa-arrow-right text-primary text-xs" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-noise py-12 sm:py-16 bg-primary text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-4xl font-heading font-black mb-1">{value}</div>
                <div className="text-white/80 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">What We Stand For</p>
            <h2 className="section-title">Core Values</h2>
            <p className="section-subtitle">Six principles that shape every project, every hire, and every line of code we write.</p>
          </div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {values.map(({ icon, title, desc }) => (
              <motion.div key={title} className="card p-6" variants={staggerItem}>
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-primary`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team — hidden from public site, kept commented out for future re-enabling
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">The People Behind the Work</p>
            <h2 className="section-title">Our Team</h2>
            <p className="section-subtitle">The people driving technology and impact across South Sudan.</p>
          </div>
          <TeamMarquee team={team} />
        </div>
      </section>
      */}

      {/* CTA */}
      <section className="relative overflow-hidden bg-noise py-14 sm:py-20 bg-dark text-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2
            className="font-heading uppercase leading-[0.9] mb-4"
            style={{ fontSize: 'clamp(3rem,6.5vw,4.5rem)', fontWeight: 800, textShadow: '3px 3px 0px rgba(254,127,45,0.35), 6px 6px 0px rgba(254,127,45,0.15)' }}
          >
            <span className="block text-white">Work</span>
            <span
              className="block"
              style={{ fontSize: 'clamp(2.75rem,6vw,4rem)', WebkitTextStroke: '2px #FE7F2D', color: 'transparent', textShadow: '3px 3px 0px rgba(254,127,45,0.25), 6px 6px 0px rgba(0,0,0,0.4)' }}
            >
              With Us
            </span>
          </h2>
          <p className="text-gray-300 mb-8">Whether you need a digital solution or want to build your tech skills, we're your partner in growth.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <MagneticButton>
              <Link to="/contact" className="btn-primary">Get in Touch</Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/services" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Our Services</Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  )
}
