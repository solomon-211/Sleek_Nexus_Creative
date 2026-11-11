import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, staggerItem, revealUp } from '../lib/animations'
import SEO from '../components/ui/SEO'
import { pageSeo } from '../lib/seo-data'
import Img from '../components/ui/Img'
import PageHeader from '../components/ui/PageHeader'
import { companyStats } from '../lib/site'
import CtaBand from '../components/ui/CtaBand'

// The two commitments in SNC's mission statement, shown in the page header.
const commitments = [
  {
    icon: 'fa-briefcase',
    label: 'For organizations',
    title: 'Grow, scale and reach further',
    text: 'Digital solutions, branding and marketing that optimize and enhance businesses, organizations and institutions, helping them grow, scale their services and products, and reach a wider audience while building trust with potential customers.',
  },
  {
    icon: 'fa-graduation-cap',
    label: 'For high school graduates',
    title: 'Ready for college',
    text: 'Foundational digital skills for young high school graduates, preparing them for a smooth transition into college and higher education so they can avoid the difficulties many face.',
  },
]

const timeline = [
  { year: '2025', color: 'bg-primary', border: 'border-t-primary', title: 'Founded in Juba', desc: 'Founded in Juba by three co-founders, working online from day one. Delivered our first client projects and launched the first digital skills training cohort.' },
  { year: '2026', color: 'bg-accent', border: 'border-t-accent', title: 'Growing & Delivering', desc: 'Delivering digital projects for businesses, schools, and NGOs across Juba. Launched the SNC Academy with practical courses in web development, mobile apps, UI/UX, and digital marketing.' },
]

const values = [
  { icon: 'fa-award',        title: 'Excellence',      desc: 'Every line of code, every pixel, every interaction reflects our commitment to work that exceeds expectations.' },
  { icon: 'fa-balance-scale',title: 'Integrity',       desc: 'Transparent pricing, honest timelines, and ethical conduct are non-negotiable in every client relationship.' },
  { icon: 'fa-users',        title: 'Inclusion',       desc: 'We design for accessibility, build for low-bandwidth environments, and create opportunities for underserved communities.' },
  { icon: 'fa-lightbulb',    title: 'Innovation',      desc: 'We bring global best practices to South Sudan and create locally relevant solutions that challenge the status quo.' },
  { icon: 'fa-globe-africa', title: 'Local Impact',    desc: "We measure success by the jobs created, skills transferred, and communities transformed. South Sudan's growth is our growth." },
  { icon: 'fa-chart-line',   title: 'Growth Mindset',  desc: 'We invest continuously in our team, embrace new technologies, and treat every challenge as a chance to improve.' },
]

// The team section is shown on your own machine (npm run dev) but left out of
// the published site until VITE_SHOW_TEAM=true is set for the build — see the
// README. Nothing below needs editing to switch it on.
const SHOW_TEAM = import.meta.env.DEV || import.meta.env.VITE_SHOW_TEAM === 'true'

const team = [
  { name: 'Solomon Leek',    role: 'Founder, CEO & Chief Technology Officer (CTO)', title: 'Software Engineer – Backend & Systems Development', bio: 'Sets the company’s vision and leads its technical architecture, keeping SNC’s systems, databases and APIs secure and scalable.', img: '/images/solomon-leek.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/solomon-leek' }] },
  { name: 'Simon Ariik',     role: 'Co-Founder & Chief Operating Officer (COO)', title: 'Business Operations & Client Relations Manager', bio: 'Oversees client acquisition, finance and project delivery, keeping every engagement on time and on budget.', img: '/images/simon-ariik.jpg', socials: [] },
  { name: 'Genesis Goch',    role: 'Co-Founder & Head of Entrepreneurship', title: 'Business Development & Innovation', bio: 'Identifies new opportunities, builds strategic partnerships and grows SNC’s ventures and Innovation Hub programmes.', img: '/images/genesis-goch.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/genesis-goch' }] },
  { name: 'Philip Bior',     role: 'Design, Branding & Marketing Lead', bio: 'Leads brand identity, visual content and marketing strategy for SNC and the organisations it works with.', img: '/images/team-member4.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/philip-bior' }] },
  { name: 'Nyayath Chol',    role: ['Social Media & Communication Lead', 'Full-stack Engineer'], bio: 'Manages SNC’s digital channels and engagement with clients and partners, and builds features across the front end and back end of SNC’s products.', img: '/images/nyayath-chol.jpg', socials: [] },
  { name: 'Alier Abraham',   role: 'Software Engineer', title: 'Frontend Development & UI/UX Design', bio: 'Designs and develops intuitive, user-centred interfaces for the web platforms SNC builds.', img: '/images/alier-abraham.jpg', socials: [] },
]

