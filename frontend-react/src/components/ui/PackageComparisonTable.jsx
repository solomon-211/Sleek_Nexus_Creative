import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/animations'

// Comparison rows restructure the exact same facts already stated per-tier in
// packages-data.js (timeline, features, bestFor) into a scannable matrix —
// nothing here claims a capability beyond what that data already states.
const rows = [
  { label: 'Delivery Timeline', values: ['2–4 weeks', '1–3 months', '3–6+ months'] },
  { label: 'Pages / Screens', values: ['Up to 5', '15–25', 'Unlimited, custom'] },
  { label: 'Build Type', values: ['Basic website or app', 'Custom website or application', 'Enterprise platform, complex architecture'] },
  { label: 'Admin Panel', values: [false, true, true] },
  { label: 'API / Payment Integration', values: [false, true, 'Multiple (payments, SMS)'] },
  { label: 'Cloud Deployment & DevOps', values: [false, false, true] },
  { label: 'Dedicated Dev Team', values: [false, false, true] },
  { label: 'Staff Training', values: [false, true, true] },
  { label: 'Post-Launch Support', values: ['30 days', '90 days', '1 year + Priority SLA'] },
]

function Cell({ value }) {
  if (value === true) return <i className="fas fa-check-circle text-primary text-lg" aria-label="Included" />
  if (value === false) return <span className="text-gray-300 text-lg select-none" aria-label="Not included">—</span>
  return <span className="text-sm text-dark-soft">{value}</span>
}

export default function PackageComparisonTable({ packages }) {
  return (
    <motion.div
      className="hidden md:block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
      variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.6 }}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left p-5 text-xs font-black uppercase tracking-widest text-muted w-1/4">Compare Every Detail</th>
              {packages.map(({ tier, label, popular }) => (
                <th key={tier} className={`p-5 text-center ${popular ? 'bg-primary/5' : ''}`}>
                  <span className="block text-xs font-black uppercase tracking-widest text-muted">{tier}</span>
                  <span className="block font-heading font-bold text-dark text-lg">{label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ label, values }, i) => (
              <tr key={label} className={i % 2 === 1 ? 'bg-gray-50/60' : ''}>
                <td className="p-5 text-sm font-semibold text-dark-soft">{label}</td>
                {values.map((v, j) => (
                  <td key={j} className={`p-5 text-center ${packages[j].popular ? 'bg-primary/5' : ''}`}>
                    <Cell value={v} />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="p-5 text-sm font-semibold text-dark-soft align-top">Best For</td>
              {packages.map(({ tier, bestFor, popular }) => (
                <td key={tier} className={`p-5 text-center text-xs text-muted align-top ${popular ? 'bg-primary/5' : ''}`}>{bestFor}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
