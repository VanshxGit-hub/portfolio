'use client'

import { motion } from 'framer-motion'

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
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg" id="home">

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">

        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="h-[1px] w-10" style={{ background: '#333' }} />
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: '#444' }}>
            Entrepreneur · Trader · Builder
          </span>
          <div className="h-[1px] w-10" style={{ background: '#333' }} />
        </motion.div>

        <h1 className="font-display font-extralight leading-none mb-8 select-none" style={{ fontSize: 'clamp(4rem, 11vw, 9rem)', letterSpacing: '-0.02em' }}>
          <AnimatedWord word="Vansh" delay={0.15} />
          {' '}
          <AnimatedWord word="Gupta" delay={0.3} />
        </h1>

        <div className="overflow-hidden mb-12">
          <motion.p
            className="font-body text-base md:text-lg font-light max-w-md mx-auto leading-relaxed"
            style={{ color: '#555' }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Building at the intersection of markets and technology.
            Currently working on Clair.
          </motion.p>
        </div>

        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic-btn px-6 py-3 text-bg font-mono text-[10px] tracking-[0.25em] uppercase"
            style={{ background: '#e2e2e2' }}
          >
            View work
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic-btn px-6 py-3 font-mono text-[10px] tracking-[0.25em] uppercase border text-text-secondary hover:text-text transition-colors duration-300"
            style={{ borderColor: '#1a1a1a' }}
          >
            Contact
          </button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <div className="w-[1px] h-12 overflow-hidden relative" style={{ background: '#1a1a1a' }}>
          <motion.div
            className="absolute top-0 w-full h-full"
            style={{ background: 'linear-gradient(to bottom, transparent, #e2e2e2, transparent)' }}
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
