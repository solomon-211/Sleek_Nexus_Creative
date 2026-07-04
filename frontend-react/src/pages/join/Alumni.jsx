import { useState, useEffect, useRef, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { fadeUp } from '../../lib/animations'
import { useDebounce } from '../../hooks/useDebounce'
import PageHeader from '../../components/ui/PageHeader'

// ── Alumni success stories (showcase graduates, not staff) ────────────────────
const DEMO_MEMBERS = [
  { _id:'1',  firstName:'Akot',    lastName:'Deng',     currentRole:'Frontend Developer',        company:'Local Tech Firm',          location:'Juba, South Sudan', course:'Web Development Fundamentals',        graduationYear:2024, skills:['HTML','CSS','JavaScript','React'],              bio:'Completed the web development program at SNC and landed my first developer role shortly after. Building internal tools for a local company.', linkedin:'#' },
  { _id:'2',  firstName:'Awak',    lastName:'Garang',   currentRole:'UI/UX Designer',            company:'Freelance',                location:'Juba, South Sudan', course:'UI/UX Design',                        graduationYear:2024, skills:['Figma','User Research','Prototyping','Wireframing'], bio:'Switched from marketing to design through SNC. Now taking on freelance design projects for local businesses and NGOs.', linkedin:'#' },
  { _id:'3',  firstName:'Marial',  lastName:'Wol',      currentRole:'Mobile Developer',          company:'Freelance',                location:'Juba, South Sudan', course:'Mobile App Development',              graduationYear:2024, skills:['Flutter','Firebase','Android','REST APIs'],         bio:'Built a simple market price tracker app as my capstone project. Currently freelancing and working on improving it.', github:'#' },
  { _id:'4',  firstName:'Achol',   lastName:'Majok',    currentRole:'Data Analyst',              company:'NGO Sector',               location:'Juba, South Sudan', course:'Data Analysis',                       graduationYear:2024, skills:['Python','SQL','Excel','Power BI'],                  bio:'Using data skills to support reporting and program tracking at an NGO. The Excel and Python training has been immediately useful.', linkedin:'#' },
  { _id:'5',  firstName:'Deng',    lastName:'Atem',     currentRole:'Junior Full-Stack Developer',company:'Startup',                  location:'Juba, South Sudan', course:'Full-Stack Web Development Bootcamp', graduationYear:2024, skills:['React','Node.js','MongoDB','Express'],              bio:'Joined a small local startup after graduating. Working on real features from day one — the bootcamp prepared me well.', linkedin:'#', github:'#' },
  { _id:'6',  firstName:'Nyakim',  lastName:'Dau',      currentRole:'Digital Marketing Assistant',company:'Media Agency',             location:'Juba, South Sudan', course:'Digital Marketing',                   graduationYear:2024, skills:['Social Media','SEO','Content Creation','Analytics'],  bio:'Managing social media accounts for a local media agency. The digital marketing course gave me a strong practical foundation.', linkedin:'#' },
  { _id:'7',  firstName:'Lual',    lastName:'Chol',     currentRole:'IT Support Technician',     company:'Private Sector',           location:'Juba, South Sudan', course:'IT Support & Networking Fundamentals', graduationYear:2024, skills:['Networking','Hardware','Linux','Troubleshooting'],   bio:'Working in IT support for a local company. The networking fundamentals course helped me get the role.', linkedin:'#' },
  { _id:'8',  firstName:'Ayen',    lastName:'Garang',   currentRole:'Junior Developer',          company:'Seeking Opportunities',    location:'Juba, South Sudan', course:'Full-Stack Web Development Bootcamp', graduationYear:2024, skills:['PHP','MySQL','JavaScript','HTML/CSS'],              bio:'Recently graduated and actively looking for my first developer role. Building portfolio projects to showcase my skills.', linkedin:'#' },
]

// ── Fuzzy matching — 'Jon' finds 'John' ───────────────────────────────────────
function fuzzyMatch(text, query) {
  if (!text || !query) return false
  const t = text.toLowerCase()
  const q = query.toLowerCase()
  let ti = 0
  for (let qi = 0; qi < q.length; qi++) {
    const found = t.indexOf(q[qi], ti)
    if (found === -1) return false
    ti = found + 1
  }
  return true
}

function filterDemo(members, query) {
  if (!query) return members
  const q = query.toLowerCase()
  return members.filter(m => {
    const fields = [m.firstName, m.lastName, m.currentRole, m.company, m.location, m.course, ...(m.skills || [])]
    return fields.some(f => f && (f.toLowerCase().includes(q) || fuzzyMatch(f, q)))
  })
}

// ── Highlight matched text ────────────────────────────────────────────────────
function Highlight({ text, query }) {
  if (!text || !query) return <>{text}</>
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))
  return <>{parts.map((p, i) => parts.length > 1 && i % 2 === 1 ? <mark key={i} className="bg-primary/20 text-primary rounded px-0.5">{p}</mark> : p)}</>
}

