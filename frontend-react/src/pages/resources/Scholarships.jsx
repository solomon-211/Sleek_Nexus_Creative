import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'
import SEO from '../../components/ui/SEO'
import { fadeUp } from '../../lib/animations'

const scholarships = [
  {
    category: 'International',
    color: 'bg-blue-100 text-blue-700',
    items: [
      {
        name: 'Mastercard Foundation Scholars Program',
        org: 'Mastercard Foundation',
        level: 'Undergraduate & Postgraduate',
        focus: 'STEM, Business, Social Sciences',
        value: 'Full Scholarship (tuition, living, travel)',
        deadline: 'Varies by university partner',
        link: 'https://mastercardfdn.org/all/scholars',
        open: true,
        desc: 'One of the largest scholarship programs in Africa — covering full costs at partner universities. Specifically designed for academically talented young Africans from disadvantaged backgrounds.',
      },
      {
        name: 'Chevening Scholarships',
        org: 'UK Government (FCDO)',
        level: 'Postgraduate (Master\'s)',
        focus: 'All disciplines',
        value: 'Full Scholarship',
        deadline: 'November annually',
        link: 'https://www.chevening.org',
        open: true,
        desc: 'UK government\'s global scholarship and fellowship programme. Open to South Sudanese applicants with 2+ years of work experience. Covers full tuition, flights, and living expenses at UK universities.',
      },
      {
        name: 'Commonwealth Scholarship',
        org: 'Commonwealth Scholarship Commission',
        level: 'Postgraduate (Master\'s & PhD)',
        focus: 'Development-focused disciplines',
        value: 'Full Scholarship',
        deadline: 'December annually',
        link: 'https://cscuk.fcdo.gov.uk',
        open: true,
        desc: 'Available to citizens of Commonwealth countries including South Sudan. Focuses on candidates whose studies will benefit their home country. Covers tuition, travel, and living costs at UK universities.',
      },
      {
        name: 'DAAD Scholarships (Germany)',
        org: 'German Academic Exchange Service',
        level: 'Postgraduate & PhD',
        focus: 'Engineering, Natural Sciences, Social Sciences, Development Studies',
        value: 'Full Scholarship + Stipend',
        deadline: 'October–November annually',
        link: 'https://www.daad.de',
        open: true,
        desc: 'Germany\'s primary scholarship programme for international students. Excellent for South Sudanese students interested in studying in Germany with strong technical or development-focused programs.',
      },
    ],
  },
  {
    category: 'Regional (Africa)',
    color: 'bg-green-100 text-green-700',
    items: [
      {
        name: 'African Leadership University (ALU) Scholarship',
        org: 'African Leadership University',
        level: 'Undergraduate',
        focus: 'Business, Technology, Entrepreneurship',
        value: 'Partial to Full Scholarships Available',
        deadline: 'Rolling admissions',
        link: 'https://www.alueducation.com',
        open: true,
        desc: 'ALU is reimagining African higher education with a focus on entrepreneurship and leadership. Scholarships are available and merit-based for young Africans with demonstrated leadership potential.',
      },
      {
        name: 'African Development Bank (AfDB) Internship',
        org: 'African Development Bank',
        level: 'Undergraduate / Postgraduate',
        focus: 'Economics, Finance, Development',
        value: 'Paid Internship',
        deadline: 'Rolling',
        link: 'https://www.afdb.org',
        open: true,
        desc: 'Competitive internship for African students at the continent\'s leading development bank. Great for students in economics, finance, or development studies who want continental exposure.',
      },
      {
        name: 'East African Community (EAC) Scholarships',
        org: 'EAC Secretariat',
        level: 'Postgraduate',
        focus: 'Regional Integration, Policy, Law',
        value: 'Full Scholarship',
        deadline: 'Varies',
        link: 'https://www.eac.int',
        open: false,
        desc: 'Scholarships and fellowship opportunities available through EAC for citizens of member states. South Sudan became a member in 2016 and students are eligible to apply.',
      },
    ],
  },
  {
    category: 'NGO & Humanitarian Sector',
    color: 'bg-orange-100 text-orange-700',
    items: [
      {
        name: 'UNHCR / Dafi Scholarship',
        org: 'UNHCR',
        level: 'Undergraduate',
        focus: 'All disciplines',
        value: 'Partial Scholarship',
        deadline: 'Varies by country',
        link: 'https://www.unhcr.org',
        open: true,
        desc: 'The Albert Einstein German Academic Refugee Initiative (DAFI) Scholarship supports refugees and displaced young people to access higher education. South Sudanese students affected by displacement may be eligible.',
      },
      {
        name: 'IRC Education Support',
        org: 'International Rescue Committee',
        level: 'Secondary & Tertiary',
        focus: 'General education access',
        value: 'Varies',
        deadline: 'Contact IRC South Sudan office',
        link: 'https://www.rescue.org',
        open: true,
        desc: 'IRC runs education support programs across South Sudan. Reach out to the nearest IRC office to learn about current education and scholarship support for eligible individuals.',
      },
    ],
  },
]

