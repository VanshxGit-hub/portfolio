'use client'

import { Reveal, SectionLabel } from './Reveal'

const traits = ['Entrepreneur', 'Derivative Trader', 'AI Builder', 'Zerodha Certified']

export default function About() {
  return (
    <section id="about" className="relative py-36 px-6 md:px-16 max-w-7xl mx-auto">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

        <div>
          <Reveal>
            <SectionLabel>About</SectionLabel>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display font-extralight text-4xl md:text-5xl mb-10" style={{ lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              I trade markets<br />and build products.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="font-body leading-relaxed text-sm mb-6 max-w-md" style={{ color: '#666' }}>
              I'm Vansh — an entrepreneur and stock market enthusiast who started trading
              derivatives at 17. After 1.5 years in F&O markets, I saw firsthand how
              paralysing it is to make decisions without a clear edge.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="font-body leading-relaxed text-sm mb-10 max-w-md" style={{ color: '#666' }}>
              That led me to build Clair — an AI-powered trading assistant. I just wrapped
              my Class 12 boards and I'm going all in on the intersection of AI and
              financial markets.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-2">
              {traits.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-3 py-1.5 tracking-wider border"
                  style={{ borderColor: '#1a1a1a', color: '#555' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} direction="left">
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { value: '1.5y', label: 'Live derivative trading' },
              { value: 'F&O', label: 'Options & futures' },
              { value: 'Clair', label: 'Current project' },
              { value: '2025', label: 'Building now' },
            ].map(({ value, label }) => (
              <div key={label} className="border p-5" style={{ borderColor: '#1a1a1a' }}>
                <div className="font-display text-2xl font-light mb-1">{value}</div>
                <div className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: '#444' }}>{label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
