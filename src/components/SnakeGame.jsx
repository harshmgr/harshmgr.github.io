import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Terminal-themed Snake easter egg. Opened via `play --snake` in the
// contact terminal or the command palette; lazy-loaded so it adds zero
// weight to the main bundle.

const GRID = 20            // cells per side
const PX = 360             // canvas size in CSS pixels
const CELL = PX / GRID
const BASE_MS = 130        // tick at score 0
const MIN_MS = 65

const randCell = exclude => {
  while (true) {
    const c = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }
    if (!exclude.some(s => s.x === c.x && s.y === c.y)) return c
  }
}

export default function SnakeGame({ onClose }) {
  const canvasRef = useRef(null)
  const game = useRef(null)
  const [phase, setPhase] = useState('ready') // ready | playing | over
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => {
    try { return Number(localStorage.getItem('snake-best')) || 0 } catch { return 0 }
  })

  const reset = useCallback(() => {
    const snake = [{ x: 9, y: 10 }, { x: 8, y: 10 }, { x: 7, y: 10 }]
    game.current = { snake, dir: { x: 1, y: 0 }, next: { x: 1, y: 0 }, food: randCell(snake) }
    setScore(0)
  }, [])

  if (!game.current) reset()

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const { snake, food } = game.current
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, PX, PX)

    // faint grid
    ctx.strokeStyle = 'rgba(59,130,246,0.07)'
    ctx.lineWidth = 1
    for (let i = 1; i < GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, PX); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(PX, i * CELL); ctx.stroke()
    }

    // food
    ctx.shadowColor = '#3b82f6'
    ctx.shadowBlur = 12
    ctx.fillStyle = '#60a5fa'
    ctx.beginPath()
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 3, 0, Math.PI * 2)
    ctx.fill()

    // snake, head brightest
    snake.forEach((s, i) => {
      const t = 1 - i / snake.length
      ctx.shadowColor = '#22d3ee'
      ctx.shadowBlur = i === 0 ? 14 : 6
      ctx.fillStyle = `rgba(34, 211, 238, ${0.35 + 0.65 * t})`
      const pad = i === 0 ? 1.5 : 2.5
      ctx.beginPath()
      ctx.roundRect(s.x * CELL + pad, s.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, 4)
      ctx.fill()
    })
    ctx.shadowBlur = 0
  }, [])

  // game loop — interval speeds up as the snake grows
  useEffect(() => {
    if (phase !== 'playing') { draw(); return }
    const ms = Math.max(MIN_MS, BASE_MS - score * 3)
    const id = setInterval(() => {
      const g = game.current
      g.dir = g.next
      const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y }
      const hitWall = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID
      const hitSelf = g.snake.some(s => s.x === head.x && s.y === head.y)
      if (hitWall || hitSelf) {
        setPhase('over')
        setBest(b => {
          const nb = Math.max(b, score)
          try { localStorage.setItem('snake-best', String(nb)) } catch { /* private mode */ }
          return nb
        })
        return
      }
      g.snake.unshift(head)
      if (head.x === g.food.x && head.y === g.food.y) {
        g.food = randCell(g.snake)
        setScore(v => v + 1)
      } else {
        g.snake.pop()
      }
      draw()
    }, ms)
    return () => clearInterval(id)
  }, [phase, score, draw])

  const steer = useCallback((x, y) => {
    const d = game.current.dir
    if (x === -d.x && y === -d.y) return // no instant reverse
    game.current.next = { x, y }
    setPhase(p => (p === 'ready' ? 'playing' : p))
  }, [])

  const restart = useCallback(() => { reset(); setPhase('playing') }, [reset])

  useEffect(() => {
    const onKey = e => {
      const k = e.key.toLowerCase()
      if (k === 'escape') { onClose(); return }
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(e.key.toLowerCase()) || e.key.startsWith('Arrow')) e.preventDefault()
      if (k === 'arrowup' || k === 'w') steer(0, -1)
      else if (k === 'arrowdown' || k === 's') steer(0, 1)
      else if (k === 'arrowleft' || k === 'a') steer(-1, 0)
      else if (k === 'arrowright' || k === 'd') steer(1, 0)
      else if (k === 'r' || (k === 'enter' && phase === 'over')) restart()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [steer, restart, onClose, phase])

  // touch: swipe to steer
  const touch = useRef(null)
  const onTouchStart = e => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }
  const onTouchEnd = e => {
    if (!touch.current) return
    const dx = e.changedTouches[0].clientX - touch.current.x
    const dy = e.changedTouches[0].clientY - touch.current.y
    if (Math.abs(dx) < 18 && Math.abs(dy) < 18) return
    if (Math.abs(dx) > Math.abs(dy)) steer(Math.sign(dx), 0)
    else steer(0, Math.sign(dy))
  }

  // HiDPI canvas
  useEffect(() => {
    const c = canvasRef.current
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    c.width = PX * dpr
    c.height = PX * dpr
    draw()
  }, [draw])

  return (
    <motion.div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Snake game"
    >
      <motion.div
        className="glass overflow-hidden !rounded-xl select-none"
        initial={{ scale: 0.92, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
          <p className="ml-2 font-mono text-xs text-gray-500">harsh@arcade: ~/snake</p>
          <button
            onClick={onClose}
            className="ml-auto font-mono text-xs text-gray-500 hover:text-white transition-colors"
            aria-label="Close game"
          >
            esc ✕
          </button>
        </div>

        <div className="px-4 pt-3 flex items-center justify-between font-mono text-xs">
          <p className="text-cyan-300">score <span className="text-white font-bold">{score}</span></p>
          <p className="text-gray-500">best <span className="text-electric font-bold">{best}</span></p>
        </div>

        <div className="relative p-4">
          <canvas
            ref={canvasRef}
            style={{ width: 'min(360px, 78vw)', height: 'min(360px, 78vw)' }}
            className="rounded-lg border border-white/10 bg-black/50"
          />
          {phase !== 'playing' && (
            <div className="absolute inset-4 flex flex-col items-center justify-center rounded-lg bg-black/60 backdrop-blur-[2px] font-mono text-center px-4">
              {phase === 'ready' ? (
                <>
                  <p className="text-cyan-300 text-sm glow-cyan">&gt; ./snake --start</p>
                  <p className="mt-3 text-xs text-gray-400">arrow keys / WASD to move</p>
                  <p className="text-xs text-gray-400">swipe on mobile</p>
                  <p className="mt-3 text-[11px] text-gray-600 animate-pulse">press any direction to begin</p>
                </>
              ) : (
                <>
                  <p className="text-red-400 text-sm font-bold">segmentation fault — snake crashed</p>
                  <p className="mt-2 text-xs text-gray-300">final score: <span className="text-cyan-300 font-bold">{score}</span>{score >= best && score > 0 ? ' · new best! 🏆' : ''}</p>
                  <button
                    onClick={restart}
                    className="mt-4 rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-300 hover:bg-cyan-400/20 transition-colors"
                  >
                    press R to respawn
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <p className="pb-3 text-center font-mono text-[10px] text-gray-600">
          eat the packets · don't deref the wall
        </p>
      </motion.div>
    </motion.div>
  )
}
