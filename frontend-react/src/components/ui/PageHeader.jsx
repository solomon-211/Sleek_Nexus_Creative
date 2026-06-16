import { motion } from 'framer-motion'

export default function PageHeader({ label, title, desc }) {
  return (
    <section className="bg-gradient-to-br from-dark to-dark-soft text-white py-24 text-center">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {label && <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">{label}</p>}
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-5">{title}</h1>
          {desc && <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">{desc}</p>}
        </motion.div>
      </div>
    </section>
  )
}
