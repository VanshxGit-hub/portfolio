'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const lines = [
  { text: 'Markets move in seconds.', delay: 0.2 },
  { text: "Decisions shouldn't lag.", delay: 0.9 },
  { text: 'Meet Clair.', delay: 1.6, accent: true },
]

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'intro' | 'name'>('intro')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('name'), 3000)
    const t2 = setTimeout(() => setDone(true), 4200)
    const t3 = setTimeout(() => onComplete(), 4800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#06080f' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{
              width: 600, height: 600,
              background: 'radial-gradient(circle, rgba(79,124,255,0.05) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }} />
          </div>

          {/* Corner marks */}
          {['top-8 left-8', 'top-8 right-8', 'bottom-8 left-8', 'bottom-8 right-8'].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-5 h-5`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              style={{
                borderTop: pos.includes('top') ? '1px solid #4f7cff' : 'none',
                borderBottom: pos.includes('bottom') ? '1px solid #4f7cff' : 'none',
                borderLeft: pos.includes('left') ? '1px solid #4f7cff' : 'none',
                borderRight: pos.includes('right') ? '1px solid #4f7cff' : 'none',
              }}
            />
          ))}

          <AnimatePresence mode="wait">

            {/* Phase 1 — Hook */}
            {phase === 'intro' && (
              <motion.div
                key="intro"
                className="flex flex-col items-center gap-5 text-center px-8"
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {lines.map((line, i) => (
                  <motion.p
                    key={i}
                    className={`font-display font-light tracking-wide ${
                      line.accent
                        ? 'text-3xl md:text-4xl'
                        : 'text-xl md:text-2xl text-text-secondary'
                    }`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: line.delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line.accent ? (
                      <span style={{
                        background: 'linear-gradient(90deg, #4f7cff, #a5b4fc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}>
                        {line.text}
                      </span>
                    ) : line.text}
                  </motion.p>
                ))}

                <motion.div
                  className="flex items-center gap-2 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4f7cff', boxShadow: '0 0 10px #4f7cff' }} />
                  <span className="font-mono text-[10px] tracking-[0.4em] text-muted uppercase">
                    Vansh Gupta · Portfolio
                  </span>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4f7cff', boxShadow: '0 0 10px #4f7cff' }} />
                </motion.div>
              </motion.div>
            )}

            {/* Phase 2 — Name + progress */}
            {phase === 'name' && (
              <motion.div
                key="name"
                className="flex flex-col items-center gap-6"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <rect x="1" y="1" width="62" height="62" stroke="rgba(79,124,255,0.2)" strokeWidth="0.5" />
                    <rect x="6" y="6" width="52" height="52" stroke="rgba(79,124,255,0.1)" strokeWidth="0.5" strokeDasharray="3 3" />
                    <text x="32" y="43" textAnchor="middle" fill="url(#vggrad)"
                      style={{ fontSize: 26, fontFamily: 'sans-serif', fontWeight: 300, letterSpacing: 2 }}>
                      VG
                    </text>
                    <defs>
                      <linearGradient id="vggrad" x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#4f7cff" />
                        <stop offset="100%" stopColor="#a5b4fc" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(circle, rgba(79,124,255,0.15) 0%, transparent 70%)',
                    filter: 'blur(15px)',
                  }} />
                </motion.div>

                <motion.div
                  className="font-mono text-[10px] tracking-[0.5em] text-muted uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Loading portfolio
                </motion.div>

                <motion.div
                  className="w-[140px] h-[1px] relative overflow-hidden"
                  style={{ background: 'rgba(79,124,255,0.1)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0"
                    style={{ background: 'linear-gradient(90deg, #4f7cff, #a5b4fc)' }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, ease: 'easeInOut', delay: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}