import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import PageHeader from '../../components/ui/PageHeader'
import { fadeUp } from '../../lib/animations'

const channels = [
  { icon: 'fab fa-whatsapp',  title: 'WhatsApp Groups',   desc: 'Topic-specific groups for developers, designers, students, and entrepreneurs — active daily discussions and peer support.', color: 'text-green-600 bg-green-50' },
  { icon: 'fab fa-linkedin',  title: 'LinkedIn Community', desc: 'Connect with SNC alumni, mentors, and partners. Share work and celebrate achievements with the broader network.', color: 'text-blue-600 bg-blue-50' },
  { icon: 'fab fa-facebook',  title: 'Facebook Group',    desc: 'A space for South Sudanese tech enthusiasts to share news, resources, opportunities, and support each other.', color: 'text-blue-700 bg-blue-50' },
  { icon: 'fas fa-calendar',  title: 'Monthly Events',    desc: 'Hackathons, webinars, tech talks, and networking events in Juba and online — free for all community members.', color: 'text-primary bg-primary/10' },
  { icon: 'fas fa-briefcase', title: 'Job Board',         desc: 'First access to job postings from SNC employer partners who trust our community\'s skills.', color: 'text-purple-600 bg-purple-50' },
  { icon: 'fas fa-user-tie',  title: 'Mentorship',        desc: 'Get matched with an experienced mentor in your field for career guidance and professional development.', color: 'text-orange-600 bg-orange-50' },
]

const schema = z.object({
  firstName: z.string().min(1),
  lastName:  z.string().min(1),
  email:     z.string().email(),
  phone:     z.string().optional(),
  location:  z.string().min(2, 'Please enter your location'),
  role:      z.string().min(1, 'Please select your role'),
  skills:    z.string().optional(),
})

const inp = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-sans text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
const lbl = 'block text-xs font-semibold text-dark-soft mb-1'
const errCls = 'text-red-500 text-xs mt-1'

export default function Community() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try {
      await fetch('http://localhost:5000/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'community-join' }),
      })
    } catch { /* offline */ }
    setSubmitted(true); reset()
  }

  return (
    <>
      <Helmet>
        <title>Join Our Community - Sleek Nexus Creative</title>
        <meta name="description" content="Connect with 500+ South Sudanese tech professionals, students, and entrepreneurs. Free to join — access events, job board, mentorship, and resources." />
      </Helmet>

      <PageHeader label="Join Us" title="Join Our Community"
        desc="Connect with 500+ South Sudanese tech professionals, students, and entrepreneurs. Free membership. Real value." />

      {/* Stats */}
      <section className="py-12 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['500+','Community Members'],['48','Events Per Year'],['200+','Jobs Shared Monthly'],['10+','Active Groups']].map(([v,l]) => (
              <div key={l}>
                <div className="text-3xl font-heading font-black mb-1">{v}</div>
                <div className="text-white/75 text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About + channels */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">The SNC Community</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">You Don't Have to Build Alone</h2>
              <p className="text-muted leading-relaxed mb-4">South Sudan's most active tech network — connecting students, graduates, developers, designers, and entrepreneurs who are passionate about technology's role in our nation's future.</p>
              <p className="text-muted leading-relaxed mb-6">Whether you're just starting out, switching careers, or scaling a startup — this community has the people, resources, and support you need to grow faster.</p>
              <h3 className="font-semibold text-dark mb-3">What You Get as a Member:</h3>
              <ul className="space-y-2">
                {[
                  'First access to job opportunities before they\'re posted publicly',
                  'Peer support, code reviews, and career advice',
                  'Free monthly workshops, webinars, and events',
                  'Find collaborators for projects and startups',
                  'Connect with mentors in your field',
                  'Early access to new SNC courses and free learning materials',
                ].map(b => (
                  <li key={b} className="flex items-start gap-2 text-sm text-muted">
                    <i className="fas fa-check text-primary text-xs mt-1 flex-shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {channels.map(({ icon, title, desc, color }, i) => (
                <motion.div key={title} className="card p-5"
                  variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
                    <i className={`${icon} text-lg`} />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-1">{title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Join Form */}
          <div className="max-w-2xl mx-auto" id="join">
            <div className="text-center mb-8">
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Membership — Free</p>
              <h2 className="text-2xl font-heading font-bold text-dark">Join the Community Today</h2>
              <p className="text-muted text-sm mt-2">Fill in the form below. We'll add you to our group, newsletter, and event invitations within 24 hours.</p>
            </div>

            {submitted ? (
              <div className="text-center py-14 bg-gray-50 rounded-2xl border border-gray-100">
                <i className="fas fa-users text-primary text-5xl mb-4 block" />
                <h3 className="font-heading font-bold text-dark text-xl mb-2">Welcome to the Community!</h3>
                <p className="text-muted text-sm mb-6">You'll receive a welcome message with community links within 24 hours. Welcome aboard!</p>
                <div className="flex gap-3 justify-center">
                  <Link to="/alumni" className="btn-primary text-sm">Browse Alumni</Link>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm">Submit Another</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={lbl}>First Name *</label><input {...register('firstName')} className={inp} placeholder="John" />{errors.firstName && <p className={errCls}>{errors.firstName.message}</p>}</div>
                  <div><label className={lbl}>Last Name *</label><input {...register('lastName')} className={inp} placeholder="Deng" />{errors.lastName && <p className={errCls}>{errors.lastName.message}</p>}</div>
                  <div><label className={lbl}>Email Address *</label><input {...register('email')} type="email" className={inp} placeholder="you@example.com" />{errors.email && <p className={errCls}>{errors.email.message}</p>}</div>
                  <div><label className={lbl}>Phone / WhatsApp</label><input {...register('phone')} type="tel" className={inp} placeholder="+211 9XX XXX XXX" /></div>
                </div>
                <div>
                  <label className={lbl}>Location (City / State) *</label>
                  <input {...register('location')} className={inp} placeholder="e.g. Juba, Central Equatoria" />
                  {errors.location && <p className={errCls}>{errors.location.message}</p>}
                </div>
                <div>
                  <label className={lbl}>I am a… *</label>
                  <select {...register('role')} className={inp}>
                    <option value="">Select your role</option>
                    <option>Student</option>
                    <option>Developer / Engineer</option>
                    <option>Designer</option>
                    <option>Entrepreneur / Startup Founder</option>
                    <option>Tech Professional</option>
                    <option>Educator / Trainer</option>
                    <option>NGO / Government Worker</option>
                    <option>Other</option>
                  </select>
                  {errors.role && <p className={errCls}>{errors.role.message}</p>}
                </div>
                <div>
                  <label className={lbl}>Main Skills / Interests (optional)</label>
                  <input {...register('skills')} className={inp} placeholder="e.g. Web Development, UI Design, Data Analysis…" />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3">
                  {isSubmitting ? <><i className="fas fa-spinner fa-spin" /> Joining…</> : <><i className="fas fa-users" /> Join the Community — It's Free</>}
                </button>
                <p className="text-xs text-gray-400 text-center"><i className="fas fa-shield-alt mr-1" /> Free forever. No spam. Unsubscribe any time.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Already a Member? Invite a Friend.</h2>
          <p className="text-gray-300 mb-8">The more people join, the stronger our community becomes.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/?text=Join%20the%20SNC%20Tech%20Community%3A%20https%3A%2F%2FSNC.ss%2Fcommunity" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <i className="fab fa-whatsapp" /> Share on WhatsApp
            </a>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
