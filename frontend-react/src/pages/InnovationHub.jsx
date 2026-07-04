import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/animations'

// ── Data from SNC Project Proposal 2024 ──────────────────────────────────────

const objectives = [
  { icon: 'fa-user-tie',      text: 'Develop future-ready leaders and professionals.' },
  { icon: 'fa-seedling',      text: 'Support startup creation and business growth.' },
  { icon: 'fa-rocket',        text: 'Foster innovation and entrepreneurship.' },
  { icon: 'fa-laptop',        text: 'Expand access to technology and digital opportunities.' },
  { icon: 'fa-flask',         text: 'Promote research, creativity, and problem-solving.' },
  { icon: 'fa-globe-africa',  text: "Strengthen South Sudan's innovation ecosystem." },
  { icon: 'fa-network-wired', text: 'Connect local talent to regional and global opportunities.' },
  { icon: 'fa-leaf',          text: 'Drive sustainable community transformation.' },
]

const pillars = [
  {
    num: 'I',
    icon: 'fa-laptop-code',
    color: 'from-[#c41e3a] to-[#9b1530]',
    title: 'Technology & Digital Solutions',
    badge: 'Strategic Pillar I',
    desc: 'SNC provides innovative and scalable technology solutions to businesses, startups, institutions, and organisations — from custom software to cybersecurity, cloud infrastructure, and digital transformation.',
    features: [
      'Custom web & mobile applications',
      'SaaS product development',
      'UI/UX design & branding',
      'Digital marketing & SEO',
      'IT consulting & cloud services',
      'Cybersecurity assessments',
    ],
    link: '/services',
    linkLabel: 'Explore Services',
  },
  {
    num: 'II',
    icon: 'fa-graduation-cap',
    color: 'from-[#ff8c42] to-[#e6740a]',
    title: 'Education & Talent Development',
    badge: 'Strategic Pillar II',
    desc: 'Through the SNC Future Skills Academy, learners gain practical knowledge and competencies required for success in the modern workforce — from software development to leadership and communication.',
    features: [
      'Software Dev, AI & Data Science',
      'Cybersecurity & Cloud Computing',
      'Digital Marketing & Design',
      'Leadership & Communication Academy',
      'Career & College Readiness Centre',
      'Scholarship guidance & CV coaching',
    ],
    link: '/courses',
    linkLabel: 'Browse Academy',
  },
  {
    num: 'III',
    icon: 'fa-seedling',
    color: 'from-[#1e293b] to-[#0f172a]',
    title: 'Innovation & Entrepreneurship',
    badge: 'Strategic Pillar III',
    desc: 'SNC nurtures innovators and entrepreneurs capable of creating sustainable solutions for local and global challenges — through incubation, acceleration, mentorship, and hands-on Innovation Lab programs.',
    features: [
      'Startup Incubation & Acceleration',
      'Business model validation',
      'Investor readiness & market access',
      'Entrepreneurship Development Program',
      'Innovation Lab & prototyping',
      'Fellowship & Mentorship Programs',
    ],
    link: '/contact',
    linkLabel: 'Join the Launchpad',
  },
  {
    num: 'IV',
    icon: 'fa-hands-helping',
    color: 'from-[#c41e3a] to-[#ff8c42]',
    title: 'Community Impact & Future Foresight',
    badge: 'Strategic Pillar IV',
    desc: 'SNC is committed to building resilient communities equipped for the future — through digital literacy, women in tech, youth leadership, rural outreach, and a Research & Future Foresight Centre.',
    features: [
      'Digital Literacy for All',
      'Women in Technology Initiative',
      'Youth Leadership Network',
      'Rural Innovation Outreach',
      'Research & Future Foresight Centre',
      'AI, Climate & Smart Communities R&D',
    ],
    link: '/community-programs',
    linkLabel: 'Community Programs',
  },
]

