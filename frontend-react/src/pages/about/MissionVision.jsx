import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const values = [
  { icon: 'fa-award', title: 'Excellence', desc: 'We hold ourselves to the highest standards. Every line of code, every pixel, every interaction reflects our commitment to delivering work that exceeds expectations.' },
  { icon: 'fa-balance-scale', title: 'Integrity', desc: 'We do what we say, and we say what we mean. Honest communication, transparent billing, and ethical conduct are non-negotiable in every partnership.' },
  { icon: 'fa-users', title: 'Inclusion', desc: 'Technology should benefit everyone. We actively design for accessibility, build for low-bandwidth environments, and create learning opportunities for underserved communities.' },
  { icon: 'fa-lightbulb', title: 'Innovation', desc: "We question assumptions and challenge the status quo. We embrace new tools and creative approaches to solving South Sudan's unique digital challenges." },
  { icon: 'fa-globe-africa', title: 'Local Impact', desc: 'Our work is measured not just by client satisfaction, but by the real change it creates in South Sudanese communities — jobs, access, efficiency, and opportunity.' },
  { icon: 'fa-rocket', title: 'Growth Mindset', desc: "We never stop learning. We invest in our team's professional development and treat every challenge as an opportunity to get better." },
]

const stats = [
  { value: '50+', label: 'Youth Trained', color: 'text-primary' },
  { value: '10+', label: 'Projects Built', color: 'text-accent' },
  { value: '20+', label: 'Jobs Created', color: 'text-primary' },
  { value: '5+', label: 'Partner Organizations', color: 'text-accent' },
]

const impacts = [
  { title: 'Digital Inclusion', color: 'border-primary', desc: 'We\'ve built platforms that allow South Sudanese organizations to serve their communities digitally — from healthcare NGOs to schools to microfinance institutions.' },
  { title: 'Youth Employment', color: 'border-accent', desc: 'Through our training programs, we have helped place 20+ young South Sudanese into tech jobs, internships, and freelance careers. We\'re building the workforce South Sudan needs.' },
  { title: 'Organizational Capacity', color: 'border-primary', desc: 'From manual spreadsheets to digital systems — we have helped NGOs, community organizations, and small businesses operate more efficiently with technology.' },
]

export default function MissionVision() {
  return (
    <>
      <Helmet><title>Mission & Vision - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Purpose & Direction" title="Mission & Vision" desc="The principles that guide our work, our hiring, our products, and our impact across South Sudan and beyond." />

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-12" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 text-3xl">
                <i className="fas fa-bullseye" />
              </div>
              <h2 className="text-2xl font-heading font-bold mb-4">Our Mission</h2>
              <p className="opacity-90 leading-relaxed text-lg">To empower individuals, organizations, and communities across South Sudan through practical digital solutions, technology education, and creative innovation — bridging the gap between local needs and modern standards.</p>
            </motion.div>
            <motion.div className="bg-gradient-to-br from-accent to-orange-600 text-white rounded-2xl p-12" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 text-3xl">
                <i className="fas fa-eye" />
              </div>
              <h2 className="text-2xl font-heading font-bold mb-4">Our Vision</h2>
              <p className="opacity-90 leading-relaxed text-lg">A South Sudan where every organization can harness the full power of technology, where every young person has access to quality tech education, and where locally-built digital solutions drive economic growth and social progress nationwide.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">The Foundation</p>
            <h2 className="section-title">Core Values</h2>
            <p className="section-subtitle">Six values that every team member lives by, every single day.</p>
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

      {/* Impact */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Real Change</p>
            <h2 className="section-title">Our Impact on South Sudan</h2>
            <p className="section-subtitle">Numbers tell part of the story. The people behind them tell the rest.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {impacts.map(({ title, color, desc }) => (
                <div key={title} className={`border-l-4 ${color} pl-6`}>
                  <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                  <p className="text-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-dark to-dark-soft rounded-2xl p-12 text-white">
              <h3 className="text-accent text-xl font-bold mb-8">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-8 text-center">
                {stats.map(({ value, label, color }) => (
                  <div key={label}>
                    <div className={`text-4xl font-heading font-black ${color} mb-1`}>{value}</div>
                    <div className="text-white/70 text-sm">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Aligned With Our Mission? Let's Work Together.</h2>
          <p className="text-gray-300 mb-8">Whether you're an organization seeking digital solutions or an individual wanting to build tech skills, our door is open.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Start a Conversation</Link>
            <Link to="/about/our-story" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Read Our Story</Link>
          </div>
        </div>
      </section>
    </>
  )
}
