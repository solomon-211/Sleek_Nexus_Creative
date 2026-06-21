import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/animations'

const values = [
  { icon: 'fa-award', title: 'Excellence', desc: 'We hold ourselves to the highest professional standards. Every website, app, and training session reflects our commitment to delivering work that exceeds expectations.' },
  { icon: 'fa-balance-scale', title: 'Integrity', desc: 'We do what we say and say what we mean. Transparent pricing, honest timelines, and ethical conduct are non-negotiable in every client relationship.' },
  { icon: 'fa-users', title: 'Inclusion', desc: 'Technology must benefit everyone. We design for accessibility, build for low-bandwidth environments, and actively create opportunities for underserved communities.' },
  { icon: 'fa-lightbulb', title: 'Innovation', desc: 'We question assumptions and challenge the status quo. We bring global best practices to South Sudan and create locally relevant solutions.' },
  { icon: 'fa-globe-africa', title: 'Local Impact', desc: "We measure success not just by project delivery but by the jobs created, skills transferred, and communities transformed. South Sudan's growth is our growth." },
  { icon: 'fa-rocket', title: 'Growth Mindset', desc: 'We never stop learning. We invest continuously in our team\'s development, embrace new technologies, and treat every challenge as a chance to grow.' },
]

const steps = [
  { n: '01', icon: 'fa-search', title: 'Discovery & Analysis', desc: 'We begin by deeply understanding your challenges, objectives, and operational context through stakeholder interviews, data analysis, and market research.' },
  { n: '02', icon: 'fa-lightbulb', title: 'Strategic Planning', desc: 'Our team collaborates with you to design tailored solutions, define clear success metrics, and create a detailed roadmap aligned with your business goals.' },
  { n: '03', icon: 'fa-code', title: 'Agile Development', desc: 'Using iterative development methodologies, we build robust, scalable solutions with continuous testing. Regular demos ensure the solution evolves to meet your needs.' },
  { n: '04', icon: 'fa-rocket', title: 'Deployment & Training', desc: 'We ensure seamless implementation with comprehensive user training, detailed documentation, and hands-on support for smooth adoption.' },
  { n: '05', icon: 'fa-chart-line', title: 'Optimization & Growth', desc: 'Post-launch, we monitor performance metrics, gather user feedback, and provide ongoing support. We continuously optimize and identify scaling opportunities.' },
  { n: '06', icon: 'fa-handshake', title: 'Long-Term Partnership', desc: 'We view every engagement as the beginning of a lasting partnership. Through regular check-ins and proactive maintenance, your technology keeps delivering value.' },
]

const stats = [
  { value: '10+', label: 'Projects Completed' },
  { value: '10+', label: 'Happy Clients' },
  { value: '1+', label: 'Years Experience' },
  { value: '8+', label: 'Team Members' },
]

