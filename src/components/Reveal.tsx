'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'none'
}

export function Reveal({ children, delay = 0, className = '', direction = 'up' }: RevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: direction === 'up' ? 30 : 0, x: direction === 'left' ? -20 : 0 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="h-[1px] w-6" style={{ background: '#333' }} />
      <span className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: '#444' }}>
        {children}
      </span>
    </div>
  )
}