const roadmap = [
  {
    phase: 'Phase I',
    years: '2026 – 2030',
    title: 'Foundation & Growth',
    color: 'border-primary bg-primary/5',
    badgeColor: 'bg-primary text-white',
    priorities: [
      'Establish SNC operations and governance structure',
      'Build technology and creative service portfolio',
      'Launch leadership and career development programs',
      'Develop strategic partnerships',
      'Launch mentorship, volunteer, and internship programs',
    ],
    outcomes: ['500+ youth trained', '20+ internship opportunities', '50+ mentorship relationships', '25+ technology projects delivered'],
  },
  {
    phase: 'Phase II',
    years: '2030 – 2035',
    title: 'Innovation & Expansion',
    color: 'border-accent bg-accent/5',
    badgeColor: 'bg-accent text-white',
    priorities: [
      'Launch SNC Innovation & Leadership Hub',
      'Introduce startup incubation programs',
      'Expand Future Skills Academy',
      'Launch Women in Technology initiatives',
      'Organise innovation challenges and hackathons',
    ],
    outcomes: ['3,000+ youth trained', '50+ startups supported', '100+ internship & mentorship opportunities', 'Hub fully operational'],
  },
  {
    phase: 'Phase III',
    years: '2035 – 2040',
    title: 'Regional Impact & Sustainability',
    color: 'border-dark bg-dark/5',
    badgeColor: 'bg-dark text-white',
    priorities: [
      'Launch Future Foresight Centre',
      'Expand regional partnerships',
      'Scale innovation and entrepreneurship programs',
      'Strengthen financial sustainability',
    ],
    outcomes: ['10,000–20,000 directly empowered', '100,000+ reached indirectly', '500+ startups & businesses supported', 'Regional innovation leader'],
  },
]

const impact2030 = [
  { icon: 'fa-user-graduate', value: '20,000+', label: 'Individuals Empowered by 2030' },
  { icon: 'fa-bullhorn',      value: '100,000+', label: 'People Reached Indirectly' },
  { icon: 'fa-store',         value: '500+',     label: 'Startups & Businesses Supported' },
  { icon: 'fa-briefcase',     value: '1,000s',   label: 'Jobs & Entrepreneurship Created' },
  { icon: 'fa-female',        value: '50%+',     label: 'Women & Underserved Participants' },
  { icon: 'fa-globe-africa',  value: 'Africa',   label: 'Regional Innovation Ecosystem' },
]

const communityPrograms = [
  { icon: 'fa-wifi',        title: 'Digital Literacy for All',         desc: 'Expanding access to digital skills and technology education across South Sudan, including rural and underserved areas.' },
  { icon: 'fa-female',      title: 'Women in Technology',              desc: 'Increasing participation and leadership of women and girls in STEM, innovation, and entrepreneurship.' },
  { icon: 'fa-users',       title: 'Youth Leadership Network',         desc: 'Developing responsible, impactful young leaders equipped with critical thinking, civic values, and practical skills.' },
  { icon: 'fa-map-marker',  title: 'Rural Innovation Outreach',        desc: 'Bringing technology, education, and economic opportunities to underserved communities and remote regions.' },
  { icon: 'fa-trophy',      title: 'Community Innovation Challenges',  desc: 'Empowering citizens to create innovative, locally-relevant solutions to real challenges through competitions and hackathons.' },
  { icon: 'fa-microscope',  title: 'Future Foresight Centre',          desc: 'Research on AI, future of work, digital economy, climate innovation, smart communities, and emerging technologies.' },
]

