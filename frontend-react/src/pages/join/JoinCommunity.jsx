import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import PageHeader from '../../components/ui/PageHeader'
import { fadeUp } from '../../lib/animations'

// ── Shared styles ─────────────────────────────────────────────────────────────
const inp = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-sans text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
const lbl = 'block text-xs font-semibold text-dark-soft mb-1'
const err = 'text-red-500 text-xs mt-1'

// ── Tab data ──────────────────────────────────────────────────────────────────
const tabs = [
  { id: 'community', icon: 'fa-users',              label: 'Join Community' },
  { id: 'volunteer', icon: 'fa-hands-helping',      label: 'Volunteer' },
  { id: 'mentor',    icon: 'fa-user-tie',           label: 'Become a Mentor' },
  { id: 'trainer',   icon: 'fa-chalkboard-teacher', label: 'Become a Trainer' },
]

// ── Community data ────────────────────────────────────────────────────────────
const channels = [
  { icon: 'fab fa-whatsapp', title: 'WhatsApp Groups',    desc: 'Topic-specific groups for developers, designers, students, and entrepreneurs — active daily discussions.', color: 'text-green-600 bg-green-50' },
  { icon: 'fab fa-linkedin', title: 'LinkedIn Community', desc: 'Connect with SNC alumni, mentors, and partners. Share work and celebrate achievements.', color: 'text-blue-600 bg-blue-50' },
  { icon: 'fab fa-facebook', title: 'Facebook Group',     desc: 'A space for South Sudanese tech enthusiasts to share news, resources, and opportunities.', color: 'text-blue-700 bg-blue-50' },
  { icon: 'fas fa-calendar', title: 'Monthly Events',     desc: 'Hackathons, webinars, tech talks, and networking events — free for all members.', color: 'text-primary bg-primary/10' },
  { icon: 'fas fa-briefcase','title': 'Job Board',        desc: 'First access to job postings from SNC employer partners who trust our community.', color: 'text-purple-600 bg-purple-50' },
  { icon: 'fas fa-user-tie', title: 'Mentorship',         desc: 'Get matched with an experienced mentor for career guidance and professional development.', color: 'text-orange-600 bg-orange-50' },
]

// ── Volunteer data ────────────────────────────────────────────────────────────
const volunteerRoles = [
  { icon: 'fa-hands-helping',      title: 'Community Outreach',    desc: 'Reach more South Sudanese through events, school visits, and community engagement programs.' },
  { icon: 'fa-pen-nib',            title: 'Content Creator',       desc: 'Create social media content or produce educational material that helps our audience.' },
  { icon: 'fa-camera',             title: 'Media & Photography',   desc: 'Document SNC events and impact through photography, videography, or graphic design.' },
  { icon: 'fa-calendar-check',     title: 'Event Organiser',       desc: 'Help plan and run SNC workshops, networking events, and community meetups in Juba.' },
]

const volunteerSchema = z.object({
  firstName: z.string().min(1, 'Required'), lastName: z.string().min(1, 'Required'),
  email: z.string().email('Valid email required'), phone: z.string().optional(),
  role: z.string().min(1, 'Please select a role'),
  availability: z.string().min(1, 'Please select availability'),
  experience: z.string().min(20, 'Min 20 characters'),
  motivation: z.string().min(20, 'Min 20 characters'),
})

// ── Mentor data ───────────────────────────────────────────────────────────────
const mentorAreas = [
  'Leadership & Personal Development', 'Career Guidance & Coaching',
  'Software Engineering', 'UI/UX & Product Design', 'Data Science & AI',
  'Tech Entrepreneurship', 'Digital Marketing', 'Project Management',
]

const mentorSchema = z.object({
  firstName: z.string().min(1), lastName: z.string().min(1),
  email: z.string().email(), phone: z.string().optional(),
  area: z.string().min(1, 'Please select an area'),
  experience: z.string().min(1, 'Please select experience'),
  availability: z.string().min(1, 'Please select availability'),
  location: z.string().min(1, 'Enter your location'),
  bio: z.string().min(30, 'Min 30 characters'),
  motivation: z.string().min(20, 'Min 20 characters'),
  linkedin: z.string().url('Must be valid URL').or(z.literal('')).optional(),
})

