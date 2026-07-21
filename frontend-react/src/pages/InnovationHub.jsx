import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/animations'

// ── SDGs SNC directly addresses ──────────────────────────────────────────────
const sdgs = [
  {
    num: 4,
    color: '#c41e3a',
    icon: 'fa-graduation-cap',
    title: 'Quality Education',
    desc: 'Building digital learning platforms, e-learning tools, and tech-enabled education systems that expand access to quality education across South Sudan.',
  },
  {
    num: 8,
    color: '#ff8c42',
    icon: 'fa-briefcase',
    title: 'Decent Work & Economic Growth',
    desc: 'Creating digital jobs, empowering entrepreneurs with software tools, and driving economic growth through technology services and startup support.',
  },
  {
    num: 9,
    color: '#c41e3a',
    icon: 'fa-industry',
    title: 'Industry, Innovation & Infrastructure',
    desc: 'Delivering scalable software, cloud infrastructure, and digital transformation solutions that modernise industries and build resilient digital infrastructure.',
  },
  {
    num: 10,
    color: '#ff8c42',
    icon: 'fa-balance-scale',
    title: 'Reduced Inequalities',
    desc: 'Bridging the digital divide by making technology accessible to underserved communities, women, and youth across South Sudan and Africa.',
  },
  {
    num: 17,
    color: '#1e293b',
    icon: 'fa-handshake',
    title: 'Partnerships for the Goals',
    desc: 'Forging strategic alliances with governments, NGOs, tech companies, and international organisations to co-create digital solutions for sustainable development.',
  },
]

