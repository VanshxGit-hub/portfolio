'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function AnimatedWord({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {word}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const glowX = useSpring(mouseX, { damping: 40, stiffness: 80 })
  const glowY = useSpring(mouseY, { damping: 40, stiffness: 80 })
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
      id="home"
    >
      {/* Orbs */}
      <div className="orb absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(79,124,255,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="orb-2 absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(165,180,252,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      {/* Mouse-follow glow */}
      <motion.div
        className="absolute pointer-events-none opacity-25"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(79,124,255,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto">

        {/* Clair badge */}
        <motion.div
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full clair-badge glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.6 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-accent" style={{ boxShadow: '0 0 6px #4f7cff' }} />
          <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase">
            Building Clair · AI Trading Assistant
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="h-[1px] w-12 bg-accent opacity-30" />
          <span className="font-mono text-xs tracking-[0.3em] text-text-secondary uppercase">
            Entrepreneur · Trader · Builder
          </span>
          <div className="h-[1px] w-12 bg-accent opacity-30" />
        </motion.div>

        {/* Name */}
        <h1 className="font-display font-light leading-none mb-6 select-none" style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}>
          <AnimatedWord word="Vansh" delay={0.15} />
          {' '}
          <AnimatedWord word="Gupta" delay={0.3} />
        </h1>

        {/* Tagline */}
        <div className="overflow-hidden mb-10">
          <motion.p
            className="font-display text-lg md:text-2xl font-light text-text-secondary"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Solving market decisions with Clair
            <span
              className="text-clip shimmer font-normal"
              style={{
                backgroundImage: 'linear-gradient(90deg, #4f7bff00 0%, #a5b4fc00 40%, #4f7bff00 60%, #818df800 100%)',
                backgroundSize: '200% auto',
              }}
            >
              Clair
            </span>
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic-btn px-7 py-3.5 bg-accent text-bg font-body text-xs tracking-[0.2em] uppercase font-semibold hover:bg-indigo-400 transition-colors duration-300"
            data-hover
          >
            See Clair
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic-btn px-7 py-3.5 border border-border text-text-secondary font-body text-xs tracking-[0.2em] uppercase hover:border-accent hover:text-accent transition-all duration-300 glass"
            data-hover
          >
            Let's connect
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase">Scroll</span>
        <div className="w-[1px] h-14 overflow-hidden relative">
          <motion.div
            className="absolute top-0 w-full h-full bg-gradient-to-b from-transparent via-accent to-transparent"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 opacity-20">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M0 40V0H40" stroke="#4f7cff" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-8 opacity-20 rotate-180">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M0 40V0H40" stroke="#4f7cff" strokeWidth="0.5" />
        </svg>
      </div>
    </section>
  )
}