// ── Trainer data ──────────────────────────────────────────────────────────────
const trainerSubjects = [
  'Leadership & Communication', 'Career Development & Coaching',
  'Web Development (HTML/CSS/JS/React)', 'Mobile App Development',
  'UI/UX Design (Figma)', 'Data Science & Python',
  'Digital Marketing & SEO', 'Entrepreneurship & Business',
]

const trainerSchema = z.object({
  firstName: z.string().min(1), lastName: z.string().min(1),
  email: z.string().email(), phone: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  experience: z.string().min(1, 'Please select experience'),
  bio: z.string().min(30, 'Min 30 characters'),
  sampleTopic: z.string().min(10, 'Min 10 characters'),
  linkedin: z.string().url('Must be valid URL').or(z.literal('')).optional(),
})

// ── Community schema ──────────────────────────────────────────────────────────
const communitySchema = z.object({
  firstName: z.string().min(1), lastName: z.string().min(1),
  email: z.string().email(), phone: z.string().optional(),
  location: z.string().min(2, 'Enter your location'),
  role: z.string().min(1, 'Please select your role'),
  skills: z.string().optional(),
})

// ── Sub-forms ─────────────────────────────────────────────────────────────────
function SuccessCard({ msg, onReset }) {
  return (
    <div className="text-center py-14 bg-gray-50 rounded-2xl border border-gray-100">
      <i className="fas fa-check-circle text-green-500 text-5xl mb-4 block" />
      <h3 className="font-heading font-bold text-dark text-xl mb-2">Application Received!</h3>
      <p className="text-muted text-sm mb-6">{msg}</p>
      <button onClick={onReset} className="btn-secondary text-sm">Submit Another</button>
    </div>
  )
}

