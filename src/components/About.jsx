import Reveal, { SectionHeading } from './Reveal'
import { aboutCards, certifications } from '../config'

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-28">
      <SectionHeading kicker="whoami" title="Engineering Dashboard" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {aboutCards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <article className="glass glass-hover h-full p-6 group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl" aria-hidden="true">{c.icon}</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" title="active" />
              </div>
              <h3 className="font-bold text-white text-lg">{c.title}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{c.body}</p>
              <p className="mt-4 font-mono text-[11px] text-cyan-400/70 border-t border-white/5 pt-3 group-hover:text-cyan-300 transition-colors">
                {c.metric}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10">
        <div className="glass p-6">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-cyan-400/80 mb-4">
            {'// '}certifications
          </p>
          <ul className="flex flex-wrap gap-3">
            {certifications.map(c => (
              <li
                key={c.name}
                className="font-mono text-xs text-gray-300 border border-white/10 rounded-lg px-3 py-2 bg-white/[0.03] hover:border-cyan-400/40 transition-colors"
              >
                <span className="text-cyan-300">✓</span> {c.name}
                <span className="text-gray-600"> · {c.issuer} {c.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
