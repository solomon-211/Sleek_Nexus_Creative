import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import { pageSeo } from '../lib/seo-data'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../lib/animations'
import MagneticButton from '../components/ui/MagneticButton'
import FaqAccordion from '../components/ui/FaqAccordion'
import FlipCard from '../components/ui/FlipCard'
import GlobeAccent from '../components/ui/GlobeAccent'

// ── SDGs SNC directly addresses ──────────────────────────────────────────────
const sdgs = [
  {
    num: 4,
    color: '#000000',
    icon: 'fa-graduation-cap',
    title: 'Quality Education',
    desc: 'Building digital learning platforms, e-learning tools, and tech-enabled education systems that expand access to quality education across South Sudan.',
  },
  {
    num: 8,
    color: '#233D4D',
    icon: 'fa-briefcase',
    title: 'Decent Work & Economic Growth',
    desc: 'Creating digital jobs, empowering entrepreneurs with software tools, and driving economic growth through technology services and startup support.',
  },
  {
    num: 9,
    color: '#000000',
    icon: 'fa-industry',
    title: 'Industry, Innovation & Infrastructure',
    desc: 'Delivering scalable software, cloud infrastructure, and digital transformation solutions that modernise industries and build resilient digital infrastructure.',
  },
  {
    num: 10,
    color: '#233D4D',
    icon: 'fa-balance-scale',
    title: 'Reduced Inequalities',
    desc: 'Bridging the digital divide by making technology accessible to underserved communities, women, and youth across South Sudan and Africa.',
  },
  {
    num: 17,
    color: '#233D4D',
    icon: 'fa-handshake',
    title: 'Partnerships for the Goals',
    desc: 'Forging strategic alliances with governments, NGOs, tech companies, and international organisations to co-create digital solutions for sustainable development.',
  },
  {
    num: 3,
    color: '#FE7F2D',
    icon: 'fa-heart-pulse',
    title: 'Good Health & Well-Being',
    desc: 'Building health connectivity platforms like HealthHub Bridge — connecting patients and providers for appointment booking, health records, and remote consultations.',
  },
]

// ── Core technology focus areas ───────────────────────────────────────────────
const focusAreas = [
  {
    icon: 'fa-laptop-code',
    color: 'from-primary to-primary-dark',
    title: 'Custom Software Development',
    desc: 'End-to-end development of web applications, mobile apps, SaaS platforms, and enterprise systems built to solve real business problems.',
    features: ['Web & mobile applications', 'SaaS product development', 'API design & integration', 'Cloud-native architecture'],
  },
  {
    icon: 'fa-pencil-ruler',
    color: 'from-accent to-accent-dark',
    title: 'UI/UX & Digital Design',
    desc: 'Human-centred design that turns complex problems into intuitive, beautiful digital experiences — from wireframes to production-ready interfaces.',
    features: ['User research & prototyping', 'Interface & interaction design', 'Design systems & branding', 'Accessibility-first approach'],
  },
  {
    icon: 'fa-cloud',
    color: 'from-dark-soft to-dark',
    title: 'Cloud & Infrastructure',
    desc: 'Scalable, secure cloud infrastructure and DevOps pipelines that keep your digital products fast, reliable, and ready to grow.',
    features: ['Cloud deployment & migration', 'DevOps & CI/CD pipelines', 'Cybersecurity assessments', 'Performance optimisation'],
  },
  {
    icon: 'fa-lightbulb',
    color: 'from-primary to-accent',
    title: 'Innovation & Consulting',
    desc: 'Strategic technology consulting and innovation lab programs that help organisations identify opportunities, validate ideas, and build digital solutions.',
    features: ['Digital transformation strategy', 'Technology audits & roadmaps', 'Startup incubation & prototyping', 'Innovation workshops & sprints'],
  },
]

// ── Innovation in action — real, live proof points, not just projections ──────
const flagshipProjects = [
  {
    badge: 'Live Now',
    icon: 'fa-graduation-cap',
    title: 'EduPortal South Sudan',
    desc: 'A live education platform helping learners across all 10 states discover schools, apply for scholarships, and track their progress — completely free.',
    cta: 'Visit EduPortal Live',
    href: 'https://eduportalss.solomonleek.tech',
    external: true,
  },
  {
    badge: 'Featured Project',
    icon: 'fa-heart-pulse',
    title: 'HealthHub Bridge',
    desc: 'A health connectivity platform bridging patients and healthcare providers — enabling appointment booking, health records, and remote consultations.',
    cta: 'Ask About This Project',
    to: '/contact',
  },
]