const tips = [
  { icon: 'fa-calendar-alt', title: 'Apply Early & Track Deadlines', desc: 'Most scholarships open applications 6–9 months before the academic year. Set calendar reminders and start preparing documents early — strong applications take time.' },
  { icon: 'fa-file-alt', title: 'Write a Compelling Personal Statement', desc: 'Your personal statement is where you stand out. Be specific about your goals, your connection to South Sudan\'s development, and why this scholarship aligns with your plans.' },
  { icon: 'fa-envelope', title: 'Get Strong Reference Letters', desc: 'Reach out to referees early and give them 4–6 weeks. Provide them with your CV, goals, and the scholarship details so they can write specific, relevant letters.' },
  { icon: 'fa-graduation-cap', title: 'Academic Excellence Matters', desc: 'Most scholarships require strong academic records. Focus on your GPA, take relevant courses, and document your achievements — including competitions, projects, and extracurricular work.' },
  { icon: 'fa-users', title: 'Show Community Leadership', desc: 'International scholarship programs look for candidates who will give back. Document your community work, volunteer experience, and leadership roles clearly in every application.' },
  { icon: 'fa-globe', title: 'Improve Your English Proficiency', desc: 'Most international scholarships require IELTS or TOEFL scores. Study early, take practice tests, and aim for scores above the minimum requirements.' },
]

const faqs = [
  { q: 'I missed the deadline for this year — what should I do?', a: 'Most scholarships reopen annually. Use the time to strengthen your application: improve your grades, gain work or community experience, write a better personal statement, and gather stronger reference letters. Also watch for second-round openings.' },
  { q: 'Do I need to pay to apply for scholarships?', a: 'Legitimate scholarships never charge an application fee. If a scholarship asks you to pay to apply or "unlock" your award, it is a scam. The scholarships listed here are all free to apply for.' },
  { q: 'I don\'t have good grades — can I still apply?', a: 'Some scholarships prioritize potential and community impact over grades. Research the specific criteria for each scholarship — some focus on financial need and leadership, not purely academic performance.' },
  { q: 'Can SNC help me with my scholarship application?', a: 'Yes. SNC offers personal statement review, application coaching, and mentor connections through our career programs. Contact us and we will do our best to support your application.' },
  { q: 'Are there scholarships specifically for women from South Sudan?', a: 'Yes. The Mastercard Foundation Scholars Program, some Chevening spots, and many NGO programs specifically target women from underrepresented African communities. We will update this list with gender-specific opportunities as they are confirmed.' },
]