// ─── Team ────────────────────────────────────────────────────────────────────
// A plain, still grid: every person visible at once, nothing moving.
function TeamCard({ member }) {
  const { name, role, title, bio, img, icon, socials } = member
  // A person can hold more than one role; each gets its own line.
  const roles = [].concat(role)

  return (
    <motion.article variants={staggerItem} className="card overflow-hidden flex flex-col">
      {img
        ? <Img src={img} alt={`${name}, ${roles.join(" and ")}`} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="w-full aspect-square object-cover object-[50%_20%] bg-gray-100" loading="lazy" />
        : (
          <div className="w-full aspect-square bg-dark flex items-center justify-center" aria-hidden="true">
            <span className="w-20 h-20 rounded-[28%] bg-primary flex items-center justify-center shadow-[0_10px_24px_-8px_rgba(254,127,45,0.6)]">
              <i className={`fas ${icon} text-white text-3xl`} />
            </span>
          </div>
        )}
      <div className="p-6 flex flex-col flex-1">
        <h3 className={`font-heading font-bold text-lg ${img ? 'text-dark' : 'text-muted italic'}`}>{name}</h3>
        <p className={`text-primary text-xs font-bold uppercase tracking-wider ${title ? 'mb-1' : 'mb-3'}`}>{roles.map((r) => <span key={r} className="block">{r}</span>)}</p>
        {title && <p className="text-dark/70 text-xs font-medium mb-3">{title}</p>}
        <p className="text-muted text-sm leading-relaxed flex-1">{bio}</p>
        {socials.length > 0 && (
          <div className="flex gap-3 mt-4">
            {socials.map(({ icon: s, href }) => (
              <a key={s} href={href} target="_blank" rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors" aria-label={`${name} on ${s.replace('fa-', '')}`}>
                <i className={`fab ${s}`} />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}

export default function About() {
  return (
    <>
      <SEO {...pageSeo['/about']} />

      <PageHeader
        tone="dark"
        video="/videos/about-hero.mp4"
        poster="/videos/about-hero-poster.jpg"
        label="Who We Are"
        title="About SNC"
        desc={<>SNC is a tech startup built around <span className="text-primary font-semibold">two commitments</span>.</>}
      >
        {/* The two halves of the mission, side by side */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto mt-10 text-left [text-shadow:none]">
          {commitments.map(({ icon, label, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 + i * 0.15, ease: 'easeOut' }}
              className="rounded-[1.375rem] bg-white/[0.07] backdrop-blur-xl ring-1 ring-inset ring-white/15 p-6 md:p-7"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-11 h-11 rounded-[28%] bg-primary flex items-center justify-center flex-shrink-0 shadow-[0_6px_14px_-6px_rgba(254,127,45,0.6)]">
                  <i className={`fas ${icon} text-white`} />
                </span>
                <div>
                  <p className="text-primary text-[0.7rem] font-bold uppercase tracking-widest">{label}</p>
                  <h2 className="font-heading font-bold text-white text-lg leading-tight">{title}</h2>
                </div>
              </div>
              <p className="text-white/80 text-sm md:text-[0.95rem] leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </PageHeader>

      {/* Mission & Vision */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-motif opacity-[0.05] pointer-events-none" />
        <div className="relative container-page">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div className="bg-primary text-white rounded-2xl p-10"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.75 }}>
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                <i className="fas fa-bullseye text-white text-xl" />
              </div>
              <h2 className="text-xl md:text-2xl font-heading font-black uppercase mb-3">Our Mission</h2>
              <p className="opacity-90 leading-relaxed">To help businesses, organizations and institutions grow through digital solutions, branding and marketing that improve how they work, widen their reach and build lasting trust with their customers, and to give young high school graduates the foundational digital skills for a smooth transition into college and higher education.</p>
            </motion.div>
            <motion.div className="bg-dark text-white rounded-2xl p-10"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.15 }}>
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                <i className="fas fa-eye text-accent text-xl" />
              </div>
              <h2 className="text-xl md:text-2xl font-heading font-black uppercase mb-3">Our Vision</h2>
              <p className="text-white/70 leading-relaxed">To prove that first-rate technology can be built from Juba, where local talent creates products that compete globally, schools and institutions run on systems built by people who understand their reality, and "Built in South Sudan" becomes a mark of excellence recognized far beyond our borders.</p>
            </motion.div>
          </div>

          {/* Our Story */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.75 }}>
              <p className="eyebrow">Our Story</p>
              <h2 className="section-title">Born in Juba, Built for Anywhere</h2>
              <p className="text-muted leading-relaxed mb-4">In 2025, a group of young South Sudanese technologists gathered with one shared frustration: brilliant talent in South Sudan was going unrecognized, unequipped, and underserved by the digital economy.</p>
              <p className="text-muted leading-relaxed mb-4">Organizations across Juba needed websites, apps, and digital systems, but had nowhere local to turn for quality, affordable, context-aware solutions.</p>
              <p className="text-muted leading-relaxed">We started as three co-founders working online, with an unshakeable belief that <strong className="text-primary">Africa's youngest nation deserved the best technology.</strong></p>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.25 }}>
              <Img src="/images/company-story.jpg" alt="Sleek Nexus Creative founding story" className="rounded-2xl shadow-xl w-full h-[400px] object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container-page">
          <div className="text-center mb-14">
            <p className="eyebrow">Our Story So Far</p>
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
                  <h3 className="relative font-heading font-black text-dark text-2xl mb-2">{title}</h3>
                  <p className="relative text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-noise py-12 sm:py-16 bg-primary text-white">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {companyStats.map(({ value, suffix, label }) => (
              <div key={label}>
                <div className="text-4xl font-heading font-black mb-1">
                  {value}{suffix}
                </div>
                <div className="text-white/80 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <div className="text-center mb-10 sm:mb-14">
            <p className="eyebrow">What We Stand For</p>
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

      {/* Team — local preview only, until switched on (see SHOW_TEAM above) */}
      {SHOW_TEAM && (
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container-page">
          <div className="text-center mb-10 sm:mb-14">
            <p className="eyebrow">The People Behind the Work</p>
            <h2 className="section-title">Our Team</h2>
            <p className="section-subtitle">The people driving technology and impact across South Sudan.</p>
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          >
            {team.map((member) => <TeamCard key={member.role} member={member} />)}
          </motion.div>
        </div>
      </section>
      )}

      {/* CTA */}
      <CtaBand
        title="Work With Us"
        desc={"Whether you need a digital solution or want to build your tech skills, we're your partner in growth."}
        primary={{ to: '/contact', label: "Get in Touch" }}
        secondary={{ to: '/services', label: "Our Services" }}
      />
    </>
  )
}