const team = [
  { name: 'Solomon Leek', role: 'CEO & Founder', bio: 'Visionary entrepreneur with deep expertise in software engineering, strategic business development, and social impact technology.', img: '/images/team-member1.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/solomon-leek' }, { icon: 'fa-twitter', href: 'https://twitter.com/solomon_leek' }] },
  { name: 'Gideon Erioluwa', role: 'CTO', bio: 'Technical architect specializing in cloud infrastructure, AI/ML integration, and enterprise-grade scalable system design.', img: '/images/team-member2.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/gideon-erioluwa' }] },
  { name: 'Genesis Goch', role: 'Lead Developer', bio: 'Senior full-stack engineer specializing in React, Node.js, and database optimization — committed to clean, production-ready code.', img: '/images/team-member3.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/genesis-goch' }] },
  { name: 'Philip Bior', role: 'UX/UI Designer', bio: 'Award-winning designer specializing in human-centered design, rapid prototyping, and crafting intuitive interfaces.', img: '/images/team-member4.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/philip-bior' }, { icon: 'fa-dribbble', href: 'https://dribbble.com/philipbior' }] },
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - Sleek Nexus Creative</title>
        <meta name="description" content="Learn how we help organizations in South Sudan launch dependable websites, apps, and platforms that scale and deliver measurable impact." />
        <meta property="og:title" content="About Us - Sleek Nexus Creative" />
        <meta property="og:description" content="Learn how we help organizations in South Sudan launch dependable websites, apps, and platforms that scale and deliver measurable impact." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://SNC.ss/about" />
        <meta property="og:image" content="https://SNC.ss/images/hero-tech.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - Sleek Nexus Creative" />
        <meta name="twitter:image" content="https://SNC.ss/images/hero-tech.png" />
      </Helmet>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-dark to-dark-soft text-white py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }}>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Building Digital Solutions That Work</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">About Sleek Nexus Creative</h1>
            <p className="text-gray-300 text-lg leading-relaxed">We partner with businesses, institutions, and communities to develop cutting-edge technology solutions that address real challenges and empower South Sudan's future through innovation.</p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-6">Pioneering Digital Transformation Across <span className="text-primary">South Sudan</span></h2>
              <p className="text-muted leading-relaxed mb-4">Sleek Nexus Creative is a forward-thinking digital innovation company dedicated to accelerating South Sudan's transition into the modern digital era. We design and deliver cutting-edge technology solutions that empower businesses, institutions, and communities to thrive in a connected world.</p>
              <p className="text-muted leading-relaxed mb-4">Our work focuses on building reliable digital infrastructure, developing custom software systems, and providing transformative tech services that improve efficiency, transparency, and access to opportunities.</p>
              <p className="text-muted leading-relaxed mb-8">Driven by a mission to bridge the digital divide, Sleek Nexus Creative is committed to nurturing local talent, supporting entrepreneurship, and enabling sustainable development through innovation.</p>
              <div className="flex flex-wrap gap-3">
                {['1+ Year Experience', '10+ Projects Delivered', '10+ Happy Clients', 'South Sudan Based'].map(b => (
                  <span key={b} className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                    <i className="fas fa-check text-[0.65rem]" /> {b}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <img src="/images/company-story.jpg" alt="Our Story" className="rounded-2xl shadow-xl w-full object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values summary */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'fa-bullseye', title: 'Our Mission', desc: 'To engineer transformative technology solutions that address critical real-world challenges, empower underserved communities, and catalyze sustainable economic growth.' },
              { icon: 'fa-eye', title: 'Our Vision', desc: 'To become the most trusted technology partner across East Africa — renowned for turning bold ideas into high-impact digital solutions.' },
              { icon: 'fa-heart', title: 'Our Values', desc: 'Six principles guide every project, every hire, and every decision we make — from how we write code to how we treat our clients and community.' },
            ].map(({ icon, title, desc }, i) => (
              <motion.div key={title} className="card p-8 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${icon} text-primary text-xl`} />
                </div>
                <h3 className="font-heading font-bold text-dark text-lg mb-3">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">The Six Pillars</p>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">These aren't words on a wall. They shape every project, every hire, and every line of code we write.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon, title, desc }, i) => (
              <motion.div key={title} className="card p-6" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
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

      {/* Process */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">How We Work</p>
            <h2 className="section-title">Our Problem-Solving Approach</h2>
            <p className="section-subtitle">A strategic framework for delivering transformative solutions.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map(({ n, icon, title, desc }, i) => (
              <motion.div key={title} className="card p-6" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-heading font-black text-primary/20">{n}</span>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <i className={`fas ${icon} text-primary text-sm`} />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
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

      {/* Team */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">The People Behind The Work</p>
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">The exceptional talent driving innovation and impact across South Sudan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, bio, img, socials }, i) => (
              <motion.div key={name} className="card overflow-hidden" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <img src={img} alt={name} className="w-full h-52 object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="font-heading font-bold text-dark">{name}</h3>
                  <p className="text-primary text-xs font-semibold mb-2">{role}</p>
                  <p className="text-muted text-xs leading-relaxed mb-4">{bio}</p>
                  <div className="flex gap-3">
                    {socials.map(({ icon, href }) => (
                      <a key={icon} href={href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label={icon.replace('fa-', '')}>
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
      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Shape South Sudan's Digital Future?</h2>
          <p className="text-gray-300 mb-8">We're actively seeking exceptional talent who share our passion for innovation and social impact.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/careers" className="btn-primary">View Open Positions</Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Get In Touch</Link>
          </div>
        </div>
      </section>
    </>
  )
}