function CommunityForm() {
  const [done, setDone] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(communitySchema) })
  const onSubmit = async (data) => {
    try { await fetch('http://localhost:5000/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, type: 'community-join' }) }) } catch {}
    setDone(true); reset()
  }
  if (done) return <SuccessCard msg="You'll receive a welcome message with community links within 24 hours." onReset={() => setDone(false)} />
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={lbl}>First Name *</label><input {...register('firstName')} className={inp} placeholder="John" />{errors.firstName && <p className={err}>{errors.firstName.message}</p>}</div>
        <div><label className={lbl}>Last Name *</label><input {...register('lastName')} className={inp} placeholder="Deng" />{errors.lastName && <p className={err}>{errors.lastName.message}</p>}</div>
        <div><label className={lbl}>Email *</label><input {...register('email')} type="email" className={inp} placeholder="you@example.com" />{errors.email && <p className={err}>{errors.email.message}</p>}</div>
        <div><label className={lbl}>Phone / WhatsApp</label><input {...register('phone')} type="tel" className={inp} placeholder="+211 9XX XXX XXX" /></div>
      </div>
      <div><label className={lbl}>Location *</label><input {...register('location')} className={inp} placeholder="e.g. Juba, Central Equatoria" />{errors.location && <p className={err}>{errors.location.message}</p>}</div>
      <div>
        <label className={lbl}>I am a… *</label>
        <select {...register('role')} className={inp}>
          <option value="">Select your role</option>
          {['Student','Developer / Engineer','Designer','Entrepreneur / Startup Founder','Tech Professional','Educator / Trainer','NGO / Government Worker','Other'].map(o => <option key={o}>{o}</option>)}
        </select>
        {errors.role && <p className={err}>{errors.role.message}</p>}
      </div>
      <div><label className={lbl}>Main Skills / Interests (optional)</label><input {...register('skills')} className={inp} placeholder="e.g. Leadership, Web Development, Design…" /></div>
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3">
        {isSubmitting ? <><i className="fas fa-spinner fa-spin" /> Joining…</> : <><i className="fas fa-users" /> Join the Community — It's Free</>}
      </button>
      <p className="text-xs text-gray-400 text-center"><i className="fas fa-shield-alt mr-1" /> Free forever. No spam. Unsubscribe any time.</p>
    </form>
  )
}

function VolunteerForm() {
  const [done, setDone] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(volunteerSchema) })
  const onSubmit = async (data) => {
    try { await fetch('http://localhost:5000/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, type: 'volunteer' }) }) } catch {}
    setDone(true); reset()
  }
  if (done) return <SuccessCard msg="We'll be in touch within 5 business days about next steps." onReset={() => setDone(false)} />
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={lbl}>First Name *</label><input {...register('firstName')} className={inp} placeholder="John" />{errors.firstName && <p className={err}>{errors.firstName.message}</p>}</div>
        <div><label className={lbl}>Last Name *</label><input {...register('lastName')} className={inp} placeholder="Deng" />{errors.lastName && <p className={err}>{errors.lastName.message}</p>}</div>
        <div><label className={lbl}>Email *</label><input {...register('email')} type="email" className={inp} placeholder="you@example.com" />{errors.email && <p className={err}>{errors.email.message}</p>}</div>
        <div><label className={lbl}>Phone / WhatsApp</label><input {...register('phone')} type="tel" className={inp} placeholder="+211 9XX XXX XXX" /></div>
      </div>
      <div>
        <label className={lbl}>Volunteer Role *</label>
        <select {...register('role')} className={inp}>
          <option value="">Select a role…</option>
          {volunteerRoles.map(r => <option key={r.title}>{r.title}</option>)}
          <option>Other / Let SNC Decide</option>
        </select>
        {errors.role && <p className={err}>{errors.role.message}</p>}
      </div>
      <div>
        <label className={lbl}>Availability *</label>
        <select {...register('availability')} className={inp}>
          <option value="">Select availability…</option>
          <option>Weekday evenings (after 5pm)</option>
          <option>Weekends only</option>
          <option>Weekdays and weekends</option>
          <option>Flexible / Discuss</option>
        </select>
        {errors.availability && <p className={err}>{errors.availability.message}</p>}
      </div>
      <div><label className={lbl}>Your Background & Skills *</label><textarea {...register('experience')} rows={3} className={inp} placeholder="Tell us about your background and skills…" />{errors.experience && <p className={err}>{errors.experience.message}</p>}</div>
      <div><label className={lbl}>Why Do You Want to Volunteer? *</label><textarea {...register('motivation')} rows={3} className={inp} placeholder="Share what motivates you and what you hope to contribute…" />{errors.motivation && <p className={err}>{errors.motivation.message}</p>}</div>
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3">
        {isSubmitting ? <><i className="fas fa-spinner fa-spin" /> Submitting…</> : <><i className="fas fa-paper-plane" /> Submit Application</>}
      </button>
    </form>
  )
}

