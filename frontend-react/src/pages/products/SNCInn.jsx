import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../../components/ui/SEO'
import { pageSeo } from '../../lib/seo-data'
import { fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItem } from '../../lib/animations'
import PageHeader from '../../components/ui/PageHeader'
import CtaBand from '../../components/ui/CtaBand'
import { SNCINN_URL } from '../../lib/work-data'

const FEATURES = [
  { icon: 'fa-calendar-check',       title: 'Room & Booking Management',   desc: 'Live room calendar, walk-in and online bookings, and transactional double-booking prevention across all room types.' },
  { icon: 'fa-right-to-bracket',     title: 'Check-in & Check-out',        desc: 'Guest registration with ID capture, room assignment, extras tracking, and itemized billing in under 3 minutes.' },
  { icon: 'fa-file-invoice-dollar',  title: 'Billing & Payments',          desc: 'Cash, mobile money, and bank transfer recording. Branded PDF invoices and receipts in USD and SSP.' },
  { icon: 'fa-bell',                 title: 'Guest Service Requests',      desc: 'Guests scan a QR code to request cleaning or report issues. Staff get instant alerts with automatic escalation.' },
  { icon: 'fa-broom',                title: 'Housekeeping & Maintenance',  desc: 'Auto-generated cleaning lists after check-out, task assignment, maintenance logs, and preventive reminders.' },
  { icon: 'fa-chart-line',           title: 'Manager Dashboard',           desc: 'Real-time occupancy, revenue KPIs, staff activity, audit trail, and exportable reports — from anywhere.' },
  { icon: 'fa-wifi',                 title: 'Offline-First',               desc: 'Reception keeps working through power cuts and internet outages. Actions queue and sync automatically.' },
  { icon: 'fa-shield-halved',        title: 'Role-Based Access',           desc: 'Owner, manager, receptionist, housekeeping, and maintenance — each sees only what they need.' },
]

const PLANS = [
  {
    name: 'Small',
    subtitle: 'Up to 15 rooms',
    price: '$49',
    period: '/month',
    highlight: false,
    features: ['Unlimited bookings', 'Check-in / check-out', 'Billing & receipts (USD + SSP)', 'Guest service requests', 'Manager dashboard', 'SMS notifications', 'Email support'],
  },
  {
    name: 'Medium',
    subtitle: 'Up to 50 rooms',
    price: '$99',
    period: '/month',
    highlight: true,
    features: ['Everything in Small', 'Housekeeping workflows', 'Maintenance logs', 'Staff activity reports', 'Audit trail', 'PDF & Excel exports', 'Priority support'],
  },
  {
    name: 'Large',
    subtitle: '50+ rooms',
    price: 'Custom',
    period: '',
    highlight: false,
    features: ['Everything in Medium', 'Corporate & NGO invoicing', 'Multi-property view', 'Advanced analytics', 'Dedicated onboarding', 'SLA-backed support', 'Custom integrations'],
  },
]

const STEPS = [
  { icon: 'fa-hotel',        number: '01', title: 'Register your hotel',  desc: 'Add your hotel profile, rooms, and rates in under a day.' },
  { icon: 'fa-users',        number: '02', title: 'Onboard your team',    desc: 'Add staff accounts with the right roles. We provide on-site training.' },
  { icon: 'fa-circle-check', number: '03', title: 'Go live',              desc: 'Start taking bookings, checking guests in, and tracking requests from day one.' },
  { icon: 'fa-chart-bar',    number: '04', title: 'Grow with data',       desc: 'Use daily reports and audit logs to spot trends, reduce fraud, and improve service.' },
]

const STATS = [
  { value: '0',       label: 'Double-bookings' },
  { value: '<3 min',  label: 'Check-in time' },
  { value: 'USD+SSP', label: 'Dual currency' },
  { value: '99.5%',   label: 'Uptime target' },
]

