import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'
import SEO from '../../components/ui/SEO'
import { fadeUp } from '../../lib/animations'

const pillars = [
  {
    icon: 'fa-brain',
    title: 'Self-Awareness & Character',
    desc: 'Great leaders start from within. We equip young people to understand their values, strengths, blind spots, and the character traits that define lasting leadership.',
    points: ['Emotional intelligence & self-regulation', 'Core values clarification', 'Personal integrity & accountability', 'Resilience under pressure'],
  },
  {
    icon: 'fa-users',
    title: 'Influence & Communication',
    desc: 'Leadership is about moving people. We train young Africans to communicate with clarity, inspire through storytelling, and lead inclusive conversations.',
    points: ['Public speaking & presentation skills', 'Persuasive writing & storytelling', 'Active listening & empathy', 'Conflict resolution & negotiation'],
  },
  {
    icon: 'fa-chess',
    title: 'Strategic Thinking',
    desc: 'We develop the capacity to see the big picture, anticipate challenges, and make sound decisions even in complex and uncertain environments.',
    points: ['Systems thinking & root-cause analysis', 'Problem-solving frameworks', 'Decision-making under uncertainty', 'Vision-setting & goal planning'],
  },
  {
    icon: 'fa-globe-africa',
    title: 'Community & Social Impact',
    desc: 'Leadership without service is just power. We anchor everything we teach in the responsibility leaders carry toward their communities.',
    points: ['Servant leadership philosophy', 'Community mobilisation skills', 'Social entrepreneurship basics', 'Civic responsibility & advocacy'],
  },
]

const programs = [
  {
    icon: 'fa-seedling',
    badge: 'Ages 16–22',
    color: 'border-primary',
    title: 'Young Leaders Initiative',
    desc: 'A foundational leadership development program for secondary school students and young adults. Covers character formation, communication, and civic responsibility through workshops, peer groups, and mentorship.',
    duration: '3 months',
    format: 'Workshops + Mentorship',
  },
  {
    icon: 'fa-rocket',
    badge: 'Ages 22–30',
    color: 'border-accent',
    title: 'Emerging Leaders Program',
    desc: 'For university students and early-career professionals who want to accelerate their leadership capacity. Combines strategic thinking, team leadership, and real community impact projects.',
    duration: '6 months',
    format: 'Cohort-Based',
  },
  {
    icon: 'fa-crown',
    badge: 'Working Professionals',
    color: 'border-primary',
    title: 'Executive Leadership Bootcamp',
    desc: 'An intensive weekend bootcamp for professionals in NGOs, government, and the private sector who want to lead with greater influence, clarity, and purpose.',
    duration: '3-day Intensive',
    format: 'In-Person Bootcamp',
  },
]

const reads = [
  { icon: 'fa-book-open', tag: 'Article', title: 'What African Leaders Can Learn From Servant Leadership', time: '6 min read' },
  { icon: 'fa-book-open', tag: 'Guide', title: 'Building a Personal Leadership Philosophy: A Step-by-Step Guide', time: '10 min read' },
  { icon: 'fa-book-open', tag: 'Article', title: '7 Communication Habits of the Most Influential Young Leaders in Africa', time: '5 min read' },
  { icon: 'fa-book-open', tag: 'Toolkit', title: 'The Decision-Making Toolkit for High-Stakes Situations', time: '8 min read' },
  { icon: 'fa-book-open', tag: 'Article', title: 'How to Lead When You Have No Title', time: '4 min read' },
  { icon: 'fa-book-open', tag: 'Guide', title: 'From Follower to Leader: A 90-Day Development Plan', time: '12 min read' },
]

const quotes = [
  { text: 'Leadership and learning are indispensable to each other.', author: 'John F. Kennedy' },
  { text: 'The function of leadership is to produce more leaders, not more followers.', author: 'Ralph Nader' },
  { text: 'A good leader takes a little more than his share of the blame, a little less than his share of the credit.', author: 'Arnold H. Glasow' },
]