function MentorForm() {
  const [done, setDone] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(mentorSchema) })
  const onSubmit = async (data) => {
    try { await fetch('http://localhost:5000/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, type: 'mentor-application' }) }) } catch {}
    setDone(true); reset()
  }
  if (done) return <SuccessCard msg="We'll match you with mentees and be in touch within 5 business days." onReset={() => setDone(false)} />
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={lbl}>First Name *</label><input {...register('firstName')} className={inp} placeholder="Jane" />{errors.firstName && <p className={err}>{errors.firstName.message}</p>}</div>
        <div><label className={lbl}>Last Name *</label><input {...register('lastName')} className={inp} placeholder="Akello" />{errors.lastName && <p className={err}>{errors.lastName.message}</p>}</div>
        <div><label className={lbl}>Email *</label><input {...register('email')} type="email" className={inp} placeholder="you@example.com" />{errors.email && <p className={err}>{errors.email.message}</p>}</div>
        <div><label className={lbl}>Phone / WhatsApp</label><input {...register('phone')} type="tel" className={inp} placeholder="+211 9XX XXX XXX" /></div>
      </div>
      <div><label className={lbl}>Location (City / Country) *</label><input {...register('location')} className={inp} placeholder="e.g. Juba, South Sudan or Nairobi, Kenya" />{errors.location && <p className={err}>{errors.location.message}</p>}</div>
      <div>
        <label className={lbl}>Area of Expertise *</label>
        <select {...register('area')} className={inp}>
          <option value="">Select your main expertise…</option>
          {mentorAreas.map(a => <option key={a}>{a}</option>)}
          <option>Other</option>
        </select>
        {errors.area && <p className={err}>{errors.area.message}</p>}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Years of Experience *</label>
          <select {...register('experience')} className={inp}>
            <option value="">Select…</option>
            <option>2–4 years</option><option>5–8 years</option><option>9–14 years</option><option>15+ years</option>
          </select>
          {errors.experience && <p className={err}>{errors.experience.message}</p>}
        </div>
        <div>
          <label className={lbl}>Availability *</label>
          <select {...register('availability')} className={inp}>
            <option value="">Select…</option>
            <option>Evenings (after 5pm EAT)</option><option>Weekends</option><option>Flexible</option><option>Remote only</option>
          </select>
          {errors.availability && <p className={err}>{errors.availability.message}</p>}
        </div>
      </div>
      <div><label className={lbl}>LinkedIn Profile URL</label><input {...register('linkedin')} type="url" className={inp} placeholder="https://linkedin.com/in/yourname" />{errors.linkedin && <p className={err}>{errors.linkedin.message}</p>}</div>
      <div><label className={lbl}>Professional Bio *</label><textarea {...register('bio')} rows={3} className={inp} placeholder="Your background, current role, and key experience…" />{errors.bio && <p className={err}>{errors.bio.message}</p>}</div>
      <div><label className={lbl}>Why Do You Want to Mentor? *</label><textarea {...register('motivation')} rows={3} className={inp} placeholder="What motivates you to give back, and what your mentees will gain…" />{errors.motivation && <p className={err}>{errors.motivation.message}</p>}</div>
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3">
        {isSubmitting ? <><i className="fas fa-spinner fa-spin" /> Submitting…</> : <><i className="fas fa-paper-plane" /> Submit Mentor Application</>}
      </button>
      <p className="text-xs text-gray-400 text-center"><i className="fas fa-shield-alt mr-1" /> Your information is kept private and never sold.</p>
    </form>
  )
}

function TrainerForm() {
  const [done, setDone] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(trainerSchema) })
  const onSubmit = async (data) => {
    try { await fetch('http://localhost:5000/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, type: 'trainer-application' }) }) } catch {}
    setDone(true); reset()
  }
  if (done) return <SuccessCard msg="We'll review your application and be in touch within 5 business days." onReset={() => setDone(false)} />
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={lbl}>First Name *</label><input {...register('firstName')} className={inp} placeholder="Jane" />{errors.firstName && <p className={err}>{errors.firstName.message}</p>}</div>
        <div><label className={lbl}>Last Name *</label><input {...register('lastName')} className={inp} placeholder="Akello" />{errors.lastName && <p className={err}>{errors.lastName.message}</p>}</div>
        <div><label className={lbl}>Email *</label><input {...register('email')} type="email" className={inp} placeholder="you@example.com" />{errors.email && <p className={err}>{errors.email.message}</p>}</div>
        <div><label className={lbl}>Phone / WhatsApp</label><input {...register('phone')} type="tel" className={inp} placeholder="+211 9XX XXX XXX" /></div>
      </div>
      <div>
        <label className={lbl}>Subject / Topic Area *</label>
        <select {...register('subject')} className={inp}>
          <option value="">Select a subject…</option>
          {trainerSubjects.map(s => <option key={s}>{s}</option>)}
          <option>Other</option>
        </select>
        {errors.subject && <p className={err}>{errors.subject.message}</p>}
      </div>
      <div>
        <label className={lbl}>Years of Teaching / Training Experience *</label>
        <select {...register('experience')} className={inp}>
          <option value="">Select…</option>
          <option>Less than 1 year</option><option>1–2 years</option><option>3–5 years</option><option>6–10 years</option><option>10+ years</option>
        </select>
        {errors.experience && <p className={err}>{errors.experience.message}</p>}
      </div>
      <div><label className={lbl}>LinkedIn Profile URL</label><input {...register('linkedin')} type="url" className={inp} placeholder="https://linkedin.com/in/yourname" />{errors.linkedin && <p className={err}>{errors.linkedin.message}</p>}</div>
      <div><label className={lbl}>Professional Bio *</label><textarea {...register('bio')} rows={3} className={inp} placeholder="Your background, current role, and teaching experience…" />{errors.bio && <p className={err}>{errors.bio.message}</p>}</div>
      <div><label className={lbl}>Sample Topic / Lesson Idea *</label><textarea {...register('sampleTopic')} rows={2} className={inp} placeholder="e.g. 'Intro to React Hooks for beginners — 2-hour workshop'" />{errors.sampleTopic && <p className={err}>{errors.sampleTopic.message}</p>}</div>
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3">
        {isSubmitting ? <><i className="fas fa-spinner fa-spin" /> Submitting…</> : <><i className="fas fa-paper-plane" /> Submit Trainer Application</>}
      </button>
      <p className="text-xs text-gray-400 text-center"><i className="fas fa-shield-alt mr-1" /> Your information is kept private and never sold.</p>
    </form>
  )
}