const getInvolved = [
  { icon: 'fa-user-graduate',   title: 'Enroll in a Program',    desc: 'Join a course, accelerator cohort, or leadership workshop and start building your future.', link: '/courses',    cta: 'Browse Programs',   bg: 'bg-primary' },
  { icon: 'fa-user-tie',        title: 'Become a Mentor',        desc: 'Share your expertise, guide the next generation, and give back to South Sudan\'s tech community.', link: '/mentor',    cta: 'Apply to Mentor',   bg: 'bg-accent' },
  { icon: 'fa-handshake',       title: 'Partner With Us',        desc: 'Co-fund programs, sponsor cohorts, recruit from our talent pipeline, or co-develop solutions.', link: '/partners',   cta: 'Partner With Us',   bg: 'bg-primary' },
  { icon: 'fa-heart',           title: 'Support a Student',      desc: 'Sponsor a learner\'s training, donate to community programs, or fund a Hub initiative.', link: '/donors',    cta: 'Donate Now',        bg: 'bg-accent' },
  { icon: 'fa-briefcase',       title: 'Internship Program',     desc: 'Gain real-world experience working on live projects alongside SNC professionals.', link: '/internships', cta: 'Apply for Internship', bg: 'bg-dark' },
  { icon: 'fa-hands-helping',   title: 'Volunteer',              desc: 'Contribute your time and skills to teaching, outreach, content creation, or open-source projects.', link: '/volunteer',  cta: 'Volunteer With Us', bg: 'bg-primary' },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function InnovationHub() {
  return (
    <>
      <Helmet>
        <title>SNC Innovation & Leadership Hub — Sleek Nexus Creative</title>
        <meta name="description" content="The SNC Innovation & Leadership Hub — a collaborative ecosystem empowering 10,000–20,000 individuals through technology, education, entrepreneurship, and community impact across South Sudan." />
        <meta property="og:title" content="SNC Innovation & Leadership Hub" />
        <meta property="og:description" content="Vision 2030: Empowering 10,000–20,000 individuals and reaching 100,000+ through education, innovation, entrepreneurship, and community impact." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://SNC.ss/innovation-hub" />
        <meta property="og:image" content="https://SNC.ss/images/hero-tech.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[80vh] flex items-center overflow-hidden"
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
                <i className="fas fa-bolt text-[0.7rem]" /> Flagship Initiative · Vision 2030
              </span>
              <h1 className="text-white font-heading font-black uppercase leading-[0.95] mb-6"
                style={{ fontSize: 'clamp(2.25rem,5.5vw,4.25rem)', letterSpacing: '-0.02em' }}>
                SNC Innovation &amp;<br />Leadership Hub
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-4 max-w-2xl">
                A collaborative ecosystem where innovation, technology, leadership, entrepreneurship, and community impact converge — building the next generation of innovators, leaders, entrepreneurs, and digital solutions for South Sudan and beyond.
              </p>
              <p className="text-accent font-semibold mb-8">
                <i className="fas fa-eye mr-2" />
                Vision 2030 · Directly empower 10,000–20,000 individuals · Reach 100,000+ people
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/get-started" className="btn-primary text-base px-8 py-3.5">
                  <i className="fas fa-rocket" /> Get Involved
                </Link>
                <a href="#pillars" className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:border-white font-semibold px-8 py-3.5 rounded-lg transition-all">
                  Explore the Hub <i className="fas fa-arrow-down text-sm" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SNC ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">About SNC</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-6 leading-tight">
                Technology, Innovation &amp; <span className="text-primary">Leadership</span> for Africa
              </h2>
              <p className="text-muted leading-relaxed mb-5 text-lg">
                Sleek Nexus Creative (SNC) is a technology, innovation, and leadership organisation dedicated to accelerating digital transformation while empowering the next generation of innovators, entrepreneurs, and changemakers.
              </p>
              <p className="text-muted leading-relaxed mb-5">
                We combine professional technology services, educational programs, entrepreneurship support, leadership development, and community impact initiatives to create lasting solutions that address local challenges and unlock global opportunities.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Through innovation, collaboration, and continuous learning, SNC bridges the gap between talent, technology, and opportunity across South Sudan, Africa, and the global digital economy.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: 'fa-bullseye', label: 'Mission', text: 'Empower through technology, leadership & innovation' },
                  { icon: 'fa-eye',      label: 'Vision',  text: 'Leading African innovation ecosystem by 2030' },
                ].map(({ icon, label, text }) => (
                  <div key={label} className="card p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <i className={`fas ${icon} text-primary text-sm`} />
                      <span className="text-xs font-bold text-primary uppercase tracking-wide">{label}</span>
                    </div>
                    <p className="text-dark-soft text-sm leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}>
              <img src="/images/about-preview.jpg" alt="SNC Innovation Hub" className="w-full rounded-2xl shadow-2xl object-cover h-[440px]" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OBJECTIVES ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Our Focus</p>
            <h2 className="section-title">Hub Objectives</h2>
            <p className="section-subtitle">Eight clear goals guiding every program, partnership, and initiative within the Hub.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {objectives.map(({ icon, text }, i) => (
              <motion.div key={text} className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.07 }}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className={`fas ${icon} text-primary text-sm`} />
                </div>
                <p className="text-dark-soft text-sm leading-relaxed font-medium">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUR STRATEGIC PILLARS ─────────────────────────────────────── */}
      <section id="pillars" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Strategic Framework</p>
            <h2 className="section-title">Four Strategic Pillars</h2>
            <p className="section-subtitle">The four interconnected pillars that form SNC's comprehensive ecosystem — from technology delivery to community transformation.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-7">
            {pillars.map(({ num, icon, color, title, badge, desc, features, link, linkLabel }, i) => (
              <motion.div key={title} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className={`bg-gradient-to-br ${color} p-7 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <i className={`fas ${icon} text-white text-xl`} />
                      </div>
                      <span className="text-4xl font-heading font-black text-white/20">{num}</span>
                    </div>
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{badge}</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold leading-tight">{title}</h3>
                </div>
                <div className="p-6 flex flex-col flex-1 bg-white">
                  <p className="text-muted text-sm leading-relaxed mb-5">{desc}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-dark-soft">
                        <i className="fas fa-check-circle text-primary text-xs flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to={link} className="btn-primary text-sm justify-center mt-auto">
                    {linkLabel} <i className="fas fa-arrow-right text-xs" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY PROGRAMS ─────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Community Impact</p>
            <h2 className="section-title">Community & Future Programs</h2>
            <p className="section-subtitle">Grassroots programs ensuring no one is left behind in South Sudan's digital transformation.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityPrograms.map(({ icon, title, desc }, i) => (
              <motion.div key={title} className="card p-6"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-primary`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION 2030 ROADMAP ────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Implementation Roadmap</p>
            <h2 className="section-title">Vision 2030 · 2026–2040</h2>
            <p className="section-subtitle">A phased approach to building South Sudan's leading innovation ecosystem over 15 years.</p>
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
            {impact2030.map(({ icon, value, label }, i) => (
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

      {/* ── GET INVOLVED ────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Opportunities to Get Involved</p>
            <h2 className="section-title">Your Role in the Hub</h2>
            <p className="section-subtitle">Six ways individuals and organisations can contribute to building South Sudan's innovation ecosystem.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getInvolved.map(({ icon, title, desc, link, cta, bg }, i) => (
              <motion.div key={title} className="card p-7 flex flex-col"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-5 shadow-md`}>
                  <i className={`fas ${icon} text-white text-lg`} />
                </div>
                <h3 className="font-heading font-bold text-dark text-lg mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-6 flex-1">{desc}</p>
                <Link to={link} className="btn-primary text-sm justify-center">{cta}</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIPS ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Ecosystem Development</p>
            <h2 className="section-title">Strategic Partnerships</h2>
            <p className="section-subtitle">Meaningful, sustainable impact is achieved through collaboration. SNC develops strategic alliances across every sector.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: 'fa-university',      label: 'Universities & Colleges' },
              { icon: 'fa-school',          label: 'Secondary Schools' },
              { icon: 'fa-landmark',        label: 'Government Institutions' },
              { icon: 'fa-building',        label: 'Technology Companies' },
              { icon: 'fa-globe',           label: 'International Organizations' },
              { icon: 'fa-hands-helping',   label: 'NGOs & Development Partners' },
              { icon: 'fa-flask',           label: 'Research Institutions' },
              { icon: 'fa-store',           label: 'Private Sector Orgs' },
              { icon: 'fa-lightbulb',       label: 'Innovation Hubs' },
              { icon: 'fa-rocket',          label: 'Startup Ecosystems' },
            ].map(({ icon, label }, i) => (
              <motion.div key={label} className="card p-4 text-center"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <i className={`fas ${icon} text-primary text-xl mb-2 block`} />
                <p className="text-xs font-semibold text-dark-soft leading-tight">{label}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/partners" className="btn-primary">Become a Strategic Partner</Link>
          </div>
        </div>
      </section>

      {/* ── CONCLUSION CTA ──────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-5 bg-accent/10 border border-accent/25 px-4 py-2 rounded-full">
              <i className="fas fa-bolt" /> Vision 2030
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 leading-tight">
              A Future Where Every Young Person Has Access to Opportunity
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Through the SNC Innovation &amp; Leadership Hub, we are building an ecosystem that empowers people, transforms communities, strengthens businesses, and prepares future generations to lead, innovate, and thrive.
            </p>
            <p className="text-gray-400 text-sm mb-10 italic">
              "Every entrepreneur has access to support. Every organisation can leverage technology for growth. Every community can benefit from innovation."
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/get-started" className="btn-primary text-base px-8 py-3.5">
                <i className="fas fa-rocket" /> Join the Movement
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
