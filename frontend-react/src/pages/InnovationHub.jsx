import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import { pageSeo } from '../lib/seo-data'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../lib/animations'
import MagneticButton from '../components/ui/MagneticButton'
import FaqAccordion from '../components/ui/FaqAccordion'
import GlobeAccent from '../components/ui/GlobeAccent'
import CtaBand from '../components/ui/CtaBand'
import { liveProducts } from '../lib/work-data'
import Img from '../components/ui/Img'

// Hero background photo (a file in public/images). After adding a new one,
// run `npm run images` so phones get a smaller WebP version.
const HUB_HERO_IMAGE = '/images/company-story.jpg'

// ── SDGs SNC directly addresses ──────────────────────────────────────────────
const sdgs = [
  {
    num: 4,
    color: '#233D4D',
    icon: 'fa-graduation-cap',
    title: 'Quality Education',
    desc: 'Building digital learning platforms, e-learning tools, and tech-enabled education systems that expand access to quality education across South Sudan.',
  },
  {
    num: 8,
    color: '#233D4D',
    icon: 'fa-briefcase',
    title: 'Decent Work & Economic Growth',
    desc: 'Creating digital jobs, giving entrepreneurs the software tools they need, and supporting growth through technology services and startup support.',
  },
  {
    num: 9,
    color: '#233D4D',
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
    desc: 'Building hospital systems like HealthHub Bridge: faster patient records and referrals for facilities working on unreliable networks.',
  },
]

// ── Innovation in action — real, live proof points, not just projections ──────
// Both live products come from src/lib/work-data.js, so the Hub, Home, and
// /work always describe them the same way.
const flagshipProjects = liveProducts.map((p) => ({
  badge: 'Live Now',
  icon: p.icon,
  title: p.title,
  desc: p.short,
  cta: p.cta,
  href: p.url,
  external: true,
}))

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
    desc: 'Looking for prototyping support or a place to build? Our Innovation Lab launches in Phase II. Reach out early to join the first cohort.',
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
    title: 'For High School Graduates',
    desc: 'Foundational digital skills training that prepares you for a smooth transition into college and higher education.',
    cta: 'Ask About Training',
    to: '/contact',
  },
]

