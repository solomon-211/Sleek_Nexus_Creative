import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import { pageSeo } from '../lib/seo-data'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, scaleIn } from '../lib/animations'
import TiltCard from '../components/ui/TiltCard'
import MagneticButton from '../components/ui/MagneticButton'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import FaqAccordion from '../components/ui/FaqAccordion'
import FlipCard from '../components/ui/FlipCard'

// ── SDGs SNC directly addresses ──────────────────────────────────────────────
const sdgs = [
  {
    num: 4,
    color: '#8C4619',
    icon: 'fa-graduation-cap',
    title: 'Quality Education',
    desc: 'Building digital learning platforms, e-learning tools, and tech-enabled education systems that expand access to quality education across South Sudan.',
  },
  {
    num: 8,
    color: '#8C5430',
    icon: 'fa-briefcase',
    title: 'Decent Work & Economic Growth',
    desc: 'Creating digital jobs, empowering entrepreneurs with software tools, and driving economic growth through technology services and startup support.',
  },
  {
    num: 9,
    color: '#8C4619',
    icon: 'fa-industry',
    title: 'Industry, Innovation & Infrastructure',
    desc: 'Delivering scalable software, cloud infrastructure, and digital transformation solutions that modernise industries and build resilient digital infrastructure.',
  },
  {
    num: 10,
    color: '#8C5430',
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
    color: '#A85C32',
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

// ── Roadmap ───────────────────────────────────────────────────────────────────
const roadmap = [
  {
    phase: 'Phase I',
    years: '2026 – 2030',
    title: 'Foundation & Growth',
    color: 'border-primary bg-primary/5',
    badgeColor: 'bg-primary text-white',
    priorities: [
      'Establish SNC operations and governance',
      'Build core software & digital service portfolio',
      'Deliver 15+ technology projects',
      'Develop strategic technology partnerships',
      'Launch innovation consulting practice',
    ],
    outcomes: ['15+ projects delivered', '30+ clients served', '5+ strategic partnerships', 'Operational hub in Juba'],
  },
  {
    phase: 'Phase II',
    years: '2030 – 2035',
    title: 'Innovation & Expansion',
    color: 'border-accent bg-accent/5',
    badgeColor: 'bg-accent text-white',
    priorities: [
      'Launch SNC Innovation Lab & prototyping centre',
      'Introduce startup incubation & acceleration',
      'Expand into regional African markets',
      'Build proprietary SaaS products',
      'Organise hackathons & innovation challenges',
    ],
    outcomes: ['50+ projects delivered', '20+ startups supported', 'Regional market presence', 'Innovation Lab fully operational'],
  },
  {
    phase: 'Phase III',
    years: '2035 – 2040',
    title: 'National Impact & Scale',
    color: 'border-dark bg-dark/5',
    badgeColor: 'bg-dark text-white',
    priorities: [
      'Scale digital solutions across South Sudan',
      'Launch Future Foresight & R&D Centre',
      'Expand national & international partnerships',
      'Strengthen financial sustainability',
    ],
    outcomes: ['150+ projects & products', '500+ jobs created', 'National digital infrastructure leader', 'Pan-African technology brand'],
  },
]

// ── Impact metrics ────────────────────────────────────────────────────────────
const impact = [
  { icon: 'fa-code',          value: 150,   suffix: '+',     label: 'Digital Products Built by 2040', isNum: true },
  { icon: 'fa-store',         value: 20,    suffix: '+',     label: 'Startups Supported', isNum: true },
  { icon: 'fa-briefcase',     value: 500,   suffix: '+',     label: 'Jobs & Opportunities Created', isNum: true },
  { icon: 'fa-globe-africa',  value: null,  display: 'Africa', label: 'Regional Market Reach' },
  { icon: 'fa-handshake',     value: 30,    suffix: '+',     label: 'Strategic Partnerships', isNum: true },
  { icon: 'fa-flag',          value: null,  display: 'Juba', label: 'Innovation Hub HQ' },
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
    cta: 'View Case Study',
    to: '/projects',
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
                SNC · Vision 2040
              </span>
              <h1 className="text-dark font-heading font-black uppercase leading-[0.95] mb-6"
                style={{ fontSize: 'clamp(2.25rem,5.5vw,4.25rem)', letterSpacing: '-0.02em' }}>
                <span className="text-dark">Technology &amp; Innovation</span><br />
                <span className="text-accent">Hub</span>
              </h1>
              <p className="text-muted text-lg leading-relaxed mb-4 max-w-2xl">
                A technology and innovation ecosystem in Juba, South Sudan — building digital products, delivering software solutions, and driving transformation aligned with the UN Sustainable Development Goals.
              </p>
              <p className="text-accent font-semibold mb-8">
                <i className="fas fa-globe-africa mr-2" />
                SDG-aligned · South Sudan &amp; Africa · Vision 2040
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

      {/* ── VISION 2040 ROADMAP ────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Implementation Roadmap</p>
            <h2 className="section-title">Vision 2040 · 2026–2040</h2>
            <p className="section-subtitle">A phased approach to building South Sudan's leading technology and innovation ecosystem over 15 years.</p>
          </div>

          {/* Timeline connector — purely visual, ties the three phase cards into one journey */}
          <div className="hidden md:flex items-center justify-center max-w-2xl mx-auto mb-4">
            {roadmap.map(({ phase, years }) => (
              <div key={phase} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-shrink-0">
                  <span className="w-3 h-3 rounded-full bg-primary border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
                  <span className="text-[0.65rem] font-semibold text-muted mt-1.5 whitespace-nowrap">{years.split(' – ')[0]}</span>
                </div>
                <div className="flex-1 h-px bg-gray-200 mx-1" />
              </div>
            ))}
            <div className="flex flex-col items-center flex-shrink-0">
              <span className="w-3 h-3 rounded-full bg-dark border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
              <span className="text-[0.65rem] font-semibold text-muted mt-1.5">2040</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {roadmap.map(({ phase, years, title, color, badgeColor, priorities, outcomes }, i) => (
              <TiltCard key={phase} className={`rounded-2xl border-2 ${color} p-7`}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${badgeColor}`}>{phase}</span>
                  <span className="text-xs font-semibold text-muted">{years}</span>
                </div>
                <h3 className="font-heading font-bold text-dark text-lg mb-4">{title}</h3>
                <div className="mb-5">
                  <p className="text-xs font-bold text-primary uppercase tracking-wide mb-2">Priorities</p>
                  <ul className="space-y-1.5">
                    {priorities.map(p => (
                      <li key={p} className="flex items-start gap-2 text-xs text-dark-soft">
                        <i className="fas fa-arrow-right text-primary text-[0.6rem] mt-0.5 flex-shrink-0" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted uppercase tracking-wide mb-2">Expected Outcomes</p>
                  <ul className="space-y-1.5">
                    {outcomes.map(o => (
                      <li key={o} className="flex items-start gap-2 text-xs text-dark-soft font-medium">
                        <i className="fas fa-check-circle text-green-600 text-[0.6rem] mt-0.5 flex-shrink-0" /> {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── INNOVATION IN ACTION — real, live proof, not just a roadmap ─── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Not Just a Vision</p>
            <h2 className="section-title">Innovation in Action</h2>
            <p className="section-subtitle">Vision 2040 isn't only a plan — it's already producing real, working platforms today.</p>
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

      {/* ── IMPACT BY 2040 ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-noise py-20 bg-primary text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-2">Expected Impact by 2040</p>
            <h2 className="text-3xl font-heading font-bold">What We Are Building Toward</h2>
          </div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {impact.map(({ icon, value, suffix, display, label, isNum }) => (
              <motion.div key={label} variants={scaleIn}>
                <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <i className={`fas ${icon} text-white text-lg`} />
                </div>
                <div className="text-2xl font-heading font-black mb-1">
                  {isNum ? <AnimatedCounter value={value} suffix={suffix} /> : display}
                </div>
                <div className="text-white/70 text-xs leading-tight">{label}</div>
              </motion.div>
            ))}
          </motion.div>
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
              Vision 2040
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 leading-tight">
              Building Digital Infrastructure for South Sudan
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
