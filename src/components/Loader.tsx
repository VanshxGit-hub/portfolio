'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 2200)
    const t2 = setTimeout(() => onComplete(), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
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
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{
              width: 600, height: 600,
              background: 'radial-gradient(circle, rgba(79,124,255,0.05) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }} />
          </div>

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

          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div className="relative">
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
                transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}