// ── Core technology focus areas ───────────────────────────────────────────────
const focusAreas = [
  {
    icon: 'fa-laptop-code',
    color: 'from-[#c41e3a] to-[#9b1530]',
    title: 'Custom Software Development',
    desc: 'End-to-end development of web applications, mobile apps, SaaS platforms, and enterprise systems built to solve real business problems.',
    features: ['Web & mobile applications', 'SaaS product development', 'API design & integration', 'Cloud-native architecture'],
  },
  {
    icon: 'fa-pencil-ruler',
    color: 'from-[#ff8c42] to-[#e6740a]',
    title: 'UI/UX & Digital Design',
    desc: 'Human-centred design that turns complex problems into intuitive, beautiful digital experiences — from wireframes to production-ready interfaces.',
    features: ['User research & prototyping', 'Interface & interaction design', 'Design systems & branding', 'Accessibility-first approach'],
  },
  {
    icon: 'fa-cloud',
    color: 'from-[#1e293b] to-[#0f172a]',
    title: 'Cloud & Infrastructure',
    desc: 'Scalable, secure cloud infrastructure and DevOps pipelines that keep your digital products fast, reliable, and ready to grow.',
    features: ['Cloud deployment & migration', 'DevOps & CI/CD pipelines', 'Cybersecurity assessments', 'Performance optimisation'],
  },
  {
    icon: 'fa-lightbulb',
    color: 'from-[#c41e3a] to-[#ff8c42]',
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
  { icon: 'fa-code',          value: '150+',   label: 'Digital Products Built by 2040' },
  { icon: 'fa-store',         value: '20+',    label: 'Startups Supported' },
  { icon: 'fa-briefcase',     value: '500+',   label: 'Jobs & Opportunities Created' },
  { icon: 'fa-globe-africa',  value: 'Africa', label: 'Regional Market Reach' },
  { icon: 'fa-handshake',     value: '30+',    label: 'Strategic Partnerships' },
  { icon: 'fa-flag',          value: 'Juba',   label: 'Innovation Hub HQ' },
]

// ── Partners ──────────────────────────────────────────────────────────────────
const partners = [
  { icon: 'fa-landmark',       label: 'Government Institutions' },
  { icon: 'fa-building',       label: 'Technology Companies' },
  { icon: 'fa-globe',          label: 'International Organisations' },
  { icon: 'fa-hands-helping',  label: 'NGOs & Development Partners' },
  { icon: 'fa-flask',          label: 'Research Institutions' },
  { icon: 'fa-store',          label: 'Private Sector Orgs' },
  { icon: 'fa-university',     label: 'Universities & Colleges' },
  { icon: 'fa-rocket',         label: 'Startup Ecosystems' },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function InnovationHub() {
  return (
    <>
      <SEO
        title="SNC Innovation Hub — Technology & Digital Solutions for South Sudan"
        description="The SNC Innovation Hub is a technology and innovation ecosystem in Juba, South Sudan — delivering custom software, digital transformation, and startup support aligned with the UN SDGs."
        canonical="/innovation-hub"
        keywords="innovation hub South Sudan, tech hub Juba, software development South Sudan, digital transformation South Sudan, SNC hub, startup incubation South Sudan, SDGs technology"
        image="https://sleeknexuscreative.com/images/about-preview.jpg"
        imageAlt="SNC Innovation Hub — Technology and Digital Solutions"
        breadcrumbs={[{ name: 'Innovation Hub', url: '/innovation-hub' }]}
        faq={[
          { q: 'What is the SNC Innovation Hub?', a: 'The SNC Innovation Hub is a technology and innovation ecosystem in Juba, South Sudan that delivers custom software, digital transformation, and startup support — aligned with the UN Sustainable Development Goals.' },
          { q: 'What SDGs does SNC address?', a: 'SNC directly contributes to SDG 4 (Quality Education), SDG 8 (Decent Work & Economic Growth), SDG 9 (Industry, Innovation & Infrastructure), SDG 10 (Reduced Inequalities), and SDG 17 (Partnerships for the Goals).' },
          { q: 'What technology services does SNC offer?', a: 'SNC offers custom software development, mobile apps, UI/UX design, cloud infrastructure, cybersecurity, digital consulting, and startup incubation.' },
          { q: 'Where is the SNC Innovation Hub located?', a: 'The SNC Innovation Hub is based in Juba, Central Equatoria, South Sudan.' },
        ]}
      />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[85vh] flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d0f1a 0%, #1a0a10 45%, #0f1520 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-28 w-full">
          <div className="max-w-4xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.7 }}>
              <span className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-6 bg-accent/10 border border-accent/25 px-4 py-2 rounded-full">
                <i className="fas fa-bolt text-[0.7rem]" /> Flagship Initiative · Vision 2040
              </span>
              <h1 className="text-white font-heading font-black uppercase leading-[0.95] mb-6"
                style={{ fontSize: 'clamp(2.25rem,5.5vw,4.25rem)', letterSpacing: '-0.02em' }}>
                Technology &amp; Innovation<br />
                <span className="text-primary">Hub</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-4 max-w-2xl">
                A technology and innovation ecosystem in Juba, South Sudan — building digital products, delivering software solutions, and driving transformation aligned with the UN Sustainable Development Goals.
              </p>
              <p className="text-accent font-semibold mb-8">
                <i className="fas fa-globe-africa mr-2" />
                SDG-aligned · South Sudan & Africa · Vision 2040
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/get-started" className="btn-primary text-base px-8 py-3.5">
                  <i className="fas fa-rocket" /> Start a Project
                </Link>
                <a href="#focus" className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:border-white font-semibold px-8 py-3.5 rounded-lg transition-all">
                  Explore the Hub <i className="fas fa-arrow-down text-sm" />
                </a>
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
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
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
            {/* Filler card — "and more" */}
            <motion.div
              className="rounded-2xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-center gap-3"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <i className="fas fa-plus text-gray-400 text-lg" />
              </div>
              <p className="text-sm font-semibold text-dark">More SDGs Through Impact</p>
              <p className="text-xs text-muted leading-relaxed">As we grow, our digital solutions will address additional SDGs across health, climate, and governance.</p>
            </motion.div>
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
              <motion.div key={title} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className={`bg-gradient-to-br ${color} p-7 text-white`}>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <i className={`fas ${icon} text-white text-xl`} />
                  </div>
                  <h3 className="text-xl font-heading font-bold leading-tight">{title}</h3>
                </div>
                <div className="p-6 flex flex-col flex-1 bg-white">
                  <p className="text-muted text-sm leading-relaxed mb-5">{desc}</p>
                  <ul className="space-y-2 flex-1">
                    {features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-dark-soft">
                        <i className="fas fa-check-circle text-primary text-xs flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
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
          <div className="grid md:grid-cols-3 gap-7">
            {roadmap.map(({ phase, years, title, color, badgeColor, priorities, outcomes }, i) => (
              <motion.div key={phase} className={`rounded-2xl border-2 ${color} p-7`}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT BY 2040 ──────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-2">Expected Impact by 2040</p>
            <h2 className="text-3xl font-heading font-bold">The Scale of Our Ambition</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {impact.map(({ icon, value, label }, i) => (
              <motion.div key={label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.07 }}>
                <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <i className={`fas ${icon} text-white text-lg`} />
                </div>
                <div className="text-2xl font-heading font-black mb-1">{value}</div>
                <div className="text-white/70 text-xs leading-tight">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STRATEGIC PARTNERSHIPS ──────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Ecosystem Development</p>
            <h2 className="section-title">Strategic Partnerships</h2>
            <p className="section-subtitle">Sustainable digital impact is built through collaboration. SNC develops alliances across every sector to co-create solutions that last.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {partners.map(({ icon, label }, i) => (
              <motion.div key={label} className="card p-5 text-center"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <i className={`fas ${icon} text-primary text-xl mb-2 block`} />
                <p className="text-xs font-semibold text-dark-soft leading-tight">{label}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/get-started" className="btn-primary">Become a Strategic Partner</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-5 bg-accent/10 border border-accent/25 px-4 py-2 rounded-full">
              <i className="fas fa-bolt" /> Vision 2040
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 leading-tight">
              Building Digital Solutions That Drive Real-World Impact
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Through the SNC Innovation Hub, we are building an ecosystem where technology solves real problems, businesses grow digitally, and communities benefit from innovation — aligned with the UN SDGs.
            </p>
            <p className="text-gray-400 text-sm mb-10 italic">
              "Every organisation can leverage technology for growth. Every community can benefit from innovation."
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/get-started" className="btn-primary text-base px-8 py-3.5">
                <i className="fas fa-rocket" /> Start a Project
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:border-white font-semibold px-8 py-3.5 rounded-lg transition-all">
                <i className="fas fa-envelope" /> Talk to Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