export default function SNCInn() {
  return (
    <>
      <SEO {...pageSeo['/products/sncinn']} />

      <PageHeader
        tone="dark"
        label="Product · Hospitality"
        title="SNCInn"
        desc="A multi-tenant, offline-capable hotel management platform — rooms, bookings, billing, guest requests, and manager control in one place. Built for South Sudan's hotels."
      />

      {/* ── Stats bar ── */}
      <section className="bg-dark border-b border-white/10">
        <div className="container-page">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {STATS.map(({ value, label }) => (
              <motion.div key={label} variants={staggerItem} className="py-6 px-4 sm:px-8 text-center">
                <div className="text-2xl sm:text-3xl font-black text-accent mb-1">{value}</div>
                <div className="text-white/50 text-xs font-semibold uppercase tracking-widest">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Problem / Solution ── */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="eyebrow">The Problem</p>
              <h2 className="section-title">Hotels still run on notebooks and WhatsApp</h2>
              <p className="text-muted leading-relaxed mb-6">
                Most hotels in South Sudan manage bookings in notebooks, billing on paper, and
                guest complaints over phone calls. The result: double-bookings, billing disputes,
                staff fraud, and zero visibility for owners who aren't on site.
              </p>
              <div className="space-y-3">
                {[
                  'Double-bookings from paper registers',
                  'Billing errors and cash disputes',
                  'No real-time view for owners',
                  'Unreliable internet and power cuts',
                ].map((p) => (
                  <div key={p} className="flex items-center gap-3 text-sm text-muted">
                    <i className="fas fa-xmark text-red-400 w-4 flex-shrink-0" />
                    {p}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="eyebrow">The Solution</p>
              <h2 className="section-title">One platform, every operation</h2>
              <p className="text-muted leading-relaxed mb-6">
                SNCInn is designed for local conditions: low bandwidth, power outages, mobile money,
                cash, two currencies, and phone-first staff. It works offline and syncs when the
                connection returns.
              </p>
              <div className="space-y-3">
                {[
                  'Transactional double-booking prevention',
                  'Accurate bills in USD and SSP',
                  'Real-time dashboard from any device',
                  'Offline-first — works without internet',
                ].map((s) => (
                  <div key={s} className="flex items-center gap-3 text-sm text-muted">
                    <i className="fas fa-check text-primary w-4 flex-shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <motion.div className="text-center mb-10 sm:mb-14" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="eyebrow">Features</p>
            <h2 className="section-title">Everything your hotel needs</h2>
            <p className="section-subtitle">One platform covering every operation — designed for low bandwidth, power outages, and phone-first staff.</p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {FEATURES.map(({ icon, title, desc }) => (
              <motion.div key={title} variants={staggerItem} className="card p-6 group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <i className={`fas ${icon} text-primary`} />
                </div>
                <h3 className="font-heading font-bold text-dark text-sm mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container-page">
          <motion.div className="text-center mb-10 sm:mb-14" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="eyebrow">How It Works</p>
            <h2 className="section-title">Up and running in one day</h2>
            <p className="section-subtitle">No complex setup. We onboard your hotel, train your staff, and stay on site for the first week.</p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {STEPS.map(({ icon, number, title, desc }) => (
              <motion.div key={number} variants={staggerItem} className="relative">
                <div className="w-12 h-12 rounded-2xl bg-dark flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-accent`} />
                </div>
                <div className="text-5xl font-black text-dark/[0.07] leading-none mb-2 select-none">{number}</div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <motion.div className="text-center mb-10 sm:mb-14" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="eyebrow">Pricing</p>
            <h2 className="section-title">Simple, transparent pricing</h2>
            <p className="section-subtitle">Start with a free pilot. No setup fees for the first 3 hotels.</p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-3 gap-6 items-start"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {PLANS.map(({ name, subtitle, price, period, highlight, features }) => (
              <motion.div
                key={name}
                variants={staggerItem}
                className={`card p-8 relative ${highlight ? 'ring-2 ring-primary shadow-[0_0_0_4px_rgba(254,127,45,0.15)]' : ''}`}
              >
                {highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[0.65rem] font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">
                    Most Popular
                  </span>
                )}
                <div className="font-heading font-black text-dark text-xl mb-1">{name}</div>
                <div className="text-muted text-sm mb-5">{subtitle}</div>
                <div className="text-4xl font-black text-dark mb-1">
                  {price}<span className="text-base font-medium text-muted">{period}</span>
                </div>
                <div className="h-px bg-surface my-6" />
                <ul className="space-y-3 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                      <i className="fas fa-check text-primary mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={highlight ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}
                >
                  {price === 'Custom' ? 'Contact Us' : 'Get Started'}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Built by SNC ── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container-page">
          <motion.div
            className="grid sm:grid-cols-3 gap-6"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {[
              { icon: 'fa-code',        title: 'Built by SNC',         desc: 'SNCInn is designed and maintained by Sleek Nexus Creative — the same team behind EduPortal and HealthHub Bridge.', to: '/about',       cta: 'About us' },
              { icon: 'fa-mobile-alt',  title: 'Flutter App Coming',   desc: 'A Flutter staff app for housekeeping, maintenance, and manager alerts is in development for Phase 2.', to: '/services/mobile-apps', cta: 'Mobile apps' },
              { icon: 'fa-paper-plane', title: 'Pilot Your Hotel',     desc: 'We onboard the first 3 hotels free. Tell us about your property and we\'ll be in touch within 24 hours.', to: '/contact',     cta: 'Apply for pilot' },
            ].map(({ icon, title, desc, to, cta }) => (
              <motion.div key={title} variants={staggerItem} className="card p-6">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-primary`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{desc}</p>
                <Link to={to} className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
                  {cta} <i className="fas fa-arrow-right text-xs" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CtaBand
        label="Free Pilot Available"
        title="Ready to modernise your hotel?"
        desc="Join the pilot programme — free for the first 3 months. We visit, set up, and train your team."
        primary={{ to: '/contact', label: 'Apply for Pilot' }}
        secondary={{ to: '/work', label: 'See Our Work' }}
      />
    </>
  )
}