export default function Leadership() {
  return (
    <>
      <SEO
        title="Leadership Development"
        description="Leadership development programs, resources, and guides for young people in South Sudan. Build character, communication, strategic thinking, and community impact skills."
        canonical="/resources/leadership"
        breadcrumbs={[{ name: 'Resources', url: '/resources/leadership' }, { name: 'Leadership', url: '/resources/leadership' }]}
      />

      <PageHeader
        label="Resources · Growth"
        title="Leadership Development"
        desc="We believe every young person in South Sudan has the potential to lead. Our leadership resources, programs, and guides are built to unlock that potential."
      />

      {/* Why Leadership */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Why It Matters</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-6">
                South Sudan Needs Leaders — Not Just Titles
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                South Sudan is one of the world's youngest nations, and its future will be written by its young people. But access to quality leadership development — the kind that shapes character, builds communication skills, and cultivates strategic thinking — has historically been limited.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                At SNC, we're changing that. Our leadership programs aren't about lecture-room theory — they're about practical tools, honest conversations, and real challenges that prepare young people to lead in their communities, organisations, and careers.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Whether you're a secondary school student, a university graduate, or a working professional, we have a pathway designed for where you are right now.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">Apply for a Program</Link>
                <Link to="/mentor" className="btn-secondary">Find a Mentor</Link>
              </div>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[
                { icon: 'fa-user-graduate', value: '200+', label: 'Young Leaders Trained' },
                { icon: 'fa-globe-africa', value: '5+', label: 'Communities Reached' },
                { icon: 'fa-handshake', value: '30+', label: 'Mentors in Network' },
                { icon: 'fa-trophy', value: '3', label: 'Active Programs' },
              ].map(({ icon, value, label }) => (
                <div key={label} className="card p-6 text-center">
                  <i className={`fas ${icon} text-primary text-2xl mb-3 block`} />
                  <div className="text-3xl font-heading font-black text-primary mb-1">{value}</div>
                  <div className="text-sm text-muted">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Our Framework</p>
            <h2 className="section-title">The Four Pillars of SNC Leadership</h2>
            <p className="section-subtitle">Everything we teach is grounded in this framework — practical, contextual, and built for Africa's next generation.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {pillars.map(({ icon, title, desc, points }, i) => (
              <motion.div
                key={title}
                className="card p-8"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <i className={`fas ${icon} text-primary text-lg`} />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-lg">{title}</h3>
                </div>
                <p className="text-muted text-sm leading-relaxed mb-5">{desc}</p>
                <ul className="space-y-2">
                  {points.map(p => (
                    <li key={p} className="flex items-center gap-2 text-sm text-dark-soft">
                      <i className="fas fa-check-circle text-primary text-xs flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Programs</p>
            <h2 className="section-title">Leadership Programs by Stage</h2>
            <p className="section-subtitle">No matter where you are in your journey, there's a program built for you.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map(({ icon, badge, color, title, desc, duration, format }, i) => (
              <motion.div
                key={title}
                className={`card p-8 border-t-4 ${color} flex flex-col`}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.12 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <i className={`fas ${icon} text-primary text-xl`} />
                  </div>
                  <span className="text-xs bg-primary/10 text-primary font-bold px-3 py-1 rounded-full">{badge}</span>
                </div>
                <h3 className="font-heading font-bold text-dark text-xl mb-3">{title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-6 flex-1">{desc}</p>
                <div className="space-y-2 text-xs text-muted mb-6">
                  <div className="flex items-center gap-2"><i className="fas fa-clock text-primary w-4" />{duration}</div>
                  <div className="flex items-center gap-2"><i className="fas fa-laptop text-primary w-4" />{format}</div>
                </div>
                <Link to="/contact" className="btn-primary text-sm justify-center">Apply Now</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspirational quotes */}
      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-8">
            {quotes.map(({ text, author }, i) => (
              <motion.div
                key={author}
                className="text-center px-4"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <i className="fas fa-quote-left text-primary/40 text-3xl mb-4 block" />
                <p className="text-gray-200 italic leading-relaxed mb-4">"{text}"</p>
                <p className="text-accent text-sm font-semibold">— {author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reading resources */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Free Reading</p>
            <h2 className="section-title">Leadership Articles & Guides</h2>
            <p className="section-subtitle">Practical reads you can act on today. No theory — just actionable insights for the next generation of African leaders.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reads.map(({ icon, tag, title, time }, i) => (
              <motion.div
                key={title}
                className="card p-6 flex flex-col"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <i className={`fas ${icon} text-primary`} />
                  </div>
                  <span className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
                </div>
                <h3 className="font-heading font-bold text-dark mb-3 flex-1">{title}</h3>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-muted flex items-center gap-1"><i className="fas fa-clock text-primary" /> {time}</span>
                  <a href="#" className="text-primary text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">Read <i className="fas fa-arrow-right text-xs" /></a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <i className="fas fa-crown text-white/30 text-5xl mb-6 block" />
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Step Into Your Leadership?</h2>
          <p className="text-white/80 mb-8">Apply for one of our programs or connect with a mentor who can guide your journey.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Apply for a Program</Link>
            <Link to="/mentor" className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors border border-white/20">Find a Mentor</Link>
          </div>
        </div>
      </section>
    </>
  )
}
