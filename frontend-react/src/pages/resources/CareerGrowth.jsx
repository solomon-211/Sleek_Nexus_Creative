import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'
import SEO from '../../components/ui/SEO'
import { fadeUp } from '../../lib/animations'

const tracks = [
  {
    icon: 'fa-laptop-code',
    color: 'border-blue-400',
    badge: 'Tech',
    title: 'Technology & Digital Careers',
    desc: 'From software engineering to digital marketing, UX design, data analysis, and IT — this track covers everything you need to break into and advance in the tech economy.',
    roles: ['Software Developer', 'UI/UX Designer', 'Data Analyst', 'Digital Marketer', 'IT Support Specialist', 'Product Manager'],
  },
  {
    icon: 'fa-handshake',
    color: 'border-green-400',
    badge: 'Social Impact',
    title: 'NGO, Humanitarian & Development',
    desc: 'One of the largest employment sectors in South Sudan. Learn how to build a career in programme management, monitoring & evaluation, communications, and field coordination.',
    roles: ['Programme Officer', 'M&E Specialist', 'Communications Officer', 'Logistics Coordinator', 'Community Liaison', 'Grants Manager'],
  },
  {
    icon: 'fa-briefcase',
    color: 'border-primary',
    badge: 'Business',
    title: 'Entrepreneurship & Business',
    desc: 'Build your own path. This track covers business fundamentals, startup essentials, freelancing, and how to create sustainable income in South Sudan\'s growing economy.',
    roles: ['Freelancer', 'Small Business Owner', 'Social Entrepreneur', 'Sales Professional', 'Marketing Consultant', 'Business Analyst'],
  },
  {
    icon: 'fa-university',
    color: 'border-accent',
    badge: 'Public Sector',
    title: 'Government & Public Service',
    desc: 'If you want to serve South Sudan through public institutions — government ministries, local councils, or state agencies — this track maps the skills and steps you need.',
    roles: ['Civil Servant', 'Policy Analyst', 'Public Administrator', 'Budget Officer', 'Procurement Specialist', 'Community Development Officer'],
  },
]

const tools = [
  { icon: 'fa-file-alt',     title: 'CV & Cover Letter Templates',   desc: 'Professional, ATS-friendly templates tailored for South Sudanese and international job applications. Includes annotated examples showing what good looks like.', cta: 'Contact Us to Get',  href: '/contact' },
  { icon: 'fa-user-tie',     title: 'Interview Preparation Guide',   desc: 'From common NGO interview questions to technical assessments and competency-based interviews — a step-by-step guide to walking in prepared and walking out confident.', cta: 'Request the Guide', href: '/contact' },
  { icon: 'fa-linkedin',     title: 'LinkedIn Profile Checklist',    desc: 'A 20-point checklist to make your LinkedIn profile recruiter-ready. Includes tips on headline writing, the About section, and requesting recommendations.', cta: 'Request Checklist',  href: '/contact' },
  { icon: 'fa-star',         title: 'Personal Branding Workbook',    desc: 'How to articulate your unique value, build your professional reputation online and offline, and make yourself memorable to employers and clients.', cta: 'Request Workbook',   href: '/contact' },
  { icon: 'fa-network-wired',title: 'Networking Strategy Guide',     desc: 'Networking isn\'t about collecting contacts — it\'s about building real relationships. Learn how to network effectively in Juba, East Africa, and globally.', cta: 'Request the Guide', href: '/contact' },
  { icon: 'fa-chart-line',   title: 'Salary Negotiation Playbook',   desc: 'Know your worth and know how to communicate it. A practical guide to negotiating your first salary, asking for a raise, and understanding total compensation.', cta: 'Request Playbook',   href: '/contact' },
]

const steps = [
  { n: '01', title: 'Discover Your Direction', desc: 'Identify your strengths, interests, and values using our self-assessment tools — so you pursue a path that fits who you are, not just what\'s available.' },
  { n: '02', title: 'Build the Right Skills', desc: 'Map the skills gap between where you are and where you want to be. Our guides show you exactly what to learn and the best (often free) ways to learn it.' },
  { n: '03', title: 'Create a Strong Profile', desc: 'Write a CV, LinkedIn profile, and portfolio that get you noticed — using our templates, examples, and step-by-step feedback guides.' },
  { n: '04', title: 'Apply with Confidence', desc: 'Understand how hiring works for NGOs, tech companies, and government agencies in South Sudan and East Africa — and apply smarter, not harder.' },
  { n: '05', title: 'Grow Once You\'re In', desc: 'Landing the job is just the beginning. Learn how to perform, build relationships, get promoted, and keep growing once you\'re in the role.' },
]

const articles = [
  { tag: 'Career Guide', title: 'How to Write a CV That Actually Gets You Hired in South Sudan', time: '8 min' },
  { tag: 'Personal Growth', title: 'The 5 Professional Skills That Every Employer in Africa Is Looking For Right Now', time: '6 min' },
  { tag: 'Job Search', title: 'Where to Find Legitimate Job Opportunities in South Sudan and East Africa', time: '5 min' },
  { tag: 'Interviews', title: 'How to Answer "Tell Me About Yourself" in a Way That Actually Works', time: '4 min' },
  { tag: 'Freelancing', title: 'A Beginner\'s Guide to Freelancing in Juba: Platforms, Rates, and Getting Paid', time: '9 min' },
  { tag: 'Growth', title: 'How to Ask for a Promotion Without Awkwardness: A Step-by-Step Script', time: '5 min' },
]

