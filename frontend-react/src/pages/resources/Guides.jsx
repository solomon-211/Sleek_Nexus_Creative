import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const guides = [
  { icon: 'fa-globe', tag: 'Web', title: 'How to Build a Website for Your South Sudan Business', desc: 'A step-by-step guide covering domain, hosting, design, content, and launch — with South Sudan-specific tips on hosting choices and payment integration.', read: '10 min read' },
  { icon: 'fa-mobile-alt', tag: 'Mobile', title: 'Mobile App Development: From Idea to App Store', desc: 'Everything you need to know to take a mobile app idea through planning, design, development, and a successful launch on iOS and Android.', read: '15 min read' },
  { icon: 'fa-shield-alt', tag: 'Security', title: 'Cybersecurity Basics for Small Organizations in Juba', desc: 'A practical, jargon-free guide to protecting your organization\'s data, accounts, and systems from the most common cyber threats.', read: '8 min read' },
  { icon: 'fa-graduation-cap', tag: 'EdTech', title: 'Choosing the Right E-Learning Platform for Your School', desc: 'A comparison of LMS options available in South Sudan, including cost, offline support, and integration with existing school systems.', read: '12 min read' },
  { icon: 'fa-cloud', tag: 'Cloud', title: 'Getting Started with Cloud Computing for South Sudan Businesses', desc: 'Understand what cloud computing means for your organization and how to take your first steps toward more reliable, scalable infrastructure.', read: '9 min read' },
  { icon: 'fa-chart-bar', tag: 'Data', title: 'Using Data to Make Better Decisions at Your NGO', desc: 'A practical guide for NGO program managers on collecting, analyzing, and acting on data to improve program outcomes and donor reporting.', read: '11 min read' },
]

export default function Guides() {
  return (
    <>
      <Helmet><title>Guides - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Resources" title="Guides & How-Tos" desc="In-depth practical guides that walk you through real tech decisions and implementations relevant to South Sudan." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Practical Knowledge</p>
            <h2 className="section-title">Guides That Get Things Done</h2>
            <p className="section-subtitle">Written by our engineers and consultants for builders, leaders, and learners in South Sudan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map(({ icon, tag, title, desc, read }, i) => (
              <motion.div key={title} className="card p-6 flex flex-col" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <i className={`fas ${icon} text-primary`} />
                  </div>
                  <span className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed flex-1 mb-4">{desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-muted flex items-center gap-1"><i className="fas fa-clock text-primary" /> {read}</span>
                  <a href="#" className="text-primary text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">Read Guide <i className="fas fa-arrow-right text-xs" /></a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Need Help Implementing Something?</h2>
          <p className="text-gray-300 mb-8">Our team is available for free consultations to help you apply what you've learned.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Get Free Consultation</Link>
            <Link to="/blog" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Read Our Blog</Link>
          </div>
        </div>
      </section>
    </>
  )
}
