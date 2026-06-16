import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { bootLines } from '../config'

export default function BootSequence({ onDone }) {
  // progress = how many characters of the whole script have been "typed"
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  const script = bootLines.join('\n')
  const done = progress >= script.length

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setExiting(true), 650)
      return () => clearTimeout(t)
    }
    // pause briefly at each line break, otherwise type fast
    const ch = script[progress]
    const delay = ch === '\n' ? 260 : 14
    const t = setTimeout(() => setProgress(p => p + 1), delay)
    return () => clearTimeout(t)
  }, [progress, done, script])

  // allow skipping with any key / click
  useEffect(() => {
    const skip = () => setExiting(true)
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [])

  const typed = script.slice(0, progress).split('\n')

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          aria-label="Loading"
        >
          <div className="font-mono text-sm sm:text-base text-cyan-300/90 space-y-2 px-6 min-w-[300px] sm:min-w-[420px]">
            {typed.map((line, i) => {
              const isLast = i === typed.length - 1
              const isReady = line.startsWith('> Ready')
              return (
                <p key={i} className={isReady ? 'text-electric font-bold glow-blue' : ''}>
                  {line}
                  {isLast && !done && <span className="caret" />}
                </p>
              )
            })}
            <p className="pt-6 text-[11px] text-gray-600">press any key to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
