import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sections, profile } from '../config'

export default function CommandPalette({ open, setOpen }) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef(null)

  const commands = useMemo(() => [
    ...sections.map(s => ({
      id: s.id,
      label: `Jump to ${s.label}`,
      hint: 'section',
      run: () => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }),
    })),
    {
      id: 'gh', label: 'Open GitHub profile', hint: 'link',
      run: () => window.open(`https://github.com/${profile.github}`, '_blank', 'noopener'),
    },
    {
      id: 'li', label: 'Open LinkedIn profile', hint: 'link',
      run: () => window.open(`https://linkedin.com/in/${profile.linkedin}`, '_blank', 'noopener'),
    },
    {
      id: 'mail', label: 'Send an email', hint: 'link',
      run: () => { window.location.href = `mailto:${profile.email}` },
    },
    {
      id: 'snake', label: 'Play Snake 🐍', hint: 'game',
      run: () => window.dispatchEvent(new CustomEvent('open-snake')),
    },
  ], [])

  const filtered = useMemo(
    () => commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase())),
    [commands, query]
  )

  useEffect(() => {
    const onKey = e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  useEffect(() => {
    if (open) {
      setQuery('')
      setIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const exec = cmd => {
    setOpen(false)
    cmd?.run()
  }

  const onInputKey = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIndex(i => Math.min(i + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setIndex(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter') exec(filtered[index])
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center pt-[18vh] bg-black/60 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            className="glass w-full max-w-lg overflow-hidden !rounded-xl"
            initial={{ scale: 0.96, y: -12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -12 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <span className="font-mono text-cyan-400">&gt;</span>
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setIndex(0) }}
                onKeyDown={onInputKey}
                placeholder="Type a command or section…"
                className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-gray-500"
                aria-label="Search commands"
              />
              <kbd className="font-mono text-[10px] text-gray-500 border border-white/10 rounded px-1.5 py-0.5">esc</kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto py-2" role="listbox">
              {filtered.length === 0 && (
                <li className="px-4 py-3 text-sm text-gray-500 font-mono">No matches.</li>
              )}
              {filtered.map((c, i) => (
                <li key={c.id} role="option" aria-selected={i === index}>
                  <button
                    onMouseEnter={() => setIndex(i)}
                    onClick={() => exec(c)}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                      i === index ? 'bg-electric/15 text-cyan-200' : 'text-gray-300'
                    }`}
                  >
                    <span>{c.label}</span>
                    <span className="font-mono text-[10px] text-gray-500">{c.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
