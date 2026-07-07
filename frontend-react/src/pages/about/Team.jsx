import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'
import { fadeUp } from '../../lib/animations'
// Format: [label, fontAwesomeClass, href, brandClasses]
const socials = [
  ['Facebook', 'fab fa-facebook-f', '#', 'bg-[#1877F2] text-white'],
  ['Instagram', 'fab fa-instagram', '#', 'text-white bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5]'],
  ['Twitter', 'fab fa-x-twitter', '#', 'bg-black text-white'],
  ['WhatsApp', 'fab fa-whatsapp', '#', 'bg-[#25D366] text-white'],
  ['LinkedIn', 'fab fa-linkedin-in', '#', 'bg-[#0A66C2] text-white'],
]

const board = [
  { name: 'Board Chairman', role: 'Chairman, Board of Directors', img: '/images/board-chairman.jpeg', bio: 'Provides strategic governance and long-term vision to ensure SNC fulfills its mission. Brings 20+ years of leadership experience across East Africa.', socials },
  { name: 'Board Member', role: 'Board Director', img: '/images/board-member.jpeg', bio: 'Brings expertise in organizational development, community engagement, and social impact programs to ensure SNC\'s work creates lasting change.', socials },
]

const executive = [
  { name: 'Agau Deborah Makuol', role: 'Head of Marketing & Communications', img: '/images/marketing-head-new.jpeg', bio: 'Brand strategist and communications lead responsible for growing SNC\'s presence across South Sudan. Specializes in digital marketing, content strategy, and stakeholder engagement.', socials },
  { name: 'Daniel Deng', role: 'Sales Manager & Business Development', img: '/images/sales-manager.jpeg', bio: 'Drives client acquisition, manages strategic partnerships, and oversees revenue growth across SNC\'s service lines.', socials },
]

const core = [
  { name: 'Solomon Leek', role: 'CEO & Lead Engineer', img: '/images/team-member1.jpg', bio: 'Founder and driving force behind SNC. Full-stack engineer with deep expertise in scalable web architecture, API design, and cloud deployment.', socials },
  { name: 'Philip Bior', role: 'Lead UI/UX Designer', img: '/images/team-member2.jpg', bio: 'Product designer responsible for the visual identity and user experience across all SNC client products. Expert in Figma, user research, and design systems.', socials },
  { name: 'Genesis Goch', role: 'Education Lead & Curriculum Developer', img: '/images/team-member3.jpg', bio: 'Designs and delivers SNC\'s tech training programs. Passionate about making high-quality tech education accessible to every South Sudanese student.', socials },
  { name: 'Gideon Erioluwa', role: 'Mobile & Backend Engineer', img: '/images/team-member4.jpg', bio: 'Builds mobile apps and backend infrastructure. Specializes in Flutter, React Native, and Node.js with a focus on lightweight, offline-capable solutions.', socials },
]

const culture = [
  { icon: 'fa-hands-helping', title: 'Everyone Contributes', desc: 'We\'re a lean team — which means your ideas, code, and decisions directly shape what we build. Every person\'s work is visible and valued.' },
  { icon: 'fa-graduation-cap', title: 'Always Learning', desc: 'We share knowledge openly. Weekly standups, code reviews, design critiques, and monthly learning sessions keep the whole team growing.' },
  { icon: 'fa-globe-africa', title: 'Context-Driven Work', desc: 'Everything we build is designed for South Sudan\'s real conditions — limited bandwidth, diverse devices, and communities that depend on technology working reliably.' },
  { icon: 'fa-comments', title: 'Direct Communication', desc: 'No politics. No layers of bureaucracy. We communicate directly, give honest feedback, and resolve disagreements with respect and data.' },
  { icon: 'fa-rocket', title: 'Ship Real Things', desc: 'We build products that go live and get used. Team members leave with impressive portfolios, real case studies, and production experience.' },
  { icon: 'fa-heart', title: 'Purpose Beyond Paycheck', desc: 'The apps we build connect communities. The courses we run transform careers. Your work at SNC matters — and you can point to exactly how.' },
]

function TeamCard({ member, i }) {
  return (
    <motion.div className="card overflow-hidden" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
      <img src={member.img} alt={member.name} className="w-full h-56 object-cover" loading="lazy" />
      <div className="p-5">
        <h3 className="font-heading font-bold text-dark">{member.name}</h3>
        <p className="text-primary text-xs font-semibold uppercase tracking-wide mb-2">{member.role}</p>
        <p className="text-muted text-sm leading-relaxed mb-4">{member.bio}</p>
        <div className="flex gap-4 justify-center">
          {member.socials.map(([label, icon, href, brand]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on ${label}`}
              title={label}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all text-sm hover:-translate-y-0.5 hover:shadow-md ${brand}`}
            >
              <i className={icon} />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function Section({ label, title, subtitle, members, bg = '' }) {
  return (
    <section className={`py-20 ${bg}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">{label}</p>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m, i) => <TeamCard key={m.name} member={m} i={i} />)}
        </div>
      </div>
    </section>
  )
}

export default function Team() {
  return (
    <>
      <Helmet><title>Our Team - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="About Us" title="Meet Our Team" desc="A diverse, passionate group of builders, designers, educators, and strategists united by a mission to advance South Sudan through technology." />

      <Section label="Governance" title="Board of Directors" subtitle="Strategic leadership guiding SNC's mission, governance, and long-term vision." members={board} />
      <Section label="Leadership" title="Executive & Management Team" subtitle="The people running operations, sales, marketing, and strategy day-to-day." members={executive} bg="bg-gray-50" />
      <Section label="Core Team" title="The People Who Build" subtitle="Engineers, designers, and educators working every day to deliver products and education." members={core} />

      {/* Culture */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Our Culture</p>
            <h2 className="section-title">What It's Like to Work Here</h2>
            <p className="section-subtitle">Small team. Big responsibility. Real impact.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {culture.map(({ icon, title, desc }, i) => (
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

      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Want to Build With Us?</h2>
          <p className="text-gray-300 mb-8">We're always looking for talented engineers, designers, trainers, and community builders.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/careers" className="btn-primary">View Open Roles</Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Reach Out</Link>
          </div>
        </div>
      </section>
    </>
  )
}
