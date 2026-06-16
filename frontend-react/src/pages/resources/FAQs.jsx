import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const categories = [
  {
    label: 'Services & Projects',
    icon: 'fa-cogs',
    faqs: [
      { q: 'How long does a typical project take?', a: 'Simple websites take 2–4 weeks. Custom web apps take 1–3 months. Enterprise systems take 3–6+ months. We give you a detailed timeline during your free consultation.' },
      { q: 'What is your pricing structure?', a: 'We offer flexible pricing based on project scope — Starter, Professional, and Enterprise packages. All start with a free consultation and a custom quote tailored to your needs.' },
      { q: 'Do you provide ongoing support after launch?', a: 'Yes. All projects come with post-launch support (30, 90, or 365 days depending on your package). We also offer monthly maintenance retainers.' },
      { q: 'Can you work with our existing systems?', a: 'Absolutely. We specialize in integrations and can connect to your existing databases, payment systems, SMS providers, and third-party APIs.' },
    ],
  },
  {
    label: 'Courses & Training',
    icon: 'fa-graduation-cap',
    faqs: [
      { q: 'Are your courses in-person or online?', a: 'Both. Most courses offer online + in-person hybrid options. Some are fully online. Location is noted on each course listing.' },
      { q: 'Do I need a laptop to attend courses?', a: 'Yes — you\'ll need a laptop or desktop computer. A mid-range laptop (4GB RAM, Core i3 or equivalent) is sufficient for most courses.' },
      { q: 'Are the certificates recognized by employers?', a: 'Our certificates are recognized by our employer network in South Sudan and East Africa. Many graduates have used them to get hired directly after completing their course.' },
      { q: 'Can I pay in installments?', a: 'Yes. We offer payment plans for our longer bootcamps and courses. Contact us to arrange a schedule that works for your budget.' },
    ],
  },
  {
    label: 'Working With SNC',
    icon: 'fa-handshake',
    faqs: [
      { q: 'Where are you located?', a: 'We\'re based in Juba, South Sudan. We work with clients locally and remotely across East Africa and internationally.' },
      { q: 'What makes SNC different from other tech companies?', a: 'We\'re South Sudanese-led, deeply local, and obsessively practical. We design for South Sudan\'s real conditions — mobile-first, low bandwidth, diverse devices — and we don\'t overpromise.' },
      { q: 'How do I start a project with you?', a: 'Fill in our contact form or call us. We\'ll schedule a free 30-minute consultation to understand your needs and propose a solution.' },
      { q: 'Can NGOs and nonprofits get discounts?', a: 'Yes. We have reduced rates for registered nonprofits, community organizations, and educational institutions. Contact us to discuss your situation.' },
    ],
  },
]

export default function FAQs() {
  const [openItem, setOpenItem] = useState(null)

  return (
    <>
      <Helmet><title>FAQs - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Resources" title="Frequently Asked Questions" desc="Answers to the questions we hear most often from clients, students, and partners." />

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          {categories.map(({ label, icon, faqs }, ci) => (
            <div key={label} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <i className={`fas ${icon} text-primary`} />
                </div>
                <h2 className="text-xl font-heading font-bold text-dark">{label}</h2>
              </div>
              <div className="space-y-3">
                {faqs.map(({ q, a }, i) => {
                  const key = `${ci}-${i}`
                  return (
                    <motion.div key={q} className="card overflow-hidden" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                      <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setOpenItem(openItem === key ? null : key)}>
                        <span className="font-semibold text-dark text-sm pr-4">{q}</span>
                        <i className={`fas fa-chevron-down text-primary text-xs flex-shrink-0 transition-transform duration-200 ${openItem === key ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openItem === key && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                            <div className="px-5 pb-5 text-sm text-muted leading-relaxed">{a}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Still Have Questions?</h2>
          <p className="text-gray-300 mb-8">Our team is happy to help — reach out and we'll get back to you within 24 hours.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Contact Us</Link>
            <a href="https://wa.me/211925277700" target="_blank" rel="noopener noreferrer" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">
              <i className="fab fa-whatsapp" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
