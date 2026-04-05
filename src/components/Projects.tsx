'use client'

import { useRef, useState, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Reveal, SectionLabel } from './Reveal'

const projects = [
  {
    title: 'Clair',
    subtitle: 'AI-Powered Trading Assistant',
    problem: 'Retail traders face decision paralysis and surface-level analysis — no real edge.',
    built: 'An AI assistant delivering real-time technical analysis and trade insights, cutting through noise so traders can act with conviction.',
    stack: ['AI / LLM', 'Technical Analysis', 'Real-time Data'],
    year: '2026-present',
    status: 'In development',
    featured: true,
  },
]

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [3, -3]), { damping: 30, stiffness: 200 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-3, 3]), { damping: 30, stiffness: 200 })

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.div>
  )
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false)

  if (project.featured) {
    return (
      <TiltCard>
        <motion.div
          className="relative border p-10 md:p-12 overflow-hidden"
          style={{ borderColor: hovered ? '#2a2a2a' : '#1a1a1a' }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute top-8 right-8 font-mono text-[9px] tracking-[0.3em] uppercase border px-2 py-1"
            style={{ borderColor: '#2a2a2a', color: '#444' }}>
            Featured
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <div className="font-mono text-[9px] tracking-[0.3em] mb-4" style={{ color: '#444' }}>
                {project.year} · {project.status}
              </div>
              <h3 className="font-display text-4xl font-light mb-2" style={{ letterSpacing: '-0.02em' }}>
                {project.title}
              </h3>
              <p className="font-body text-sm mb-8" style={{ color: '#555' }}>{project.subtitle}</p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span key={t} className="font-mono text-[9px] px-2 py-1 border tracking-wider"
                    style={{ borderColor: '#1a1a1a', color: '#444' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <div className="font-mono text-[9px] tracking-[0.25em] mb-2 uppercase" style={{ color: '#444' }}>Problem</div>
                <p className="font-body text-sm leading-relaxed" style={{ color: '#666' }}>{project.problem}</p>
              </div>
              <div className="h-[1px]" style={{ background: '#1a1a1a' }} />
              <div>
                <div className="font-mono text-[9px] tracking-[0.25em] mb-2 uppercase" style={{ color: '#444' }}>Solution</div>
                <p className="font-body text-sm leading-relaxed" style={{ color: '#666' }}>{project.built}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </TiltCard>
    )
  }

  return (
    <TiltCard>
      <motion.div
        className="relative border p-7 h-full overflow-hidden"
        style={{ borderColor: hovered ? '#2a2a2a' : '#1a1a1a' }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        transition={{ duration: 0.3 }}
      >
        <div className="font-mono text-[9px] tracking-[0.3em] mb-3" style={{ color: '#444' }}>{project.year}</div>
        <h3 className="font-display text-xl font-light mb-1">{project.title}</h3>
        <p className="font-body text-xs mb-5" style={{ color: '#555' }}>{project.subtitle}</p>

        <div className="mb-4">
          <div className="font-mono text-[9px] tracking-[0.2em] mb-1.5 uppercase" style={{ color: '#444' }}>Problem</div>
          <p className="font-body text-xs leading-relaxed" style={{ color: '#666' }}>{project.problem}</p>
        </div>
        <div className="mb-5">
          <div className="font-mono text-[9px] tracking-[0.2em] mb-1.5 uppercase" style={{ color: '#444' }}>Solution</div>
          <p className="font-body text-xs leading-relaxed" style={{ color: '#666' }}>{project.built}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span key={t} className="font-mono text-[9px] px-2 py-1 border tracking-wider"
              style={{ borderColor: '#1a1a1a', color: '#444' }}>
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </TiltCard>
  )
}

export default function Projects() {
  const featured = projects.filter(p => p.featured)
  const rest = projects.filter(p => !p.featured)

  return (
    <section id="projects" className="relative py-36 px-6 md:px-16 max-w-7xl mx-auto">

      <Reveal>
        <SectionLabel>Work</SectionLabel>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="font-display font-extralight text-4xl md:text-5xl mb-16" style={{ lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          Things I've built.
        </h2>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mb-6">
          {featured.map(p => <ProjectCard key={p.title} project={p} />)}
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rest.map((project, i) => (
          <Reveal key={project.title} delay={0.1 * (i + 1)}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}