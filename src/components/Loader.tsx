'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 2000)
    const t2 = setTimeout(() => onComplete(), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#0a0a0a' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <rect x="1" y="1" width="54" height="54" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <rect x="6" y="6" width="44" height="44" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
              <text x="28" y="38" textAnchor="middle" fill="#e2e2e2"
                style={{ fontSize: 22, fontFamily: 'sans-serif', fontWeight: 200, letterSpacing: 3 }}>
                VG
              </text>
            </svg>

            <span className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: '#333' }}>
              Loading
            </span>

            <div className="w-[100px] h-[1px] relative overflow-hidden" style={{ background: '#1a1a1a' }}>
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{ background: '#e2e2e2' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}