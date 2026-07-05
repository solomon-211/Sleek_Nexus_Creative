import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/animations'
import PageHeader from '../../components/ui/PageHeader'

const benefits = [
  { icon: 'fa-briefcase',          title: 'Career Support',         desc: 'Get access to job referrals, employer introductions, and career guidance from the SNC team long after you graduate.' },
  { icon: 'fa-chalkboard-teacher', title: 'Mentorship Access',      desc: 'Connect with experienced mentors in tech, design, and business who can guide your next career move.' },
  { icon: 'fa-certificate',        title: 'Verified Credentials',   desc: 'Receive a verifiable digital certificate that proves your skills to employers and clients.' },
  { icon: 'fa-calendar-alt',       title: 'Events & Workshops',     desc: 'Get invited to exclusive alumni workshops, industry talks, hackathons, and networking evenings in Juba.' },
  { icon: 'fa-users',              title: 'Graduate Community',     desc: 'Stay connected with fellow graduates through our WhatsApp and online community groups.' },
  { icon: 'fa-hand-holding-heart', title: 'Give Back',              desc: 'Volunteer as a guest speaker, mentor, or trainer to help the next generation of South Sudanese tech talent.' },
]

const pathways = [
  { step: '01', icon: 'fa-graduation-cap', title: 'Complete Your Course',   desc: 'Finish your SNC program and receive your certificate of completion.' },
  { step: '02', icon: 'fa-id-card',        title: 'Join the Alumni Network', desc: 'Fill in the stay-connected form below and we will add you to the alumni community.' },
  { step: '03', icon: 'fa-rocket',         title: 'Launch Your Career',      desc: 'Use your skills, network, and SNC support to land your first role or freelance client.' },
  { step: '04', icon: 'fa-hands-helping',  title: 'Come Back & Contribute',  desc: 'Return as a mentor, trainer, or partner to help grow the next cohort of graduates.' },
]

const faqs = [
  { q: 'Who qualifies as an SNC alumnus?',             a: 'Anyone who has completed at least one course or training program at Sleek Nexus Creative qualifies to join the alumni network.' },
  { q: 'Is there a fee to join the alumni network?',   a: 'No. Joining the SNC alumni network is completely free for all graduates.' },
  { q: 'How do I get my certificate after graduating?', a: 'Certificates are issued within 7 days of completing your program. Contact us at info@sleeknexuscreative.com if you have not received yours.' },
  { q: 'Can alumni access new courses at a discount?', a: 'Yes. SNC alumni receive a discount on all future courses and workshops. Reach out to us for your alumni discount code.' },
  { q: 'How can I become a mentor or trainer?',        a: 'Fill in the stay-connected form below and select "Mentor / Trainer" as your interest. Our team will follow up with next steps.' },
]

export default function Alumni() {
  const [openFaq, setOpenFaq] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', course: '', year: '', interest: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Helmet>
        <title>Alumni Network — Sleek Nexus Creative</title>
        <meta name="description" content="Stay connected with Sleek Nexus Creative after graduation. Access career support, mentorship, events, and the growing SNC alumni community in South Sudan." />
      </Helmet>

      <PageHeader
        label="SNC Graduates"
        title="Alumni Network"
        desc="Graduating from SNC is just the beginning. Stay connected, grow your career, and help shape the next generation of South Sudanese tech talent."
      />

      {/* Stats */}
      <section className="py-14 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              ['50+',     'Learners Trained'],
              ['2024',    'Year Established'],
              ['Juba',    'Based in South Sudan'],
              ['Free',    'To Join the Network'],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="text-3xl font-heading font-black mb-1">{v}</div>
                <div className="text-white/75 text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">What You Get</p>
            <h2 className="section-title">Alumni Benefits</h2>
            <p className="section-subtitle">Being part of the SNC alumni network comes with real, ongoing value — not just a certificate.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ icon, title, desc }, i) => (
              <motion.div key={title} className="card p-6"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-primary text-lg`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathway */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Your Journey</p>
            <h2 className="section-title">The Alumni Pathway</h2>
            <p className="section-subtitle">From your first class to becoming a community leader — here is how it works.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pathways.map(({ step, icon, title, desc }, i) => (
              <motion.div key={step} className="card p-6 text-center"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="text-5xl font-heading font-black text-primary/10 mb-3">{step}</div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${icon} text-primary text-lg`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <motion.div className="text-center mb-12" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Common Questions</p>
            <h2 className="section-title">Alumni FAQs</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <motion.div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.06 }}>
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-dark text-sm hover:text-primary transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {q}
                  <i className={`fas fa-chevron-down text-primary text-xs ml-4 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-muted text-sm leading-relaxed border-t border-gray-100 pt-3">{a}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Connected Form */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <motion.div className="text-center mb-10" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Stay Connected</p>
            <h2 className="section-title">Join the Alumni Network</h2>
            <p className="section-subtitle">Let us know you graduated and how you want to stay involved. We will be in touch.</p>
          </motion.div>

          {submitted ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
              <i className="fas fa-check-circle text-green-500 text-5xl mb-4 block" />
              <h3 className="font-heading font-bold text-dark text-xl mb-2">You're In!</h3>
              <p className="text-muted text-sm mb-6">Thanks for staying connected. Our team will reach out within 2 business days.</p>
              <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm">Submit Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-dark-soft mb-1">Full Name *</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-dark-soft mb-1">Email Address *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-dark-soft mb-1">Course Completed</label>
                  <select value={form.course} onChange={e => setForm({ ...form, course: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                    <option value="">Select a course…</option>
                    {['Web Development Fundamentals', 'Full-Stack Web Development Bootcamp', 'Mobile App Development', 'UI/UX Design', 'Data Analysis', 'Digital Marketing', 'IT Support & Networking', 'Other'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-dark-soft mb-1">Year of Graduation</label>
                  <select value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                    <option value="">Select year…</option>
                    {['2024', '2023', '2022', '2021', '2020'].map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-dark-soft mb-1">How Would You Like to Stay Involved?</label>
                <select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                  <option value="">Select an option…</option>
                  {['Stay updated on events & news', 'Mentor current students', 'Become a guest trainer', 'Collaborate on projects', 'Access career support', 'All of the above'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-dark-soft mb-1">Anything else you'd like to share?</label>
                <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="What are you working on now? Any feedback for SNC?" />
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-3">
                <i className="fas fa-paper-plane" /> Stay Connected
              </button>
              <p className="text-xs text-gray-400 text-center"><i className="fas fa-shield-alt mr-1" />Your information is never shared publicly.</p>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Not Yet a Graduate?</h2>
          <p className="text-gray-300 mb-8">Start your tech journey with one of our courses and join the growing network of SNC graduates across South Sudan.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/courses/browse" className="btn-primary">Browse Courses</Link>
            <Link to="/community" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Join the Community</Link>
          </div>
        </div>
      </section>
    </>
  )
}