// ── Tab content map ───────────────────────────────────────────────────────────
const tabContent = {
  community: {
    heading: 'Join Our Community',
    sub: 'Connect with South Sudanese tech professionals, students, and entrepreneurs. Free forever.',
    form: <CommunityForm />,
    extra: (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {channels.map(({ icon, title, desc, color }) => (
          <div key={title} className="card p-5 flex gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
              <i className={`${icon} text-lg`} />
            </div>
            <div><h4 className="font-heading font-bold text-dark text-sm mb-1">{title}</h4><p className="text-muted text-xs leading-relaxed">{desc}</p></div>
          </div>
        ))}
      </div>
    ),
  },
  volunteer: {
    heading: 'Volunteer With Us',
    sub: 'Give your time and skills to help SNC grow its impact across South Sudan.',
    form: <VolunteerForm />,
    extra: (
      <div className="space-y-8 mb-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">What You'll Do</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {volunteerRoles.map(({ icon, title, desc }) => (
              <div key={title} className="card p-5 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <i className={`fas ${icon} text-primary`} />
                </div>
                <div><h4 className="font-heading font-bold text-dark text-sm mb-1">{title}</h4><p className="text-muted text-xs leading-relaxed">{desc}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">What You'll Gain</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: 'fa-certificate',   title: 'Official Certificate',  desc: "Receive a signed SNC Volunteer Certificate to add to your CV and LinkedIn profile." },
              { icon: 'fa-network-wired', title: 'Grow Your Network',     desc: 'Work alongside SNC staff, trainers, and partners — connections that open real doors.' },
              { icon: 'fa-star',          title: 'Build Real Experience', desc: 'Gain hands-on experience in events, content, media, or outreach that employers value.' },
              { icon: 'fa-heart',         title: 'Give Back',             desc: 'Directly contribute to empowering South Sudanese youth through technology and education.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card p-5 flex gap-4 border-l-4 border-l-primary/30">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                  <i className={`fas ${icon} text-green-600`} />
                </div>
                <div><h4 className="font-heading font-bold text-dark text-sm mb-1">{title}</h4><p className="text-muted text-xs leading-relaxed">{desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  mentor: {
    heading: 'Become a Mentor',
    sub: 'Share your expertise and help the next generation of South Sudanese professionals grow.',
    form: <MentorForm />,
    extra: (
      <div className="space-y-8 mb-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">What Mentors Do</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: 'fa-comments',  title: '1-on-1 Sessions',    desc: 'Meet your mentee monthly (or more) via video call or in person to guide their career journey.' },
              { icon: 'fa-map-signs', title: 'Career Guidance',    desc: 'Help mentees navigate job searches, skill gaps, interviews, and professional decisions.' },
              { icon: 'fa-lightbulb', title: 'Share Your Story',   desc: 'Your lived experience — the wins and the setbacks — is the most valuable thing you can offer.' },
              { icon: 'fa-tasks',     title: 'Set Goals Together', desc: 'Work with your mentee to set clear, achievable goals and hold them accountable over time.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card p-5 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <i className={`fas ${icon} text-primary`} />
                </div>
                <div><h4 className="font-heading font-bold text-dark text-sm mb-1">{title}</h4><p className="text-muted text-xs leading-relaxed">{desc}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">What You'll Gain</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: 'fa-certificate',        title: 'SNC Mentor Badge',    desc: 'Recognised on our website and issued a digital badge you can display on LinkedIn.' },
              { icon: 'fa-chalkboard',         title: 'Free Training Access',desc: 'Access select SNC workshops and resources to keep your own skills sharp.' },
              { icon: 'fa-users',              title: 'Mentor Community',    desc: 'Join a private group of SNC mentors — share ideas, challenges, and best practices.' },
              { icon: 'fa-hand-holding-heart', title: 'Lasting Impact',      desc: "The professionals you guide today will shape South Sudan's digital economy tomorrow." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card p-5 flex gap-4 border-l-4 border-l-primary/30">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <i className={`fas ${icon} text-orange-600`} />
                </div>
                <div><h4 className="font-heading font-bold text-dark text-sm mb-1">{title}</h4><p className="text-muted text-xs leading-relaxed">{desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  trainer: {
    heading: 'Become a Trainer',
    sub: 'Deliver workshops and courses that build real skills for real careers.',
    form: <TrainerForm />,
    extra: (
      <div className="space-y-8 mb-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">What Trainers Do</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: 'fa-chalkboard-teacher', title: 'Deliver Workshops', desc: 'Run live in-person or online sessions for SNC learners — from 2-hour workshops to full courses.' },
              { icon: 'fa-file-alt',           title: 'Create Curriculum', desc: 'Design lesson plans and materials that SNC will help you refine and publish.' },
              { icon: 'fa-user-check',         title: 'Assess Learners',   desc: 'Set practical assignments and provide feedback that helps students build job-ready skills.' },
              { icon: 'fa-redo',               title: 'Iterate & Improve', desc: 'Work with the SNC team after each cohort to improve content based on learner feedback.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card p-5 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <i className={`fas ${icon} text-primary`} />
                </div>
                <div><h4 className="font-heading font-bold text-dark text-sm mb-1">{title}</h4><p className="text-muted text-xs leading-relaxed">{desc}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">What You'll Gain</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: 'fa-money-bill-wave', title: 'Trainer Stipend',     desc: 'Paid per session or cohort — compensation discussed during onboarding based on scope.' },
              { icon: 'fa-certificate',     title: 'SNC Trainer Profile', desc: 'Featured on the SNC website as a recognised trainer with your bio and expertise.' },
              { icon: 'fa-bullhorn',        title: 'Grow Your Brand',     desc: 'Teaching builds your reputation. SNC promotes your sessions to our full community.' },
              { icon: 'fa-graduation-cap',  title: 'Shape the Future',    desc: 'Your knowledge directly equips South Sudanese professionals with skills that change lives.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card p-5 flex gap-4 border-l-4 border-l-primary/30">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <i className={`fas ${icon} text-blue-600`} />
                </div>
                <div><h4 className="font-heading font-bold text-dark text-sm mb-1">{title}</h4><p className="text-muted text-xs leading-relaxed">{desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function JoinCommunity() {
  const [active, setActive] = useState('community')
  const content = tabContent[active]

  return (
    <>
      <Helmet>
        <title>Get Involved — Volunteer, Mentor & Trainer Opportunities | Sleek Nexus Creative</title>
        <meta name="description" content="Join the SNC community in South Sudan. Volunteer, become a mentor, or train the next generation of tech professionals. Free to join — make a real impact in Juba." />
        <meta name="keywords" content="volunteer South Sudan, become a mentor Juba, tech trainer South Sudan, join SNC community, get involved South Sudan tech" />
        <link rel="canonical" href="https://sleeknexuscreative.com/join-community" />
      </Helmet>
      <PageHeader
        label="Get Involved"
        title="Be Part of Something Bigger"
        desc="Whether you want to join our community, volunteer, mentor, or train — there's a place for you at SNC."
      />

      {/* Tabs */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Tab bar */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-100 pb-4">
            {tabs.map(({ id, icon, label }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active === id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-gray-100 text-dark-soft hover:bg-gray-200'
                }`}
              >
                <i className={`fas ${icon} text-xs`} />
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-dark mb-2">{content.heading}</h2>
                <p className="text-muted">{content.sub}</p>
              </div>
              {content.extra}
              {content.form}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
