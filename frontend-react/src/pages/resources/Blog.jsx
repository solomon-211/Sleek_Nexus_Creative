import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const featured = {
  img: '/images/blog-future-education.jpg',
  tag: 'Education Technology',
  title: 'The Future of EdTech in East Africa: What 10,000 Learners Taught Us',
  desc: 'After deploying e-learning platforms serving over 10,000 students across South Sudan, we\'ve learned that building for East Africa isn\'t just about technology — it\'s about context. Here\'s what works, what fails, and what the next five years look like.',
  date: 'December 2024',
  read: '8 min read',
}

const posts = [
  { img: '/images/blog1.jpg', tag: 'Web Development', date: 'November 2024', read: '5 min read', title: 'Building a Website for Your South Sudan Business: A Practical Guide', desc: 'What every local business owner needs to know before hiring a web developer — from choosing the right platform to understanding what questions to ask.' },
  { img: '/images/blog2.jpg', tag: 'Mobile', date: 'October 2024', read: '4 min read', title: 'Why Mobile-First Design Isn\'t Optional in South Sudan', desc: 'Over 85% of internet users in South Sudan access the web exclusively on mobile devices. Here\'s what that means for how you should build your digital product.' },
  { img: '/images/blog3.jpg', tag: 'Programming', date: 'September 2024', read: '6 min read', title: 'Getting Started with Python: A Beginner\'s Roadmap for South Sudanese Learners', desc: 'Python is the most beginner-friendly programming language in the world. This roadmap shows you exactly how to go from zero to writing real code in 8 weeks.' },
  { img: '/images/blog4.jpg', tag: 'Strategy', date: 'August 2024', read: '4 min read', title: '5 Clear Signs Your Organization Needs a Website Upgrade Right Now', desc: 'If your website loads in more than 4 seconds on mobile, you\'re losing visitors. Here are five signs it\'s time to rebuild — and what to do about each one.' },
  { img: '/images/blog5.jpg', tag: 'Case Study', date: 'July 2024', read: '7 min read', title: 'How We Built a Mobile Banking App in 90 Days — and What We\'d Do Differently', desc: 'A behind-the-scenes look at the decisions, trade-offs, and technical challenges of shipping a secure fintech app in under three months.' },
  { img: '/images/blog6.jpg', tag: 'Security', date: 'June 2024', read: '5 min read', title: 'Digital Security for Small Businesses in South Sudan: What You Need to Know', desc: 'Most small businesses in Juba operate with zero cybersecurity protection. Here\'s a practical, low-cost security checklist any organization can implement this week.' },
]

export default function Blog() {
  return (
    <>
      <Helmet><title>Blog - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Resources" title="Blog & Insights" desc="Practical articles on technology, digital transformation, education, and building products that work in South Sudan." />

      {/* Featured */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-6 text-center">Featured Article</p>
          <motion.div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl border border-gray-100" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <img src={featured.img} alt={featured.title} className="w-full h-72 lg:h-full object-cover" loading="lazy" />
            <div className="bg-white p-10 flex flex-col justify-center">
              <span className="text-xs font-bold text-accent uppercase tracking-widest mb-2"><i className="fas fa-star mr-1" />Featured</span>
              <span className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-0.5 rounded-full w-fit mb-3">{featured.tag}</span>
              <h2 className="text-2xl font-heading font-bold text-dark mb-4 leading-snug">{featured.title}</h2>
              <p className="text-muted text-sm leading-relaxed mb-5">{featured.desc}</p>
              <div className="flex gap-4 text-xs text-muted mb-6">
                <span><i className="fas fa-calendar mr-1" />{featured.date}</span>
                <span><i className="fas fa-clock mr-1" />{featured.read}</span>
              </div>
              <Link to="/contact" className="btn-primary w-fit">Read Article</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <h2 className="section-title mb-2">All Articles</h2>
          <p className="section-subtitle mb-10">Practical insights for builders, leaders, and learners across South Sudan.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(({ img, tag, date, read, title, desc }, i) => (
              <motion.article key={title} className="card overflow-hidden flex flex-col" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <img src={img} alt={title} className="w-full h-52 object-cover" loading="lazy" />
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-0.5 rounded-full w-fit mb-2">{tag}</span>
                  <div className="flex gap-4 text-xs text-muted mb-3">
                    <span><i className="fas fa-calendar mr-1" />{date}</span>
                    <span><i className="fas fa-clock mr-1" />{read}</span>
                  </div>
                  <h3 className="font-heading font-bold text-dark text-base mb-2 leading-snug">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed flex-1 mb-4">{desc}</p>
                  <a href="#" className="text-primary text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">Read Article <i className="fas fa-arrow-right text-xs" /></a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Get New Articles in Your Inbox</h2>
          <p className="text-gray-300 mb-8">Join 1,000+ readers who get our monthly insights on tech, education, and digital transformation.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Subscribe to Newsletter</Link>
            <Link to="/guides" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Browse Guides</Link>
          </div>
        </div>
      </section>
    </>
  )
}