export default function Scholarships() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [openFaq, setOpenFaq] = useState(null)

  const categories = ['all', ...scholarships.map(s => s.category)]
  const filtered = activeCategory === 'all'
    ? scholarships
    : scholarships.filter(s => s.category === activeCategory)

  return (
    <>
      <SEO
        title="Scholarships & Funding Opportunities"
        description="Curated scholarship opportunities for young South Sudanese — international, regional, and NGO funding for undergraduate, postgraduate, and professional development."
        canonical="/resources/scholarships"
        breadcrumbs={[{ name: 'Resources', url: '/resources/scholarships' }, { name: 'Scholarships', url: '/resources/scholarships' }]}
      />

      <PageHeader
        label="Resources · Opportunities"
        title="Scholarships & Funding"
        desc="Curated, up-to-date scholarship opportunities for young South Sudanese — with practical guidance on how to build a winning application."
      />

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div className="lg:col-span-2" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Why We Built This</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-5">Access Shouldn't Be a Barrier</h2>
              <p className="text-muted leading-relaxed mb-4">
                Many of South Sudan's most talented young people never apply for international scholarships — not because they don't qualify, but because they don't know these opportunities exist, or they don't know how to apply.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                This page brings together the most relevant, legitimate scholarship and funding opportunities for South Sudanese students and young professionals. We vet every listing, include direct links, and add practical context so you know what you're applying for.
              </p>
              <p className="text-muted leading-relaxed">
                Bookmark this page — we update it regularly as new opportunities are announced.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 gap-4 content-start"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
            >
              {[
                { icon: 'fa-globe', value: '10+', label: 'Scholarships Listed' },
                { icon: 'fa-dollar-sign', value: '$0', label: 'Cost to Apply' },
                { icon: 'fa-sync-alt', value: 'Regular', label: 'Updates' },
                { icon: 'fa-hands-helping', value: 'Free', label: 'SNC Support' },
              ].map(({ icon, value, label }) => (
                <div key={label} className="card p-5 text-center">
                  <i className={`fas ${icon} text-primary text-xl mb-2 block`} />
                  <div className="text-2xl font-heading font-black text-primary mb-0.5">{value}</div>
                  <div className="text-xs text-muted">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scholarship Listings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Opportunities</p>
            <h2 className="section-title">Scholarship Directory</h2>
            <p className="section-subtitle mb-8">Filter by category to find opportunities that match your situation.</p>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-muted border border-gray-200 hover:bg-primary/10 hover:text-primary hover:border-primary/30'
                  }`}
                >
                  {cat === 'all' ? 'All Scholarships' : cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.map(({ category, color, items }) => (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${color}`}>{category}</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="space-y-5">
                {items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    className="card p-6 md:p-8"
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <div className="grid md:grid-cols-[1fr_auto] gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className="font-heading font-bold text-dark text-lg">{item.name}</h3>
                          {item.open
                            ? <span className="text-xs bg-green-100 text-green-700 font-bold px-2.5 py-0.5 rounded-full">Open</span>
                            : <span className="text-xs bg-gray-100 text-gray-500 font-bold px-2.5 py-0.5 rounded-full">Check Site</span>
                          }
                        </div>
                        <p className="text-primary text-sm font-semibold">{item.org}</p>
                      </div>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-sm self-start whitespace-nowrap"
                      >
                        <i className="fas fa-external-link-alt text-xs mr-1" /> Visit Site
                      </a>
                    </div>
                    <p className="text-muted text-sm leading-relaxed mb-5">{item.desc}</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      {[
                        { icon: 'fa-graduation-cap', label: 'Level', value: item.level },
                        { icon: 'fa-book', label: 'Focus', value: item.focus },
                        { icon: 'fa-dollar-sign', label: 'Value', value: item.value },
                        { icon: 'fa-calendar', label: 'Deadline', value: item.deadline },
                      ].map(({ icon, label, value }) => (
                        <div key={label} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center gap-1.5 text-muted mb-1">
                            <i className={`fas ${icon} text-primary text-[0.65rem]`} />
                            <span className="font-semibold uppercase tracking-wide text-[0.65rem]">{label}</span>
                          </div>
                          <p className="text-dark font-medium leading-snug">{value}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Tips */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">How to Win</p>
            <h2 className="section-title">6 Tips for a Strong Application</h2>
            <p className="section-subtitle">The difference between a rejected and successful application is almost always preparation.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="card p-6"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              >
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

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Questions</p>
            <h2 className="section-title">Scholarship FAQs</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-dark text-sm hover:text-primary transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {q}
                  <i className={`fas fa-chevron-down text-primary text-xs ml-4 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-muted text-sm leading-relaxed border-t border-gray-100 pt-3">{a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <i className="fas fa-graduation-cap text-white/20 text-5xl mb-6 block" />
          <h2 className="text-3xl font-heading font-bold mb-4">Need Help With Your Application?</h2>
          <p className="text-gray-300 mb-8">SNC offers personal statement review, application coaching, and mentor connections to help you put your best foot forward. Reach out — it's free.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Get Application Support</Link>
            <Link to="/resources/career-growth" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Career Resources</Link>
          </div>
        </div>
      </section>
    </>
  )
}
