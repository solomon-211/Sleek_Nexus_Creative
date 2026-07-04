import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'
import { fadeUp } from '../../lib/animations'

const cases = [
  {
    tag: 'E-Learning', tagColor: 'bg-blue-100 text-blue-700',
    img: '/images/project1.jpg',
    client: 'National Schools Initiative — Juba, South Sudan',
    title: 'E-Learning Platform for 12,000+ Students',
    challenge: 'A national education initiative needed a scalable platform serving 50+ schools across three states — including rural areas with unreliable internet.',
    solution: 'We built a Progressive Web App with offline content caching, teacher dashboards, video streaming, automated grading, and SMS notifications that work even with limited connectivity.',
    results: ['12,000+ active student accounts', '300% increase in enrollment', '85% platform adoption in 3 months', '68% of rural users rely on offline mode'],
    tech: ['React.js', 'Node.js', 'MongoDB', 'PWA / Service Workers', 'SMS API'],
  },
  {
    tag: 'Fintech', tagColor: 'bg-green-100 text-green-700',
    img: '/images/project3.jpg',
    client: 'Juba Community Savings & Credit Union',
    title: 'Mobile Banking App for 3,000+ Members',
    challenge: 'A credit union needed to move from paper-based records to a secure digital system with mobile self-service, while integrating with local mobile money networks.',
    solution: 'Built a secure Flutter app with biometric login, transaction history, loan applications, and MTN/Airtel Money integration — plus a web portal for staff.',
    results: ['2,400+ members onboarded in month 1', '90 days from brief to launch', '60% reduction in processing time', 'Zero security incidents in 12 months'],
    tech: ['Flutter', 'Firebase', 'Node.js', 'Mobile Money API', 'PostgreSQL'],
  },
  {
    tag: 'NGO / Humanitarian', tagColor: 'bg-orange-100 text-orange-700',
    img: '/images/project2.jpg',
    client: 'International Humanitarian NGO — South Sudan Operations',
    title: 'Field Program Management Platform',
    challenge: 'Fragmented data across 6 spreadsheets in 5 county offices, with no offline capability and donors requiring specific audit-ready reporting formats.',
    solution: 'Built a full-stack system with role-based access, offline-first mobile data collection, automated donor reports, real-time dashboards, and GPS field mapping.',
    results: ['75% reduction in reporting time', '15,000+ beneficiaries tracked', 'Donor compliance improved to 100%', 'Deployed across 5 counties simultaneously'],
    tech: ['Vue.js', 'Django', 'PostgreSQL', 'Offline Sync', 'Leaflet Maps'],
  },
]

const stats = [
  { icon: 'fa-project-diagram', value: '50+',  label: 'Projects Completed' },
  { icon: 'fa-clock',           value: '90',   label: 'Avg. Days to Launch' },
  { icon: 'fa-star',            value: '98%',  label: 'Client Satisfaction' },
  { icon: 'fa-globe-africa',    value: '5+',   label: 'Sectors Served' },
]

export default function CaseStudies() {
  return (
    <>
      <Helmet>
        <title>Case Studies - Sleek Nexus Creative</title>
        <meta name="description" content="Real problems. Real solutions. Real results. See how SNC delivers measurable digital impact for clients in South Sudan." />
      </Helmet>

      <PageHeader label="Deep Dives" title="Case Studies"
        desc="Real problems. Real solutions. Real results. A behind-the-scenes look at how we work and what we deliver." />

      {/* Stats */}
      <section className="py-14 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(({ icon, value, label }) => (
              <div key={label}>
                <i className={`fas ${icon} text-white/70 text-xl mb-2 block`} />
                <div className="text-3xl font-heading font-black mb-1">{value}</div>
                <div className="text-white/75 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 space-y-16">
          {cases.map(({ tag, tagColor, img, client, title, challenge, solution, results, tech }, i) => (
            <motion.div key={title}
              className="rounded-2xl overflow-hidden shadow-lg border border-gray-100"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}>
              <div className={`grid ${i % 2 === 0 ? 'lg:grid-cols-[380px_1fr]' : 'lg:grid-cols-[1fr_380px]'}`}>
                {/* Image — alternates left/right */}
                <div className={`relative ${i % 2 !== 0 ? 'lg:order-last' : ''}`}>
                  <img src={img} alt={title} className="w-full h-full object-cover min-h-[280px]" loading="lazy" />
                  <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${tagColor}`}>{tag}</span>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-10">
                  <p className="text-primary text-xs font-semibold mb-2">{client}</p>
                  <h2 className="text-2xl font-heading font-bold text-dark mb-6 leading-tight">{title}</h2>

                  <div className="grid sm:grid-cols-2 gap-5 mb-6">
                    {[
                      { label: 'The Challenge', icon: 'fa-exclamation-triangle', content: challenge, bg: 'bg-gray-50' },
                      { label: 'Our Solution',  icon: 'fa-lightbulb',            content: solution,   bg: 'bg-gray-50' },
                    ].map(({ label, icon, content, bg }) => (
                      <div key={label} className={`${bg} rounded-xl p-4`}>
                        <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-2 flex items-center gap-1.5">
                          <i className={`fas ${icon} text-[0.65rem]`} /> {label}
                        </h4>
                        <p className="text-muted text-sm leading-relaxed">{content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 mb-5">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-3 flex items-center gap-1.5">
                      <i className="fas fa-chart-line text-[0.65rem]" /> Results
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-1.5">
                      {results.map(r => (
                        <li key={r} className="flex items-center gap-2 text-sm text-dark-soft font-medium">
                          <i className="fas fa-check-circle text-primary text-xs flex-shrink-0" /> {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {tech.map(t => (
                      <span key={t} className="bg-gray-100 text-dark-soft text-xs font-semibold px-2.5 py-1 rounded-lg">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">How We Work</p>
            <h2 className="section-title">Our Project Approach</h2>
            <p className="section-subtitle">Every project follows the same disciplined, honest process.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'fa-search',      title: 'Discovery First',    desc: 'Deep understanding of your challenge, users, and goals before writing a single line of code.' },
              { icon: 'fa-pencil-ruler',title: 'Thoughtful Design',  desc: 'Every interface designed for real people in real conditions — low bandwidth, diverse devices, local context.' },
              { icon: 'fa-code',        title: 'Clean Engineering',  desc: 'Built with maintainability and scalability so your product keeps working long after launch.' },
              { icon: 'fa-handshake',   title: 'Honest Delivery',    desc: 'Realistic timelines, open communication, and no overpromising what we can\'t deliver.' },
            ].map(({ icon, title, desc }, i) => (
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

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Be Our Next Success Story?</h2>
          <p className="text-gray-300 mb-8">Let's start with a free consultation and build something great together.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Start a Project</Link>
            <Link to="/projects/portfolio" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">View Portfolio</Link>
          </div>
        </div>
      </section>
    </>
  )
}
