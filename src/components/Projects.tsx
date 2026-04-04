'use client'

import { useRef, useState, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Reveal, SectionLabel } from './Reveal'

const featured = {
  title: 'Clair',
  subtitle: 'AI-Powered Trading Assistant',
  problem: 'Retail traders face two crushing problems: decision paralysis when markets move fast, and surface-level analysis that misses the real edge.',
  built: 'An AI assistant that delivers real-time technical analysis, pattern recognition, and trade insights — cutting through noise so traders can act with conviction, not guesswork.',
  stack: ['AI / LLM', 'Technical Analysis', 'Real-time Data', 'Mobile App'],
  year: '2026-present',
  status: 'Building · Live soon',
  color: 'rgba(79,124,255,0.04)',
}

const projects = [
  {
    title: 'Options Flow',
    subtitle: 'Derivative Trade Tracker',
    problem: 'Retail F&O traders lack structured journaling and post-trade analysis.',
    built: 'Built a personal trade tracking system with P&L analytics and pattern review across 1.5 years of derivative trading.',
    stack: ['Python', 'Data Analysis'],
    year: '2023',
  },
  {
    title: 'Market Scanner',
    subtitle: 'Technical Signal Screener',
    problem: 'Scanning hundreds of stocks for setups manually is time-consuming and error-prone.',
    built: 'Automated scanner that flags technical breakouts and momentum setups across NSE-listed equities.',
    stack: ['Python', 'TA-Lib', 'NSE API'],
    year: '2024',
  },
  {
    title: 'Analysis Engine',
    subtitle: 'Core of Clair',
    problem: 'Technical analysis tools are fragmented — traders jump between TradingView, screeners, and news.',
    built: 'The analysis core powering Clair — ingests price action, indicators, and volume data to surface structured insights.',
    stack: ['AI', 'Python', 'FastAPI'],
    year: '2025',
  },
]

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { damping: 30, stiffness: 200 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { damping: 30, stiffness: 200 })

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  )
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <TiltCard>
      <motion.div
        className="relative h-full border border-border p-7 group overflow-hidden glass"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ borderColor: hovered ? 'rgba(79,124,255,0.25)' : 'rgba(20,28,46,1)' }}
        transition={{ duration: 0.3 }}
        data-hover
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: 'radial-gradient(circle at 50% 0%, rgba(79,124,255,0.05) 0%, transparent 70%)' }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="font-mono text-[9px] tracking-[0.3em] text-muted mb-2">{project.year}</div>
              <h3 className="font-display text-2xl text-text">{project.title}</h3>
              <p className="font-body text-xs text-text-secondary mt-0.5">{project.subtitle}</p>
            </div>
            <motion.div
              className="text-muted"
              animate={{ x: hovered ? 4 : 0, y: hovered ? -4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H7M13 3V9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>

          <div className="mb-4">
            <div className="font-mono text-[9px] tracking-[0.25em] text-accent/60 mb-1.5">PROBLEM</div>
            <p className="font-body text-xs text-text-secondary leading-relaxed">{project.problem}</p>
          </div>

          <div className="mb-5">
            <div className="font-mono text-[9px] tracking-[0.25em] text-accent/60 mb-1.5">SOLUTION</div>
            <p className="font-body text-xs text-text-secondary leading-relaxed">{project.built}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <span key={t} className="font-mono text-[9px] px-2 py-1 border border-border text-muted tracking-wider">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </TiltCard>
  )
}

export default function Projects() {
  const [featuredHover, setFeaturedHover] = useState(false)

  return (
    <section id="projects" className="relative py-36 px-6 md:px-16 max-w-7xl mx-auto">

      <div className="absolute left-8 top-36 hidden xl:flex flex-col items-center gap-3 opacity-30">
        <div className="h-20 w-[1px] bg-border" />
        <span className="font-mono text-[9px] tracking-[0.4em] text-muted rotate-90 whitespace-nowrap">02 / Projects</span>
      </div>

      <Reveal>
        <SectionLabel>Projects</SectionLabel>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="font-display font-light text-5xl md:text-6xl mb-16" style={{ lineHeight: 1.1 }}>
          Hi,Everyone<br />
        </h2>
      </Reveal>

      {/* Featured — Clair */}
      <Reveal delay={0.2}>
        <TiltCard>
          <motion.div
            className="relative border featured-border p-10 md:p-14 mb-8 overflow-hidden group"
            style={{ borderColor: featuredHover ? 'rgba(79,124,255,0.35)' : 'rgba(20,28,46,1)', background: featured.color }}
            onHoverStart={() => setFeaturedHover(true)}
            onHoverEnd={() => setFeaturedHover(false)}
            transition={{ duration: 0.4 }}
            data-hover
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: featuredHover ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(79,124,255,0.07) 0%, transparent 60%)' }}
            />

            {/* Featured badge */}
            <div className="absolute top-8 right-8 font-mono text-[9px] tracking-[0.3em] text-accent border border-accent/40 px-3 py-1.5 clair-badge">
              FLAGSHIP · CLAIR
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="font-mono text-[9px] tracking-[0.3em] text-muted mb-4">{featured.year} · {featured.status}</div>

                {/* Clair logo treatment */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-accent" style={{ boxShadow: '0 0 12px #4f7cff' }} />
                  <h3 className="font-display text-5xl md:text-6xl text-accent tracking-tight">{featured.title}</h3>
                </div>
                <p className="font-body text-text-secondary mb-8">{featured.subtitle}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {featured.stack.map((t) => (
                    <span key={t} className="font-mono text-[9px] px-3 py-1.5 border border-accent/20 text-accent/70 tracking-wider">
                      {t}
                    </span>
                  ))}
                </div>

                <motion.a
                  href="https://twitter.com/gupta43938"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-body text-xs tracking-[0.2em] uppercase text-accent border border-accent/40 px-6 py-3 hover:bg-accent hover:text-bg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-hover
                >
                  Follow the build
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </motion.a>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="font-mono text-[9px] tracking-[0.25em] text-accent/60 mb-2">THE PROBLEM</div>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">{featured.problem}</p>
                </div>
                <div className="h-[1px] bg-border" />
                <div>
                  <div className="font-mono text-[9px] tracking-[0.25em] text-accent/60 mb-2">WHAT CLAIR DOES</div>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">{featured.built}</p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[['AI', 'powered analysis'], ['Real-time', 'market data'], ['Zero', 'noise, pure signal']].map(([v, l]) => (
                    <div key={l} className="border border-border p-3 glass">
                      <div className="font-display text-lg text-accent leading-tight">{v}</div>
                      <div className="font-mono text-[8px] tracking-wider text-muted mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </TiltCard>
      </Reveal>
    </section>
  )
}