// ── Ways to get involved — the Hub serves more than just clients ──────────────
const engagementPaths = [
  {
    icon: 'fa-building',
    title: 'For Organizations',
    desc: 'Need custom software, a mobile app, or a digital transformation partner? Every SNC engagement starts here.',
    cta: 'Start a Project',
    to: '/get-started',
  },
  {
    icon: 'fa-rocket',
    title: 'For Startups & Innovators',
    desc: 'Looking for prototyping support or a place to build? Our Innovation Lab launches in Phase II — reach out early to join the first cohort.',
    cta: 'Get in Touch',
    to: '/contact',
  },
  {
    icon: 'fa-handshake',
    title: 'For Partners & Investors',
    desc: 'Governments, NGOs, and organizations looking to co-create digital impact across South Sudan and Africa.',
    cta: 'Explore Partnership',
    to: '/contact',
  },
  {
    icon: 'fa-graduation-cap',
    title: 'For Students & Researchers',
    desc: 'Interested in research collaboration, mentorship, or early career opportunities in technology?',
    cta: 'Reach Out',
    to: '/contact',
  },
]

// ── Vision pillars — what the vision statement actually rests on ──────────────
const visionPillars = [
  {
    icon: 'fa-map-marker-alt',
    title: 'Built Here, Built to Scale',
    desc: "Every product is engineered against South Sudan's real conditions — low bandwidth, limited devices, real infrastructure gaps. That discipline doesn't disappear once a client is based outside the country.",
  },
  {
    icon: 'fa-check-double',
    title: 'Proof, Not Promises',
    desc: "EduPortal and HealthHub Bridge aren't concepts on a roadmap slide — they're live, serving real people today. A vision only means something once it ships.",
  },
  {
    icon: 'fa-people-group',
    title: 'A Hub, Not Just a Company',
    desc: "Organizations, startups, students, and partners all have a place here — a digital future this size can't be built by one team alone.",
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function InnovationHub() {
  return (
    <>
      <SEO {...pageSeo['/innovation-hub']} />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-28 w-full">
          <div className="max-w-4xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.85 }}>
              <span className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-6 bg-accent/10 border border-accent/25 px-4 py-2 rounded-full">
                SNC Innovation Hub
              </span>
              <h1 className="text-dark font-heading font-black uppercase leading-[0.95] mb-6"
                style={{ fontSize: 'clamp(2.25rem,5.5vw,4.25rem)', letterSpacing: '-0.02em' }}>
                <span className="text-dark">Technology &amp; Innovation</span><br />
                <span className="text-accent">Hub</span>
              </h1>
              <p className="text-muted text-lg leading-relaxed mb-4 max-w-2xl">
                Headquartered in Juba, South Sudan — building digital products, delivering software solutions, and driving transformation for organizations at home and abroad, aligned with the UN Sustainable Development Goals.
              </p>
              <p className="text-accent font-semibold mb-8">
                <i className="fas fa-globe-africa mr-2" />
                SDG-aligned · Juba-Based · Serving Clients Worldwide
              </p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton>
                  <Link to="/get-started" className="btn-primary text-base px-8 py-3.5">
                    Start a Project
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <a href="#focus" className="inline-flex items-center gap-2 border-2 border-primary/30 text-primary hover:border-primary font-semibold px-8 py-3.5 rounded-lg transition-all">
                    Explore the Hub
                  </a>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VISION STATEMENT ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-noise bg-dark text-white py-24">
        <div className="absolute top-0 right-[10%] w-80 h-80 bg-primary/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-6">Our Vision</p>
            <h2 className="font-heading font-black uppercase leading-[1.05] mb-8" style={{ fontSize: 'clamp(1.75rem,4vw,3rem)', letterSpacing: '-0.02em' }}>
              Built in Juba. Built for Anywhere.
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
              Sleek Nexus Creative is headquartered in Juba, South Sudan — and that's where our engineering discipline comes from: building for real bandwidth constraints, real device limitations, and real infrastructure gaps. But our work isn't limited to South Sudan. We design and ship digital products for organizations across the region and internationally, bringing that same reliability-first standard to every client, wherever they're based.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-3 gap-6 mt-16 text-left"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {visionPillars.map(({ icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-accent`} />
                </div>
                <h3 className="font-heading font-bold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SDGs SECTION ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Global Alignment</p>
            <h2 className="section-title">SDGs We Are Addressing</h2>
            <p className="section-subtitle">
              Every digital product and solution we build is intentionally aligned with the UN Sustainable Development Goals — creating technology that drives real, measurable impact.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdgs.map(({ num, color, icon, title, desc }, i) => (
              <motion.div
                key={num}
                className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
              >
                <div className="p-5 flex items-center gap-4" style={{ backgroundColor: color }}>
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`fas ${icon} text-white text-2xl`} />
                  </div>
                  <div>
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest">SDG {num}</p>
                    <h3 className="text-white font-heading font-bold text-base leading-tight">{title}</h3>
                  </div>
                </div>
                <div className="p-5 bg-white flex-1">
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOCUS AREAS ───────────────────────────────────────────────── */}
      <section id="focus" className="py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">What We Build</p>
            <h2 className="section-title">Core Technology Focus Areas</h2>
            <p className="section-subtitle">Four interconnected technology disciplines that form the foundation of everything we build and deliver.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-7">
            {focusAreas.map(({ icon, color, title, desc, features }, i) => (
              <FlipCard
                key={title}
                className="h-72"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
                front={
                  <div className={`h-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col cursor-pointer bg-gradient-to-br ${color} p-7 text-white justify-center`}>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <i className={`fas ${icon} text-2xl`} />
                      </div>
                      <h3 className="text-xl font-heading font-bold leading-tight">{title}</h3>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">{desc}</p>
                  </div>
                }
                back={
                  <div className="h-full rounded-2xl overflow-hidden border border-gray-100 shadow-xl flex flex-col cursor-pointer bg-white p-6">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">What's Included</p>
                    <ul className="space-y-2.5 flex-1">
                      {features.map(f => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-dark-soft">
                          <i className="fas fa-check-circle text-primary text-xs flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                }
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="btn-primary text-base px-8 py-3.5">
              <i className="fas fa-arrow-right" /> View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── INNOVATION IN ACTION — real, live proof points ───────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Not Just a Vision</p>
            <h2 className="section-title">Innovation in Action</h2>
            <p className="section-subtitle">This isn't only a plan — it's already producing real, working platforms today.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-7">
            {flagshipProjects.map(({ badge, icon, title, desc, cta, href, to, external }, i) => (
              <motion.div key={title} className="card p-8" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}>
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5 ${badge === 'Live Now' ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'}`}>
                  {badge === 'Live Now' && <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />}
                  {badge}
                </span>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <i className={`fas ${icon} text-primary text-2xl`} />
                </div>
                <h3 className="text-xl font-heading font-bold text-dark mb-3">{title}</h3>
                <p className="text-muted leading-relaxed mb-6">{desc}</p>
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-semibold inline-flex items-center gap-2">
                    {cta} <i className="fas fa-arrow-up-right-from-square text-xs" />
                  </a>
                ) : (
                  <Link to={to} className="text-primary text-sm font-semibold inline-flex items-center gap-2">
                    {cta} <i className="fas fa-arrow-right text-xs" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR REACH — interactive globe ─────────────────────────────────── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Beyond Juba</p>
              <h2 className="section-title">Our Reach</h2>
              <p className="text-muted leading-relaxed mb-6 max-w-lg">
                We're headquartered in Juba, South Sudan — but our work isn't limited to South Sudan. We build and support digital products for organizations across the region and beyond. The connections below reflect that reach, not physical offices.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                {['Juba (HQ)', 'Nairobi', 'Kampala', 'Addis Ababa', 'Kinshasa', 'Cairo'].map((city, i) => (
                  <span key={city} className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-accent'}`} />
                    {city}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="relative h-[380px] lg:h-[440px]"
            >
              <GlobeAccent className="absolute inset-0" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WAYS TO GET INVOLVED — the Hub serves more than just clients ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Ecosystem Development</p>
            <h2 className="section-title">Ways to Get Involved</h2>
            <p className="section-subtitle">The Hub is built for more than clients — here's how different people engage with it.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engagementPaths.map(({ icon, title, desc, cta, to }, i) => (
              <motion.div key={title} className="card p-6 flex flex-col" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-primary text-lg`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-5 flex-1">{desc}</p>
                <Link to={to} className="text-primary text-sm font-semibold inline-flex items-center gap-2">
                  {cta} <i className="fas fa-arrow-right text-xs" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────
           Matches the visible-content-must-back-structured-data rule noted in
           index.html: this page's FAQPage JSON-LD (see pageSeo['/innovation-hub'])
           needs real rendered FAQ content, not just schema. */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Questions</p>
            <h2 className="section-title">About the Innovation Hub</h2>
          </div>
          <FaqAccordion items={pageSeo['/innovation-hub'].faq} />
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-noise py-24 bg-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-5 bg-accent/10 border border-accent/25 px-4 py-2 rounded-full">
              SNC Innovation Hub
            </span>
            <h2
              className="font-heading uppercase leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, textShadow: '3px 3px 0px rgba(254,127,45,0.35), 6px 6px 0px rgba(254,127,45,0.15)' }}
            >
              <span className="block text-white">Building Digital Infrastructure</span>
              <span
                className="block"
                style={{ fontSize: 'clamp(1.75rem,4.5vw,3rem)', WebkitTextStroke: '1.5px #FE7F2D', color: 'transparent', textShadow: '2px 2px 0px rgba(254,127,45,0.25), 4px 4px 0px rgba(0,0,0,0.4)' }}
              >
                From Juba, for Anywhere
              </span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              Through the SNC Innovation Hub, we are building an ecosystem where technology solves real problems, businesses grow digitally, and communities benefit from innovation — aligned with the UN SDGs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <MagneticButton>
                <Link to="/get-started" className="btn-primary text-base px-8 py-3.5">
                  Start a Project
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:border-white font-semibold px-8 py-3.5 rounded-lg transition-all">
                  Talk to Us
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
