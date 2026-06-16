import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const categories = [
  { icon: 'fa-code', title: 'Web & Software Development', count: 4, color: 'bg-blue-50 text-blue-600', to: '/courses' },
  { icon: 'fa-mobile-alt', title: 'Mobile Development', count: 2, color: 'bg-green-50 text-green-600', to: '/courses' },
  { icon: 'fa-graduation-cap', title: 'EdTech & Digital Tools', count: 2, color: 'bg-purple-50 text-purple-600', to: '/courses' },
  { icon: 'fa-shield-alt', title: 'IT & Cybersecurity', count: 3, color: 'bg-red-50 text-red-600', to: '/courses' },
  { icon: 'fa-chart-line', title: 'Data & AI', count: 2, color: 'bg-yellow-50 text-yellow-600', to: '/courses' },
]

const featured = [
  { duration: '12 Weeks', price: '$220', badge: 'Bestseller', title: 'Full-Stack Web Development Bootcamp', desc: 'Master both frontend and backend development. Build complete web applications from scratch using industry-standard tools.', instructor: 'James Maker', level: 'Beginner to Advanced', icon: 'fa-code' },
  { duration: '10 Weeks', price: '$200', badge: 'Popular', title: 'Mobile App Development with React Native', desc: 'Build cross-platform mobile apps for iOS and Android with one codebase using React Native.', instructor: 'David Kim', level: 'Intermediate', icon: 'fa-mobile-alt' },
  { duration: '10 Weeks', price: '$200', badge: 'Trending', title: 'Introduction to Machine Learning', desc: 'Build intelligent systems with machine learning algorithms and AI fundamentals.', instructor: 'Dr. Isaac Mayen', level: 'Intermediate to Advanced', icon: 'fa-brain' },
]

export default function Browse() {
  return (
    <>
      <Helmet><title>Browse Courses - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="SNC Academy" title="Browse Our Courses" desc="Practical tech training programs taught by industry professionals — designed for South Sudan's growing digital workforce." />

      {/* Search Bar */}
      <section className="py-10 bg-gray-50 border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
              <i className="fas fa-search text-muted" />
              <input type="text" placeholder="Search courses..." className="flex-1 outline-none text-sm text-dark placeholder-muted" />
            </div>
            <Link to="/courses" className="btn-primary whitespace-nowrap">View All</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Browse by Category</p>
            <h2 className="section-title">What Would You Like to Learn?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map(({ icon, title, count, color }, i) => (
              <motion.div key={title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <Link to="/courses" className="card p-5 flex flex-col items-center text-center hover:border-primary/30 hover:shadow-md transition-all block">
                  <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-3`}>
                    <i className={`fas ${icon} text-lg`} />
                  </div>
                  <h3 className="font-semibold text-dark text-sm mb-1">{title}</h3>
                  <span className="text-xs text-muted">{count} courses</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-1">Top Picks</p>
              <h2 className="text-2xl font-heading font-bold text-dark">Featured Courses</h2>
            </div>
            <Link to="/courses" className="btn-secondary text-sm">View All Courses</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map(({ duration, price, badge, title, desc, instructor, level, icon }, i) => (
              <motion.div key={title} className="card p-6 flex flex-col" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-primary text-xl`} />
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="bg-dark/10 text-dark text-xs font-bold px-2.5 py-1 rounded-full">{duration}</span>
                  <span className="bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">{price}</span>
                  {badge && <span className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">{badge}</span>}
                </div>
                <h3 className="font-heading font-bold text-dark text-base mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4 flex-1">{desc}</p>
                <div className="text-xs text-muted mb-4">
                  <div className="flex items-center gap-2 mb-1"><i className="fas fa-user-tie text-primary w-4" />{instructor}</div>
                  <div className="flex items-center gap-2"><i className="fas fa-signal text-primary w-4" />{level}</div>
                </div>
                <Link to="/contact" className="btn-primary text-xs px-4 py-2 justify-center">Enroll Now</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Start Your Learning Journey Today</h2>
          <p className="text-gray-300 mb-8">Join hundreds of students building tech careers in South Sudan.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/courses" className="btn-primary">See All Courses</Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Talk to an Advisor</Link>
          </div>
        </div>
      </section>
    </>
  )
}
