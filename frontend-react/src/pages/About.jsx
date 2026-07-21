import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, staggerItem } from '../lib/animations'
import SEO from '../components/ui/SEO'

const timeline = [
  { year: '2024', color: 'bg-primary', border: 'border-primary', title: 'Founded in Juba', desc: 'Officially registered in South Sudan. First team of 4 co-founders begins operations from a co-working space in Juba. Delivered first client projects and launched the initial training cohort.' },
  { year: '2025', color: 'bg-accent', border: 'border-accent', title: 'Growing & Delivering', desc: 'Delivering digital projects for businesses, schools, and NGOs across Juba. Launched the SNC Academy with practical courses in web development, mobile apps, UI/UX, and digital marketing.' },
]

const values = [
  { icon: 'fa-award',        title: 'Excellence',      desc: 'Every line of code, every pixel, every interaction reflects our commitment to work that exceeds expectations.' },
  { icon: 'fa-balance-scale',title: 'Integrity',       desc: 'Transparent pricing, honest timelines, and ethical conduct are non-negotiable in every client relationship.' },
  { icon: 'fa-users',        title: 'Inclusion',       desc: 'We design for accessibility, build for low-bandwidth environments, and create opportunities for underserved communities.' },
  { icon: 'fa-lightbulb',    title: 'Innovation',      desc: 'We bring global best practices to South Sudan and create locally relevant solutions that challenge the status quo.' },
  { icon: 'fa-globe-africa', title: 'Local Impact',    desc: "We measure success by the jobs created, skills transferred, and communities transformed. South Sudan's growth is our growth." },
  { icon: 'fa-chart-line',   title: 'Growth Mindset',  desc: 'We invest continuously in our team, embrace new technologies, and treat every challenge as a chance to improve.' },
]

const team = [
  { name: 'Solomon Leek',    role: 'CEO & Founder',   bio: 'Founder of SNC with a background in software engineering and a passion for building practical digital solutions for South Sudan.', img: '/images/team-member1.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/solomon-leek' }] },
  { name: 'Gideon Erioluwa', role: 'CTO',             bio: 'Leads technical architecture and development. Experienced in building web and mobile systems with a focus on reliability and performance.', img: '/images/team-member2.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/gideon-erioluwa' }] },
  { name: 'Genesis Goch',    role: 'Lead Developer',  bio: 'Full-stack developer specializing in React and Node.js, focused on writing clean, maintainable code that solves real problems.', img: '/images/team-member3.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/genesis-goch' }] },
  { name: 'Philip Bior',     role: 'UX/UI Designer',  bio: 'Designs user interfaces and experiences for SNC client products, with a focus on simplicity and usability in low-bandwidth environments.', img: '/images/team-member4.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/philip-bior' }] },
]

const stats = [
  { value: '10+', label: 'Projects Delivered' },
  { value: '50+', label: 'Learners Supported' },
  { value: '5+',  label: 'Partner Organizations' },
  { value: '1+',  label: 'Years Operating' },
]

export default function About() {
  return (
    <>
      <SEO
        title="About Us — Sleek Nexus Creative, Juba South Sudan"
        description="Learn about Sleek Nexus Creative — a technology and innovation company based in Juba, South Sudan. Our story, mission, values, and the team behind the work."
        canonical="/about"
        image="https://sleeknexuscreative.com/images/company-story.jpg"
        imageAlt="Sleek Nexus Creative team in Juba, South Sudan"
        breadcrumbs={[{ name: 'About', url: '/about' }]}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-dark to-dark-soft text-white py-16 sm:py-24 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }}>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Who We Are</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">About Sleek Nexus Creative</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              A technology company based in Juba, South Sudan — building practical digital solutions for businesses, schools, NGOs, and public institutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-10"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                <i className="fas fa-bullseye text-white text-xl" />
              </div>
              <h2 className="text-xl font-heading font-bold mb-3">Our Mission</h2>
              <p className="opacity-90 leading-relaxed">To empower individuals, organizations, and communities across South Sudan through practical digital solutions, technology education, and creative innovation — bridging the gap between local needs and modern standards.</p>
            </motion.div>
            <motion.div className="bg-gradient-to-br from-dark to-dark-soft text-white rounded-2xl p-10 border border-white/10"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                <i className="fas fa-eye text-accent text-xl" />
              </div>
              <h2 className="text-xl font-heading font-bold mb-3">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed">A South Sudan where every organization can harness the full power of technology, where every young person has access to quality tech education, and where locally-built digital solutions drive economic growth nationwide.</p>
            </motion.div>
          </div>

          {/* Our Story */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-6">Born in Juba, Built for South Sudan</h2>
              <p className="text-muted leading-relaxed mb-4">In 2024, a group of young South Sudanese technologists gathered with one shared frustration: brilliant talent in South Sudan was going unrecognized, unequipped, and underserved by the digital economy.</p>
              <p className="text-muted leading-relaxed mb-4">Organizations across Juba needed websites, apps, and digital systems — but had nowhere local to turn for quality, affordable, context-aware solutions.</p>
              <p className="text-muted leading-relaxed">We started with two laptops, one co-working space, and an unshakeable belief that <strong className="text-primary">Africa's youngest nation deserved the best technology.</strong></p>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
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
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-accent -translate-x-1/2 hidden md:block" />
            {timeline.map(({ year, color, border, title, desc }, i) => (
              <motion.div key={year} className={`relative flex mb-10 ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className={`w-full md:w-[45%] bg-white rounded-xl p-6 shadow-md border-l-4 ${border}`}>
                  <span className={`text-xs font-black px-3 py-1 rounded-full text-white ${color}`}>{year}</span>
                  <h3 className="font-heading font-bold text-dark mt-3 mb-2">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
                <div className={`absolute left-1/2 top-5 w-4 h-4 rounded-full border-2 border-white -translate-x-1/2 hidden md:block ${color}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
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

      {/* Team */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">The People Behind the Work</p>
            <h2 className="section-title">Our Team</h2>
            <p className="section-subtitle">The people driving technology and impact across South Sudan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, bio, img, socials }, i) => (
              <motion.div key={name} className="card overflow-hidden"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <img src={img} alt={name} className="w-full h-52 object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="font-heading font-bold text-dark">{name}</h3>
                  <p className="text-primary text-xs font-semibold mb-2">{role}</p>
                  <p className="text-muted text-xs leading-relaxed mb-4">{bio}</p>
                  <div className="flex gap-3">
                    {socials.map(({ icon, href }) => (
                      <a key={icon} href={href} target="_blank" rel="noopener noreferrer"
                        className="text-muted hover:text-primary transition-colors" aria-label={icon.replace('fa-', '')}>
                        <i className={`fab ${icon}`} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Work With Us</h2>
          <p className="text-gray-300 mb-8">Whether you need a digital solution or want to build your tech skills, we're your partner in growth.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Get in Touch</Link>
            <Link to="/services" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Our Services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
