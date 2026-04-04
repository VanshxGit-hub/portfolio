'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal, SectionLabel } from './Reveal'

const capabilities = [
  {
    id: 'trading',
    category: 'Trading & Markets',
    icon: '◉',
    description: 'Real derivative market experience — not simulated. 1.5 years of live F&O trading across equities and index options.',
    items: [
      'Futures & Options (F&O)',
      'Technical Analysis',
      'Derivatives Pricing',
      'Risk Management',
      'Zerodha Varsity Certified',
    ],
  },
  {
    id: 'entrepreneurship',
    category: 'Entrepreneurship',
    icon: '◈',
    description: 'Building from zero. Identifying problems in markets, validating ideas, and shipping products that solve real pain.',
    items: [
      'Product Ideation & Validation',
      'Building in Public',
      'Problem-First Thinking',
      'Lean Execution',
    ],
  },
  {
    id: 'ai',
    category: 'AI & Product',
    icon: '◇',
    description: 'Applying AI to financial markets — the core of Clair. Turning data into decisions.',
    items: [
      'AI-Powered Product Design',
      'Technical Analysis Automation',
      'Clair — AI Trading Assistant',
    ],
  },
  {
    id: 'leadership',
    category: 'Leadership',
    icon: '◎',
    description: 'Taking ownership, driving teams, and making decisions under uncertainty — whether in a trade or a build.',
    items: [
      'Team Building',
      'Decision Under Pressure',
      'Strategic Thinking',
      'Mentorship & Vision-setting',
    ],
  },
]

const tools = [
  'Python', 'Technical Analysis', 'NSE / BSE',
 'Derivatives', 'AI / LLMs', 
  'Market Microstructure', 'FastAPI',
  'Data Analysis'
]

export default function Skills() {
  const [active, setActive] = useState('trading')
  const current = capabilities.find(c => c.id === active)!

  return (
    <section id="skills" className="relative py-36 px-6 md:px-16 max-w-7xl mx-auto">

      <div className="absolute left-8 top-36 hidden xl:flex flex-col items-center gap-3 opacity-30">
        <div className="h-20 w-[1px] bg-border" />
        <span className="font-mono text-[9px] tracking-[0.4em] text-muted rotate-90 whitespace-nowrap">03 / Capabilities</span>
      </div>

      <Reveal>
        <SectionLabel>What I bring</SectionLabel>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="font-display font-light text-5xl md:text-6xl mb-16" style={{ lineHeight: 1.1 }}>
          Skills<br />
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {/* Tabs */}
        <Reveal delay={0.2}>
          <div className="space-y-2">
            {capabilities.map((cap) => (
              <motion.button
                key={cap.id}
                className="w-full text-left border border-border p-5 group relative overflow-hidden glass"
                onClick={() => setActive(cap.id)}
                animate={{
                  borderColor: active === cap.id ? 'rgba(79,124,255,0.3)' : 'rgba(20,28,46,1)',
                  background: active === cap.id ? 'rgba(79,124,255,0.06)' : 'rgba(255,255,255,0.02)',
                }}
                transition={{ duration: 0.3 }}
                data-hover
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-lg text-accent opacity-60">{cap.icon}</span>
                    <span className={`font-body text-sm tracking-wide transition-colors duration-300 ${active === cap.id ? 'text-text' : 'text-text-secondary'}`}>
                      {cap.category}
                    </span>
                  </div>
                  <motion.div
                    animate={{ x: active === cap.id ? 0 : -8, opacity: active === cap.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-accent"
                  >
                    →
                  </motion.div>
                </div>
              </motion.button>
            ))}
          </div>
        </Reveal>

        {/* Detail panel */}
        <Reveal delay={0.3} direction="left">
          <div className="border border-border p-8 h-full relative overflow-hidden glass">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="font-display text-4xl text-accent opacity-20 mb-4">{current.icon}</div>
                <h3 className="font-display text-3xl text-text mb-3">{current.category}</h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed mb-8">{current.description}</p>

                <div className="space-y-3">
                  {current.items.map((item, i) => (
                    <motion.div
                      key={item}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <div className="w-[4px] h-[4px] bg-accent opacity-60 flex-shrink-0" />
                      <span className={`font-body text-sm ${item.includes('Clair') || item.includes('Zerodha') ? 'text-accent' : 'text-text-secondary'}`}>
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      {/* Tool grid */}
      <Reveal delay={0.4}>
        <div className="border-t border-border pt-10">
          <div className="font-mono text-[9px] tracking-[0.35em] text-muted mb-6">TOOLS & DOMAINS</div>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                className="font-mono text-xs px-3 py-2 border border-border text-text-secondary hover:border-accent/40 hover:text-accent transition-all duration-200 glass"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.03 }}
                data-hover
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