export default function CareerGrowth() {
  return (
    <>
      <SEO
        title="Career Growth & Professional Development"
        description="Career guidance, professional development resources, CV templates, interview prep, and job search strategies for young people in South Sudan."
        canonical="/resources/career-growth"
        breadcrumbs={[{ name: 'Resources', url: '/resources/career-growth' }, { name: 'Career Growth', url: '/resources/career-growth' }]}
      />

      <PageHeader
        label="Resources · Growth"
        title="Career & Professional Growth"
        desc="Everything you need to launch, build, and advance a meaningful career in South Sudan and beyond — practical tools, honest guidance, and zero fluff."
      />

      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Why This Matters</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-6">
                Your Career Is Your Biggest Investment
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                South Sudan's young people are talented, driven, and full of potential — but many are navigating their careers without proper maps. Few have access to quality career counselling, professional networks, or honest guidance about how to break into the roles they want.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                SNC's career resources fill that gap. Whether you're a school leaver trying to figure out next steps, a university student applying for your first internship, or a professional ready for a career transition — we have practical, Africa-specific tools and guidance for you.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                No generic advice from the internet. Real, relevant, and rooted in South Sudan's employment reality.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/internships" className="btn-primary">Find Internships</Link>
                <Link to="/mentor" className="btn-secondary">Get a Career Mentor</Link>
              </div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-10 text-white"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-heading font-bold mb-6">Quick Wins — Start Here</h3>
              <div className="space-y-4">
                {[
                  { icon: 'fa-file-alt', text: 'Download a free CV template that matches your level' },
                  { icon: 'fa-user-tie', text: 'Read the interview preparation guide before your next application' },
                  { icon: 'fa-linkedin', text: 'Update your LinkedIn profile using our 20-point checklist' },
                  { icon: 'fa-search', text: 'Browse vetted job boards and hiring organisations in South Sudan' },
                  { icon: 'fa-hands-helping', text: 'Connect with an SNC mentor in your career field' },
                  { icon: 'fa-graduation-cap', text: 'Explore scholarship opportunities for professional development' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className={`fas ${icon} text-white text-xs`} />
                    </div>
                    <p className="text-white/85 text-sm leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Career Tracks */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Career Tracks</p>
            <h2 className="section-title">Find Your Path</h2>
            <p className="section-subtitle">Explore the four major career tracks available to young South Sudanese and find the one that fits you.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {tracks.map(({ icon, color, badge, title, desc, roles }, i) => (
              <motion.div
                key={title}
                className={`card p-8 border-l-4 ${color}`}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <i className={`fas ${icon} text-primary text-lg`} />
                  </div>
                  <div>
                    <span className="text-xs bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded-full block mb-1">{badge}</span>
                    <h3 className="font-heading font-bold text-dark">{title}</h3>
                  </div>
                </div>
                <p className="text-muted text-sm leading-relaxed mb-4">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {roles.map(r => (
                    <span key={r} className="text-xs bg-gray-100 text-dark-soft font-medium px-2.5 py-1 rounded-lg">{r}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Framework */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">The Framework</p>
            <h2 className="section-title">5 Steps to Career Success</h2>
            <p className="section-subtitle">Our step-by-step approach to building a career you're proud of — from first steps to continuous growth.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map(({ n, title, desc }, i) => (
              <motion.div
                key={n}
                className="text-center"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary text-white font-heading font-black text-xl flex items-center justify-center mx-auto mb-4">{n}</div>
                <h3 className="font-heading font-bold text-dark mb-2 text-sm">{title}</h3>
                <p className="text-muted text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Free Tools</p>
            <h2 className="section-title">Career Tools & Resources</h2>
            <p className="section-subtitle">Templates, checklists, guides, and playbooks — everything free, everything practical.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(({ icon, title, desc, cta, href }, i) => (
              <motion.div
                key={title}
                className="card p-6 flex flex-col"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-primary`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed flex-1 mb-5">{desc}</p>
                <Link to={href} className="text-primary text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all mt-auto">
                  {cta} <i className="fas fa-arrow-right text-xs" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Read</p>
            <h2 className="section-title">Career Articles</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map(({ tag, title, time }, i) => (
              <motion.div
                key={title}
                className="card p-6"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <span className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-0.5 rounded-full mb-3 block w-fit">{tag}</span>
                <h3 className="font-heading font-bold text-dark text-sm mb-4 leading-snug">{title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted flex items-center gap-1"><i className="fas fa-clock text-primary" /> {time} read</span>
                  <a href="#" className="text-primary text-sm font-semibold hover:underline">Read →</a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Invest in Your Career?</h2>
          <p className="text-gray-300 mb-8">Talk to one of our mentors, apply for an internship, or explore our free tools — your career growth starts now.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/mentor" className="btn-primary">Find a Mentor</Link>
            <Link to="/internships" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Browse Internships</Link>
            <Link to="/resources/scholarships" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Scholarships</Link>
          </div>
        </div>
      </section>
    </>
  )
}
