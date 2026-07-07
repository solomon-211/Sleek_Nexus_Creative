import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'
import { fadeUp } from '../../lib/animations'

const offers = ['iOS & Android App Development', 'Cross-Platform Apps (React Native / Flutter)', 'Mobile UI/UX Design', 'Offline-Capable Apps', 'Push Notifications & Real-Time Features', 'Payment & SMS Integration', 'App Store & Play Store Submission', 'Maintenance & Version Updates']

const techs = ['React Native', 'Flutter', 'Kotlin', 'Swift', 'Firebase', 'Node.js', 'Expo', 'REST APIs']

const features = [
  { icon: 'fa-wifi', title: 'Offline Support', desc: 'Apps that work even with poor or no internet — critical for South Sudan\'s connectivity landscape.' },
  { icon: 'fa-mobile-alt', title: 'Mobile-First UX', desc: 'Designed from the ground up for mobile users with intuitive gestures and fast interactions.' },
  { icon: 'fa-shield-alt', title: 'Secure by Design', desc: 'Biometric auth, encrypted data storage, and secure API communication built in from day one.' },
  { icon: 'fa-tachometer-alt', title: 'Lightweight & Fast', desc: 'Optimized for low-end Android devices and slow network conditions common in East Africa.' },
]

export default function MobileApps() {
  return (
    <>
      <Helmet><title>Mobile App Development - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Services" title="Mobile App Development" desc="Native and cross-platform mobile apps built for South Sudan's real users — offline-capable, lightweight, and production-ready." />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Cross-Platform Excellence</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">Apps Built for Africa's Fastest-Growing Mobile Market</h2>
              <p className="text-muted leading-relaxed mb-4">South Sudan's internet users are almost entirely mobile. We build apps that deliver excellent experiences regardless of device age, network speed, or screen size.</p>
              <p className="text-muted leading-relaxed mb-6">From fintech apps to e-learning platforms to community tools — our mobile solutions are trusted by organizations across South Sudan.</p>
              <h3 className="font-semibold text-dark mb-3">What We Offer:</h3>
              <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                {offers.map(o => (
                  <li key={o} className="flex items-center gap-2 text-sm text-muted">
                    <i className="fas fa-check text-primary text-xs" /> {o}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary">Start Your App</Link>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <img src="/images/web-mobile.jpg" alt="Mobile App Development" className="rounded-2xl shadow-xl w-full h-[420px] object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Built for Real Conditions</p>
            <h2 className="section-title">Key Capabilities</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon, title, desc }, i) => (
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

      <section className="py-16 bg-dark text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <p className="text-accent text-sm font-bold uppercase tracking-widest mb-4">Our Stack</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {techs.map(t => <span key={t} className="bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-full">{t}</span>)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Have an App Idea?</h2>
          <p className="text-gray-300 mb-8">We'll help you turn it into a real product — from concept to App Store.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
            <Link to="/projects/portfolio" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">View Our Projects</Link>
          </div>
        </div>
      </section>
    </>
  )
}
