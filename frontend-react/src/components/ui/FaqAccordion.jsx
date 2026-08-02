import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/animations'

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="space-y-3">
      {items.map(({ q, a }, i) => (
        <motion.div
          key={q}
          className="card overflow-hidden"
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            <span className="font-semibold text-dark text-sm">{q}</span>
            <i className={`fas fa-chevron-down text-primary text-xs transition-transform duration-200 flex-shrink-0 ml-3 ${openIndex === i ? 'rotate-180' : ''}`} />
          </button>
          {openIndex === i && <div className="px-5 pb-5 text-sm text-muted leading-relaxed">{a}</div>}
        </motion.div>
      ))}
    </div>
  )
}