// ── Vision pillars — what the vision statement actually rests on ──────────────
const visionPillars = [
  {
    num: '01',
    icon: 'fa-map-marker-alt',
    color: '#FE7F2D',
    title: 'Built Here, Built to Scale',
    desc: "Every product is engineered against South Sudan's real conditions: low bandwidth, limited devices, real infrastructure gaps. That discipline doesn't disappear once a client is based outside the country.",
  },
  {
    num: '02',
    icon: 'fa-check-double',
    color: '#233D4D',
    title: 'Proof, Not Promises',
    desc: "EduPortal and HealthHub Bridge aren't concepts on a roadmap slide. They're live, serving real people today. A vision only means something once it ships.",
  },
  {
    num: '03',
    icon: 'fa-people-group',
    color: '#233D4D',
    title: 'A Hub, Not Just a Company',
    desc: "Organizations, startups, students, and partners all have a place here. A digital future this size can't be built by one team alone.",
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function InnovationHub() {
  return (
    <>
      <SEO {...pageSeo['/innovation-hub']} />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-dark">
        {/* Static background photo — swap HUB_HERO_IMAGE (top of this file) to change it */}
        <Img
          src={HUB_HERO_IMAGE}
          alt=""
          aria-hidden="true"
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />
        {/* Navy wash: strongest behind the text, lighter on the right */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-dark via-dark/85 to-dark/50" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-dark/80 via-transparent to-dark/30" />

        <div className="relative container-page py-20 sm:py-28 w-full">
          <div className="max-w-4xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.85 }}>
              <p className="hero-eyebrow">SNC Innovation Hub</p>
              <h1 className="display-heading text-white mb-6">
                <span className="text-white">Technology &amp; Innovation</span><br />
                <span className="text-accent">Hub</span>
              </h1>
              <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-2xl">
                Based in Juba, South Sudan, building digital products, delivering software solutions, and driving transformation for organizations at home and abroad, aligned with the UN Sustainable Development Goals.
              </p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton>
                  <Link to="/get-started" className="btn-primary text-base px-7 py-3.5">
                    Start a Project
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <a href="#vision" className="btn-secondary border-white text-white hover:bg-white hover:text-primary text-base px-7 py-3.5">
                    Explore the Hub
                  </a>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VISION STATEMENT ─────────────────────────────────────────────── */}
      <section id="vision" className="relative overflow-hidden bg-gray-50 py-16 sm:py-24 scroll-mt-20">
        <div className="relative container-page text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="eyebrow">Our Vision</p>
            <h2 className="display-heading-sm text-dark mb-6">
              Built in Juba. Built for Anywhere.
            </h2>
            <p className="text-muted text-lg leading-relaxed">
              Sleek Nexus Creative is based in Juba, South Sudan, and that's where our engineering discipline comes from: building for real bandwidth constraints, real device limitations, and real infrastructure gaps. But our work isn't limited to South Sudan. We design and ship digital products for organizations across the region and internationally, bringing that same reliability-first standard to every client, wherever they're based.
            </p>
          </motion.div>
        </div>

        {/* Cards get their own full-width container — matching the SDGs
            section's max-w-[1400px] exactly, rather than inheriting the
            narrower max-w-4xl sized for the paragraph above — otherwise
            identical card markup still renders narrower columns here. */}
        <div className="relative container-page mt-16">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {visionPillars.map(({ num, icon, color, title, desc }) => (
              <motion.div key={title} variants={fadeUp} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
                <div className="p-5 flex items-center gap-4" style={{ backgroundColor: color }}>
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`fas ${icon} text-white text-2xl`} />
                  </div>
                  <div>
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Pillar {num}</p>
                    <h3 className="text-white font-heading font-bold text-base leading-tight">{title}</h3>
                  </div>
                </div>
                <div className="p-5 bg-white flex-1 min-h-[110px]">
                  <p className="text-dark-soft text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SDGs SECTION ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-page">
          <div className="text-center mb-14">
            <p className="eyebrow">Global Alignment</p>
            <h2 className="section-title">SDGs We Are Addressing</h2>
            <p className="section-subtitle">
              Every digital product and solution we build is intentionally aligned with the UN Sustainable Development Goals, creating technology that drives real, measurable impact.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdgs.map(({ num, color, icon, title, desc }, i) => (
              <motion.div
                key={num}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
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
                <div className="p-5 bg-white flex-1 min-h-[110px]">
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INNOVATION IN ACTION — real, live proof points ───────────────── */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container-page">
          <div className="text-center mb-14">
            <p className="eyebrow">Not Just a Vision</p>
            <h2 className="section-title">Innovation in Action</h2>
            <p className="section-subtitle">This isn't only a plan. It's already producing real, working platforms today.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-7">
            {flagshipProjects.map(({ badge, icon, title, desc, cta, href, to, external }, i) => (
              <motion.div key={title} className="card p-8" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}>
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5 ${badge === 'Live Now' ? 'bg-dark text-white' : 'bg-primary/10 text-primary'}`}>
                  {badge === 'Live Now' && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
                  {badge}
                </span>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <i className={`fas ${icon} text-primary text-2xl`} />
                </div>
                <h3 className="text-2xl font-heading font-black text-dark mb-3">{title}</h3>
                <p className="text-muted leading-relaxed mb-6">{desc}</p>
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-semibold inline-flex items-center gap-2">
                    {cta}
                  </a>
                ) : (
                  <Link to={to} className="text-primary text-sm font-semibold inline-flex items-center gap-2">
                    {cta}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK FROM ANYWHERE — remote collaboration, globe on desktop ──── */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="eyebrow">Work With Us From Anywhere</p>
              <h2 className="section-title">Wherever You Are</h2>
              <p className="text-muted leading-relaxed mb-6 max-w-lg">
                Any business with a problem worth solving, whatever its size, industry, or location. We are based in Juba and work online: we scope, design, build, and support projects over video calls, shared project boards, and messaging, so distance never slows a project down.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 max-w-lg">
                {[
                  { icon: 'fa-video',          label: 'Remote by default: video calls & screen shares' },
                  { icon: 'fa-comments',       label: 'Updates on WhatsApp, email, or your own tools' },
                  { icon: 'fa-list-check',     label: 'Clear milestones you can follow from anywhere' },
                  { icon: 'fa-building',       label: 'Any industry, any size of organization' },
                ].map(({ icon, label }) => (
                  <li key={label} className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3 text-sm text-dark">
                    <i className={`fas ${icon} text-primary mt-0.5 flex-shrink-0`} />
                    {label}
                  </li>
                ))}
              </ul>
              <Link to="/get-started" className="btn-primary mt-8">Start a Project Remotely</Link>
            </motion.div>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="relative hidden lg:block h-[440px]"
            >
              <GlobeAccent className="absolute inset-0" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WAYS TO GET INVOLVED — the Hub serves more than just clients ── */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container-page">
          <div className="text-center mb-14">
            <p className="eyebrow">Who the Hub Is For</p>
            <h2 className="section-title">Ways to Get Involved</h2>
            <p className="section-subtitle">The Hub is built for more than clients. Here's how different people engage with it.</p>
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
                  {cta}
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
            <p className="eyebrow">Questions</p>
            <h2 className="section-title">About the Innovation Hub</h2>
          </div>
          <FaqAccordion items={pageSeo['/innovation-hub'].faq} />
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <CtaBand
        label="SNC Innovation Hub"
        title="Building Digital Infrastructure From Juba, for Anywhere"
        desc="Through the SNC Innovation Hub, we build technology that solves real problems, helps businesses grow, and benefits the communities around them, in line with the UN SDGs."
        primary={{ to: '/get-started', label: "Start a Project" }}
        secondary={{ to: '/contact', label: "Talk to Us" }}
      />
    </>
  )
}
