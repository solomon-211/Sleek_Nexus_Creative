import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const timeline = [
  { year: '2024', color: 'bg-primary', title: 'Founded in Juba', desc: "Officially registered in South Sudan. First team of 4 co-founders begins operations from a co-working space in Juba's city center. Delivered first client projects and launched the initial training cohort." },
  { year: '2025', color: 'bg-accent', title: 'Growing & Expanding', desc: 'Delivering digital projects across South Sudan. Launched the SNC Academy with certified courses in web development, mobile apps, UI/UX, and digital marketing. Expanding services across East Africa.' },
]

const values = [
  { icon: 'fa-seedling', title: 'Local First', desc: 'Every solution is designed with the local context in mind — bandwidth, language, culture, and user behavior.' },
  { icon: 'fa-star', title: 'Uncompromising Quality', desc: 'Whether it\'s a small NGO website or a national-level platform, we bring the same discipline and craftsmanship.' },
  { icon: 'fa-graduation-cap', title: 'Education as Impact', desc: 'Training the next generation is central to our mission. The best investment in South Sudan is its people.' },
  { icon: 'fa-handshake', title: 'Honest Partnerships', desc: 'Transparent pricing, clear timelines, honest communication — always. We don\'t overpromise and underdeliver.' },
  { icon: 'fa-bolt', title: 'Innovation Without Borders', desc: 'We bring world-class thinking to South Sudan and export South Sudanese talent to the world.' },
  { icon: 'fa-users', title: 'Community-Centered', desc: 'We measure success in jobs created, skills transferred, and communities transformed by technology.' },
]

export default function OurStory() {
  return (
    <>
      <Helmet><title>Our Story - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Who We Are" title="Our Story" desc="From a small team in Juba to South Sudan's leading digital innovation company — here's how it all began." />

      {/* Origin */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">The Beginning</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-6">Born in Juba, Built for South Sudan</h2>
              <p className="text-muted leading-relaxed mb-4">In 2024, a group of young South Sudanese technologists and educators gathered with one shared frustration: brilliant talent in South Sudan was going unrecognized, unequipped, and underserved by the digital economy.</p>
              <p className="text-muted leading-relaxed mb-4">Organizations across Juba desperately needed websites, apps, and digital systems — but had nowhere local to turn for quality, affordable, and context-aware solutions.</p>
              <p className="text-muted leading-relaxed mb-4">So we built Sleek Nexus Creative — a company that would deliver world-class technology solutions and train the next generation of South Sudanese developers, designers, and digital professionals.</p>
              <p className="text-muted leading-relaxed">We started with two laptops, one co-working space, and an unshakeable belief that <strong className="text-primary">Africa's youngest nation deserved the best technology.</strong></p>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <img src="/images/company-story.jpg" alt="Our Story" className="rounded-2xl shadow-xl w-full h-[420px] object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Our Journey</p>
            <h2 className="section-title">Our Journey So Far</h2>
            <p className="section-subtitle">Every milestone represents a commitment kept to the people of South Sudan.</p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-accent -translate-x-1/2 hidden md:block" />
            {timeline.map(({ year, color, title, desc }, i) => (
              <motion.div key={year} className={`relative flex mb-10 ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className={`w-full md:w-[45%] bg-white rounded-xl p-6 shadow-md ${i % 2 === 0 ? 'border-l-4 border-primary' : 'border-l-4 border-accent'}`}>
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

      {/* Values */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">What We Stand For</p>
            <h2 className="section-title">Our Core Values</h2>
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

      {/* Dark section */}
      <section className="py-24 bg-dark text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <img src="/images/NSC.jpg" alt="SNC team" className="rounded-2xl shadow-2xl w-full h-[380px] object-cover" loading="lazy" />
            <div>
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-4">Our Promise</p>
              <h2 className="text-3xl font-heading font-bold mb-6">We're not just building websites. We're building South Sudan's digital future.</h2>
              <p className="text-gray-300 leading-relaxed mb-4">Every student we train is a future job creator. Every platform we build enables a community to access services, share knowledge, and grow.</p>
              <p className="text-gray-300 leading-relaxed mb-8">That responsibility drives us to keep pushing, keep building, and keep investing in the talent and technology this nation deserves.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/about/team" className="btn-primary">Meet Our Team</Link>
                <Link to="/about/mission-vision" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Our Mission</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Be Part of the Story?</h2>
          <p className="text-gray-300 mb-8">Whether you need a digital solution or want to build your tech skills, we're your partner in growth.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Get in Touch</Link>
            <Link to="/courses" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Browse Courses</Link>
          </div>
        </div>
      </section>
    </>
  )
}
