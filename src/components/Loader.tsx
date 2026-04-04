'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let current = 0
    const speeds = [
      { target: 30, delay: 20 },
      { target: 65, delay: 35 },
      { target: 85, delay: 50 },
      { target: 100, delay: 25 },
    ]

    let segIdx = 0
    const tick = () => {
      if (segIdx >= speeds.length) return
      const seg = speeds[segIdx]
      if (current >= seg.target) {
        segIdx++
        if (segIdx < speeds.length) setTimeout(tick, 200)
        else {
          setTimeout(() => setDone(true), 400)
          setTimeout(() => onComplete(), 1200)
        }
        return
      }
      current += 1
      setProgress(current)
      setTimeout(tick, seg.delay)
    }
    setTimeout(tick, 300)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Abstract avatar / sigil */}
          <motion.div
            className="relative mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              {/* Outer rotating ring */}
              <motion.circle
                cx="60" cy="60" r="54"
                stroke="rgba(232,213,176,0.15)"
                strokeWidth="0.5"
                strokeDasharray="8 4"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '60px 60px' }}
              />
              {/* Inner counter-rotating ring */}
              <motion.circle
                cx="60" cy="60" r="42"
                stroke="rgba(232,213,176,0.1)"
                strokeWidth="0.5"
                strokeDasharray="4 8"
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '60px 60px' }}
              />
              {/* Core shape — abstract geometric sigil */}
              <motion.path
                d="M60 18 L88 40 L88 80 L60 102 L32 80 L32 40 Z"
                stroke="rgba(232,213,176,0.5)"
                strokeWidth="0.8"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              <motion.path
                d="M60 30 L78 44 L78 76 L60 90 L42 76 L42 44 Z"
                stroke="rgba(232,213,176,0.3)"
                strokeWidth="0.5"
                fill="rgba(232,213,176,0.03)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
              />
              {/* Center dot */}
              <motion.circle
                cx="60" cy="60" r="3"
                fill="#e8d5b0"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1], opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              />
              {/* Corner accent dots */}
              {[
                [60, 18], [88, 40], [88, 80], [60, 102], [32, 80], [32, 40]
              ].map(([cx, cy], i) => (
                <motion.circle
                  key={i}
                  cx={cx} cy={cy} r="1.5"
                  fill="rgba(232,213,176,0.6)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
                />
              ))}
              {/* Cross lines */}
              <motion.line x1="60" y1="30" x2="60" y2="90" stroke="rgba(232,213,176,0.1)" strokeWidth="0.5"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} />
              <motion.line x1="30" y1="60" x2="90" y2="60" stroke="rgba(232,213,176,0.1)" strokeWidth="0.5"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} />
            </svg>

            {/* Glow behind sigil */}
            <div className="absolute inset-0 rounded-full" style={{
              background: 'radial-gradient(circle, rgba(232,213,176,0.08) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }} />
          </motion.div>

          {/* Name */}
          <motion.div
            className="font-display text-xl tracking-[0.3em] text-text-secondary uppercase mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Alex Mercer
          </motion.div>

          {/* Progress */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="w-[200px] h-[1px] bg-border relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="font-mono text-xs text-muted tabular-nums">
              {String(progress).padStart(3, '0')}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