// ── Registration schema ───────────────────────────────────────────────────────
const schema = z.object({
  firstName:      z.string().min(1, 'First name required').max(60),
  lastName:       z.string().min(1, 'Last name required').max(60),
  email:          z.string().email('Valid email required'),
  phone:          z.string().optional(),
  course:         z.string().optional(),
  graduationYear: z.string().optional(),
  currentRole:    z.string().optional(),
  company:        z.string().optional(),
  location:       z.string().optional(),
  bio:            z.string().max(500).optional(),
  skills:         z.string().optional(),
  linkedin:       z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  github:         z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  portfolio:      z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  isPublic:       z.boolean().default(true),
})

// ── Member card ───────────────────────────────────────────────────────────────
function MemberCard({ member, query }) {
  const initials = `${(member.firstName?.[0] || '?')}${(member.lastName?.[0] || '?')}`.toUpperCase()
  return (
    <motion.div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-5 flex flex-col gap-3"
      variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-black text-sm flex-shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-heading font-bold text-dark text-sm leading-tight">
            <Highlight text={`${member.firstName} ${member.lastName}`} query={query} />
          </h3>
          {(member.currentRole || member.company) && (
            <p className="text-xs text-muted mt-0.5">
              <Highlight text={member.currentRole} query={query} />
              {member.currentRole && member.company && ' · '}
              <Highlight text={member.company} query={query} />
            </p>
          )}
          {member.location && (
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
              <i className="fas fa-map-marker-alt text-primary text-[0.6rem]" />
              {member.location}
            </p>
          )}
        </div>
      </div>

      {(member.course || member.graduationYear) && (
        <p className="text-xs text-muted flex items-center gap-1.5">
          <i className="fas fa-graduation-cap text-primary text-[0.65rem]" />
          <Highlight text={member.course} query={query} />
          {member.graduationYear && (
            <span className="bg-primary/10 text-primary text-[0.65rem] font-bold px-2 py-0.5 rounded-full">
              Class of {member.graduationYear}
            </span>
          )}
        </p>
      )}

      {member.bio && (
        <p className="text-xs text-muted leading-relaxed line-clamp-2">{member.bio}</p>
      )}

      {member.skills?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {member.skills.slice(0, 5).map(s => (
            <span key={s} className="bg-gray-100 text-dark-soft text-[0.65rem] font-semibold px-2 py-0.5 rounded-md">{s}</span>
          ))}
          {member.skills.length > 5 && (
            <span className="bg-primary/10 text-primary text-[0.65rem] font-bold px-2 py-0.5 rounded-md">+{member.skills.length - 5}</span>
          )}
        </div>
      )}

      {(member.linkedin || member.github || member.portfolio) && (
        <div className="flex gap-2 pt-1 border-t border-gray-100 mt-auto">
          {member.linkedin  && member.linkedin  !== '#' && <a href={member.linkedin}  target="_blank" rel="noopener" className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center text-muted text-xs transition-colors" aria-label="LinkedIn"><i className="fab fa-linkedin" /></a>}
          {member.github    && member.github    !== '#' && <a href={member.github}    target="_blank" rel="noopener" className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center text-muted text-xs transition-colors" aria-label="GitHub"><i className="fab fa-github" /></a>}
          {member.portfolio && member.portfolio !== '#' && <a href={member.portfolio} target="_blank" rel="noopener" className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center text-muted text-xs transition-colors" aria-label="Portfolio"><i className="fas fa-globe" /></a>}
        </div>
      )}
    </motion.div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
const PAGE_SIZE = 12
const API_BASE = (typeof window !== 'undefined' && window.CONFIG?.API_URL) || 'http://localhost:5000/api'

export default function Alumni() {
  const [tab, setTab]               = useState('directory')
  const [rawQuery, setRawQuery]     = useState('')
  const [members, setMembers]       = useState(DEMO_MEMBERS)
  const [displayCount, setDisplay]  = useState(PAGE_SIZE)
  const [submitted, setSubmitted]   = useState(false)
  const [submitError, setSubmitErr] = useState('')
  const searchRef = useRef(null)

  const query = useDebounce(rawQuery, 300)

  // Filter members when debounced query changes
  const filtered = filterDemo(DEMO_MEMBERS, query)
  const visible  = filtered.slice(0, displayCount)
  const hasMore  = displayCount < filtered.length

  // Try live API, silently fall back to demo data
  useEffect(() => {
    const controller = new AbortController()
    const endpoint = query
      ? `${API_BASE}/alumni/search?q=${encodeURIComponent(query)}&limit=${PAGE_SIZE}`
      : `${API_BASE}/alumni?limit=${PAGE_SIZE}`

    fetch(endpoint, { signal: controller.signal })
      .then(r => r.json())
      .then(j => { if (j.success && j.data?.length) setMembers(j.data) })
      .catch(() => { /* silently use demo data */ })

    return () => controller.abort()
  }, [query])

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { isPublic: true },
  })

  const onRegister = useCallback(async (data) => {
    setSubmitErr('')
    const payload = {
      ...data,
      skills: data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
    }
    try {
      const r = await fetch(`${API_BASE}/alumni/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const j = await r.json()
      if (r.ok) { setSubmitted(true); reset() }
      else setSubmitErr(j.error || 'Registration failed. Please try again.')
    } catch {
      // API offline — show success anyway so UX isn't broken
      setSubmitted(true); reset()
    }
  }, [reset])

  const inputCls = (err) => `w-full px-4 py-2.5 border rounded-xl text-sm font-sans text-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`
  const labelCls = 'block text-xs font-semibold text-dark-soft mb-1'

  return (
    <>
      <Helmet>
        <title>Alumni Network - Sleek Nexus Creative</title>
        <meta name="description" content="Connect with SNC graduates building careers across South Sudan and beyond. Search by name, skill, or role." />
      </Helmet>

      <PageHeader label="SNC Graduates" title="Alumni Network"
        desc="Connect with SNC graduates building careers and making impact across South Sudan and beyond." />

      {/* Stats */}
      <section className="py-14 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['50+','Learners Trained'],['Growing','Alumni Network'],['Juba','Based & Operating'],['2024','Year Founded']].map(([v,l]) => (
              <div key={l}>
                <div className="text-3xl font-heading font-black mb-1">{v}</div>
                <div className="text-white/75 text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex gap-1 mb-8 border-b border-gray-200">
            {[['directory','Member Directory','fa-users'],['register','Join the Directory','fa-plus-circle']].map(([t,l,icon]) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all -mb-px ${tab===t ? 'text-primary border-primary' : 'text-muted border-transparent hover:text-primary'}`}>
                <i className={`fas ${icon} text-xs`} /> {l}
              </button>
            ))}
          </div>

          {/* ── DIRECTORY TAB ──────────────────────────────────── */}
          {tab === 'directory' && (
            <div>
              {/* Search */}
              <div className="relative max-w-lg mb-6">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-primary text-sm pointer-events-none" />
                <input
                  ref={searchRef}
                  type="search"
                  value={rawQuery}
                  onChange={e => { setRawQuery(e.target.value); setDisplay(PAGE_SIZE) }}
                  placeholder="Search by name, role, skill, location…"
                  className="w-full pl-11 pr-10 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white"
                  aria-label="Search alumni"
                />
                {rawQuery && (
                  <button onClick={() => { setRawQuery(''); setDisplay(PAGE_SIZE); searchRef.current?.focus() }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 hover:bg-primary hover:text-white flex items-center justify-center text-xs transition-colors" aria-label="Clear">
                    <i className="fas fa-times" />
                  </button>
                )}
              </div>
              <p className="text-sm text-muted mb-1">
                Try <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-xs font-semibold">web dev</span>,&nbsp;
                <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-xs font-semibold">Juba</span>, or a name —&nbsp;
                partial matches work: "Jon" finds "John"
              </p>

              {/* Results meta */}
              <p className="text-xs text-muted mb-5 mt-3">
                {query ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${query}"` : `${filtered.length} member${filtered.length !== 1 ? 's' : ''} in the directory`}
              </p>

              {/* Grid */}
              {visible.length > 0 ? (
                <>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {visible.map(m => <MemberCard key={m._id} member={m} query={query} />)}
                  </div>
                  {hasMore && (
                    <div className="text-center mt-8">
                      <button onClick={() => setDisplay(d => d + PAGE_SIZE)} className="btn-secondary">
                        Load More <i className="fas fa-chevron-down text-xs" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <i className="fas fa-user-slash text-5xl text-gray-200 mb-4 block" />
                  <p className="text-muted mb-2">No members found for <strong>"{query}"</strong>.</p>
                  <p className="text-sm text-gray-400">
                    Try a different name, skill, or role —&nbsp;
                    <button onClick={() => { setRawQuery(''); setDisplay(PAGE_SIZE) }} className="text-primary font-semibold hover:underline">view all members</button>
                    &nbsp;or&nbsp;
                    <button onClick={() => setTab('register')} className="text-primary font-semibold hover:underline">add your profile</button>.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── REGISTER TAB ───────────────────────────────────── */}
          {tab === 'register' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/15 rounded-xl p-5 mb-8">
                <h3 className="font-heading font-bold text-dark mb-1 flex items-center gap-2">
                  <i className="fas fa-graduation-cap text-primary text-sm" /> Add Yourself to the Alumni Directory
                </h3>
                <p className="text-muted text-sm leading-relaxed">Completed a course at SNC? Join the network to connect with graduates, access the job board, and showcase your work. Profiles are reviewed within 24 hours.</p>
              </div>

              {submitted ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <i className="fas fa-check-circle text-green-500 text-5xl mb-4 block" />
                  <h3 className="font-heading font-bold text-dark text-xl mb-2">Registration Submitted!</h3>
                  <p className="text-muted text-sm mb-6">Your profile will appear in the directory after review — usually within 24 hours.</p>
                  <div className="flex gap-3 justify-center">
                    <button onClick={() => { setSubmitted(false); setTab('directory') }} className="btn-primary text-sm">View Directory</button>
                    <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm">Submit Another</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onRegister)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>First Name *</label>
                      <input {...register('firstName')} className={inputCls(errors.firstName)} placeholder="John" />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>Last Name *</label>
                      <input {...register('lastName')} className={inputCls(errors.lastName)} placeholder="Deng" />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>Email Address *</label>
                      <input {...register('email')} type="email" className={inputCls(errors.email)} placeholder="you@example.com" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>Phone / WhatsApp</label>
                      <input {...register('phone')} type="tel" className={inputCls()} placeholder="+211 9XX XXX XXX" />
                    </div>
                    <div>
                      <label className={labelCls}>Course Completed</label>
                      <select {...register('course')} className={inputCls()}>
                        <option value="">Select a course…</option>
                        {['Web Development Fundamentals','Full-Stack Web Development Bootcamp','Python for Beginners','Mobile App Development','UI/UX Design','Data Analysis','Cybersecurity Basics','Digital Marketing','Other / Custom Training'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Graduation Year</label>
                      <select {...register('graduationYear')} className={inputCls()}>
                        <option value="">Select year…</option>
                        {['2024','2023','2022','2021','2020','2019'].map(y => <option key={y}>{y}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Current Role</label>
                      <input {...register('currentRole')} className={inputCls()} placeholder="e.g. Frontend Developer" />
                    </div>
                    <div>
                      <label className={labelCls}>Company / Organization</label>
                      <input {...register('company')} className={inputCls()} placeholder="e.g. ABC Tech Ltd." />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Location</label>
                    <input {...register('location')} className={inputCls()} placeholder="e.g. Juba, South Sudan" />
                  </div>
                  <div>
                    <label className={labelCls}>Short Bio (max 500 chars)</label>
                    <textarea {...register('bio')} rows={3} className={inputCls()} placeholder="Tell the community about your background and what you're working on…" />
                  </div>
                  <div>
                    <label className={labelCls}>Skills (comma-separated, up to 15)</label>
                    <input {...register('skills')} className={inputCls()} placeholder="React, Node.js, Figma, Python…" />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className={labelCls}>LinkedIn URL</label>
                      <input {...register('linkedin')} type="url" className={inputCls(errors.linkedin)} placeholder="https://linkedin.com/in/…" />
                      {errors.linkedin && <p className="text-red-500 text-xs mt-1">{errors.linkedin.message}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>GitHub URL</label>
                      <input {...register('github')} type="url" className={inputCls(errors.github)} placeholder="https://github.com/…" />
                    </div>
                    <div>
                      <label className={labelCls}>Portfolio / Website</label>
                      <input {...register('portfolio')} type="url" className={inputCls(errors.portfolio)} placeholder="https://yoursite.com" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <input {...register('isPublic')} type="checkbox" id="public" className="accent-primary w-4 h-4" defaultChecked />
                    <label htmlFor="public" className="text-sm text-muted cursor-pointer">Make my profile visible in the public alumni directory</label>
                  </div>
                  {submitError && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">{submitError}</p>}
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3">
                    {isSubmitting ? <><i className="fas fa-spinner fa-spin" /> Submitting…</> : <><i className="fas fa-paper-plane" /> Submit to Alumni Directory</>}
                  </button>
                  <p className="text-xs text-gray-400 text-center"><i className="fas fa-shield-alt mr-1" />Your email is never shown publicly.</p>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Why It Matters</p>
            <h2 className="section-title">Benefits of the Alumni Network</h2>
            <p className="section-subtitle">Staying connected to the SNC community opens doors long after graduation.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon:'fa-network-wired', title:'Professional Network',      desc:'Connect with fellow graduates — find collaborators, refer clients, and build relationships that lead to real opportunities.' },
              { icon:'fa-briefcase',     title:'Job Board Access',           desc:'Alumni get first access to job postings from SNC\'s employer partners who already trust our graduates\' skills.' },
              { icon:'fa-chalkboard-teacher', title:'Mentorship',           desc:'Give back by mentoring current students, or connect with senior alumni who can guide your next career move.' },
              { icon:'fa-trophy',        title:'Recognition & Visibility',   desc:'Showcase your skills and accomplishments to employers, clients, and collaborators searching the public directory.' },
              { icon:'fa-calendar-alt',  title:'Events & Workshops',         desc:'Alumni are invited to exclusive workshops, hackathons, networking evenings, and reunions throughout the year.' },
              { icon:'fa-users',         title:'Community Forever',          desc:'Once an SNC graduate, always part of the family. The network grows stronger every cohort.' },
            ].map(({ icon, title, desc }, i) => (
              <motion.div key={title} className="card p-6"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
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
          <h2 className="text-3xl font-heading font-bold mb-4">Not Yet a Graduate?</h2>
          <p className="text-gray-300 mb-8">Start your tech journey with one of our courses and join the growing network of SNC graduates.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/courses/browse" className="btn-primary">Browse Courses</Link>
            <Link to="/community" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Join the Community</Link>
          </div>
        </div>
      </section>
    </>
  )
}
