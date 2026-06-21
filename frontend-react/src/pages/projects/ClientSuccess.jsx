import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const testimonials = [
  {
    quote: 'Sleek Nexus Creative transformed how we deliver education to our students. The platform they built has made it possible for us to reach learners in remote areas who previously had no access to quality digital learning resources.',
    name: 'Dr. Rebecca Akuei',
    role: 'Director, Education Institute Juba',
    result: '100+ students reached',
    img: '/images/team-member1.jpg',
  },
  {
    quote: "The mobile banking app they delivered was exactly what we needed — lightweight, secure, and it actually works on our customers' low-end phones. Our customers love how simple and reliable it is.",
    name: 'Michael Deng',
    role: 'CEO, Financial Services Company',
    result: '500+ downloads in first month',
    img: '/images/team-member2.jpg',
  },
  {
    quote: "Before working with SNC, we were managing everything in spreadsheets. Now we have a real system. The difference in efficiency is night and day — we've cut manual reporting time by 3 hours every single day.",
    name: 'Grace Ayen',
    role: 'Operations Manager, Multi-Branch Retail',
    result: '70% reduction in stock errors',
    img: '/images/team-member3.jpg',
  },
  {
    quote: 'What impressed us most was that SNC actually understood our context. They didn\'t just copy-paste solutions from elsewhere — they designed something that fits how our staff works and what our community needs.',
    name: 'Pastor James Lado',
    role: 'Director, Community NGO',
    result: 'Platform serving 3 districts',
    img: '/images/team-member4.jpg',
  },
]

const stats = [
  { value: '10+', label: 'Happy Clients' },
  { value: '95%', label: 'Client Retention Rate' },
  { value: '100%', label: 'On-Time Delivery' },
  { value: '24hr', label: 'Average Response Time' },
]

export default function ClientSuccess() {
  return (
    <>
      <Helmet><title>Client Success Stories - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Social Proof" title="Client Success Stories" desc="Real results from real organizations. Here's what our clients say about working with Sleek Nexus Creative." />

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

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">What Our Clients Say</p>
            <h2 className="section-title">Real Words from Real Partners</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map(({ quote, name, role, result, img }, i) => (
              <motion.div key={name} className="card p-8" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <i className="fas fa-quote-left text-primary/20 text-4xl mb-4 block" />
                <p className="text-muted leading-relaxed mb-6 italic">"{quote}"</p>
                <div className="inline-flex items-center gap-1.5 bg-primary/5 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-5">
                  <i className="fas fa-chart-line text-[0.6rem]" /> {result}
                </div>
                <div className="flex items-center gap-3">
                  <img src={img} alt={name} className="w-12 h-12 rounded-full object-cover" loading="lazy" />
                  <div>
                    <p className="font-semibold text-dark text-sm">{name}</p>
                    <p className="text-muted text-xs">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Add Your Success Story?</h2>
          <p className="text-gray-300 mb-8">Join 10+ organizations that trust Sleek Nexus Creative to power their digital presence.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Start a Project</Link>
            <Link to="/projects/case-studies" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Read Case Studies</Link>
          </div>
        </div>
      </section>
    </>
  )
}
