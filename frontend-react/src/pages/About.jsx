import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/animations'
import SEO from '../components/ui/SEO'

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
  { name: 'Solomon Leek', role: 'CEO & Founder', bio: 'Founder of SNC with a background in software engineering and a passion for building practical digital solutions for South Sudan.', img: '/images/team-member1.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/solomon-leek' }, { icon: 'fa-twitter', href: 'https://twitter.com/solomon_leek' }] },
  { name: 'Gideon Erioluwa', role: 'CTO', bio: 'Leads technical architecture and development. Experienced in building web and mobile systems with a focus on reliability and performance.', img: '/images/team-member2.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/gideon-erioluwa' }] },
  { name: 'Genesis Goch', role: 'Lead Developer', bio: 'Full-stack developer specializing in React and Node.js, focused on writing clean, maintainable code that solves real problems.', img: '/images/team-member3.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/genesis-goch' }] },
  { name: 'Philip Bior', role: 'UX/UI Designer', bio: 'Designs user interfaces and experiences for SNC client products, with a focus on simplicity and usability in low-bandwidth environments.', img: '/images/team-member4.jpg', socials: [{ icon: 'fa-linkedin', href: 'https://linkedin.com/in/philip-bior' }] },
]

export default function About() {
  return (
    <>
      <SEO
        title="About Us — Technology & Innovation, Juba South Sudan"
        description="Learn about Sleek Nexus Creative — a technology, innovation, and leadership organisation based in Juba, South Sudan. We build digital solutions and empower the next generation."
        canonical="/about"
        image="https://sleeknexuscreative.com/images/company-story.jpg"
        imageAlt="Sleek Nexus Creative team in Juba, South Sudan"
        breadcrumbs={[{ name: 'About', url: '/about' }]}
      />

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
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-6">Building Digital Solutions for <span className="text-primary">South Sudan</span></h2>
              <p className="text-muted leading-relaxed mb-4">Sleek Nexus Creative (SNC) is a technology, innovation, and leadership organisation dedicated to accelerating digital transformation while empowering the next generation of innovators, entrepreneurs, and changemakers.</p>
              <p className="text-muted leading-relaxed mb-4">We combine professional technology services, educational programs, entrepreneurship support, and community impact initiatives to create practical solutions that address local challenges.</p>
              <p className="text-muted leading-relaxed mb-8">Through collaboration and continuous learning, SNC works to bridge the gap between talent, technology, and opportunity across South Sudan.</p>
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
              { icon: 'fa-bullseye', title: 'Our Mission', desc: 'To empower individuals, startups, organisations, and communities through innovative technology solutions, leadership development, entrepreneurship, future-ready skills, and community-driven innovation that drive sustainable social and economic transformation.' },
              { icon: 'fa-eye', title: 'Our Vision 2040', desc: 'By 2040, SNC will be a recognized technology and leadership organization in South Sudan — directly empowering 5,000+ individuals and reaching 30,000+ people through education, innovation, entrepreneurship, and community impact.' },
              { icon: 'fa-heart', title: 'Our Values', desc: 'Six principles guide every project, every hire, and every decision — Excellence, Integrity, Inclusion, Innovation, Local Impact, and Growth Mindset. They shape how we write code, treat clients, and serve our community.' },
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
