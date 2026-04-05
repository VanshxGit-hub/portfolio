'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal, SectionLabel } from './Reveal'

const capabilities = [
  {
    id: 'trading',
    category: 'Trading & Markets',
    description: '1.5 years of live F&O trading. Real experience, not simulated.',
    items: ['Futures & Options', 'Technical Analysis', 'Derivatives Pricing', 'Risk Management', 'Zerodha Varsity Certified'],
  },
  {
    id: 'entrepreneurship',
    category: 'Entrepreneurship',
    description: 'Building from zero — identifying problems, validating ideas, shipping.',
    items: ['Product Ideation', 'Building in Public', 'Lean Execution', 'Problem-First Thinking', 'Investor Communication'],
  },
  {
    id: 'ai',
    category: 'AI & Product',
    description: 'Applying AI to solve real problems. Currently in financial markets.',
    items: ['AI Product Design', 'LLM Applications', 'Market Data Processing', 'Technical Analysis Automation'],
  },
  {
    id: 'leadership',
    category: 'Leadership',
    description: 'Taking ownership and making decisions under uncertainty.',
    items: ['Team Building', 'Strategic Thinking', 'Decision Under Pressure', 'Cross-functional Work'],
  },
]

const tools = ['Python', 'Technical Analysis', 'NSE / BSE', 'Zerodha', 'Options Greeks', 'AI / LLMs', 'React', 'FastAPI']

export default function Skills() {
  const [active, setActive] = useState('trading')
  const current = capabilities.find(c => c.id === active)!

  return (
    <section id="skills" className="relative py-36 px-6 md:px-16 max-w-7xl mx-auto">

      <Reveal>
        <SectionLabel>Capabilities</SectionLabel>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="font-display font-extralight text-4xl md:text-5xl mb-16" style={{ lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          What I bring.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <Reveal delay={0.2}>
          <div className="space-y-1">
            {capabilities.map((cap) => (
              <button
                key={cap.id}
                className="w-full text-left border p-5 transition-all duration-200"
                onClick={() => setActive(cap.id)}
                style={{
                  borderColor: active === cap.id ? '#2a2a2a' : '#1a1a1a',
                  background: active === cap.id ? '#111' : 'transparent',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm" style={{ color: active === cap.id ? '#e2e2e2' : '#555' }}>
                    {cap.category}
                  </span>
                  {active === cap.id && <span style={{ color: '#444' }}>→</span>}
                </div>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3} direction="left">
          <div className="border p-8 h-full" style={{ borderColor: '#1a1a1a' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-display text-2xl font-light mb-3">{current.category}</h3>
                <p className="font-body text-sm leading-relaxed mb-8" style={{ color: '#666' }}>{current.description}</p>
                <div className="space-y-3">
                  {current.items.map((item, i) => (
                    <motion.div key={item} className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#444' }} />
                      <span className="font-body text-sm" style={{ color: '#888' }}>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.4}>
        <div className="border-t pt-10" style={{ borderColor: '#1a1a1a' }}>
          <div className="font-mono text-[9px] tracking-[0.35em] uppercase mb-6" style={{ color: '#333' }}>Tools & Domains</div>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span key={tool} className="font-mono text-[10px] px-3 py-2 border tracking-wider transition-colors duration-200"
                style={{ borderColor: '#1a1a1a', color: '#555' }}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}