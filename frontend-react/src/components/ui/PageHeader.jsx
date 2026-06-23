import { motion } from 'framer-motion'

export default function PageHeader({ label, title, desc }) {
  return (
    <section className="bg-gradient-to-br from-dark to-dark-soft text-white py-24 text-center">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {label && <p className="section-label text-accent">{label}</p>}
          <h1 className="display-heading mb-5">{title}</h1>
          {desc && <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto mt-6">{desc}</p>}
        </motion.div>
      </div>
    </section>
  )
}
