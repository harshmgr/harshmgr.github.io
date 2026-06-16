import { motion } from 'framer-motion'

// Scroll-triggered reveal wrapper used across all sections.
export default function Reveal({ children, delay = 0, y = 28, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ kicker, title }) {
  return (
    <Reveal className="mb-12">
      <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan-400/80 mb-3">
        {'// '}{kicker}
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold text-white">
        {title}
      </h2>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-electric to-transparent" />
    </Reveal>
  )
}
