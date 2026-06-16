import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const downloads = [
  { icon: 'fa-file-pdf', tag: 'Guide', color: 'text-red-500 bg-red-50', title: 'Website Project Brief Template', desc: 'Use this template to define your website requirements before approaching a developer. Saves time and money.', size: '245 KB', format: 'PDF' },
  { icon: 'fa-file-excel', tag: 'Template', color: 'text-green-600 bg-green-50', title: 'Project Budget Calculator (Excel)', desc: 'Estimate your software project budget with this structured spreadsheet — ideal for NGOs and small businesses.', size: '180 KB', format: 'XLSX' },
  { icon: 'fa-file-pdf', tag: 'Checklist', color: 'text-red-500 bg-red-50', title: 'Website Launch Checklist', desc: '40-point checklist covering SEO, performance, security, and accessibility before going live.', size: '120 KB', format: 'PDF' },
  { icon: 'fa-file-pdf', tag: 'Guide', color: 'text-red-500 bg-red-50', title: 'Digital Transformation Readiness Assessment', desc: 'A self-assessment tool for organizations to evaluate their readiness for digital transformation.', size: '310 KB', format: 'PDF' },
  { icon: 'fa-file-powerpoint', tag: 'Template', color: 'text-orange-500 bg-orange-50', title: 'Tech Proposal Presentation Template', desc: 'Professional PowerPoint template for presenting technology proposals to management or donors.', size: '2.1 MB', format: 'PPTX' },
  { icon: 'fa-file-pdf', tag: 'Cheatsheet', color: 'text-red-500 bg-red-50', title: 'JavaScript ES6+ Quick Reference', desc: 'One-page cheatsheet covering arrow functions, destructuring, promises, async/await, and more.', size: '95 KB', format: 'PDF' },
  { icon: 'fa-file-pdf', tag: 'Checklist', color: 'text-red-500 bg-red-50', title: 'Cybersecurity Checklist for SMEs', desc: '20-point security checklist for small organizations — practical, low-cost, implementable this week.', size: '88 KB', format: 'PDF' },
  { icon: 'fa-file-excel', tag: 'Template', color: 'text-green-600 bg-green-50', title: 'Training Program Planning Template', desc: 'Structured Excel template for planning tech training programs including schedule, budget, and outcomes.', size: '215 KB', format: 'XLSX' },
]

export default function Downloads() {
  return (
    <>
      <Helmet><title>Downloads - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Resources" title="Free Downloads" desc="Templates, checklists, guides, and tools to help you plan, build, and manage technology projects more effectively." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Free to Use</p>
            <h2 className="section-title">Templates & Tools</h2>
            <p className="section-subtitle">All downloads are free — no email required. Use them however helps your work.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {downloads.map(({ icon, tag, color, title, desc, size, format }, i) => (
              <motion.div key={title} className="card p-5 flex flex-col" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                    <i className={`fas ${icon} text-lg`} />
                  </div>
                  <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">{tag}</span>
                </div>
                <h3 className="font-heading font-bold text-dark text-sm mb-2">{title}</h3>
                <p className="text-muted text-xs leading-relaxed flex-1 mb-4">{desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-muted">{format} · {size}</span>
                  <Link to="/contact" className="text-primary text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                    <i className="fas fa-download text-xs" /> Download
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Need Something Custom?</h2>
          <p className="text-gray-300 mb-8">We create custom templates, process documents, and training materials for organizations on request.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Get in Touch</Link>
            <Link to="/guides" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Browse Guides</Link>
          </div>
        </div>
      </section>
    </>
  )
}
