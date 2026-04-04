'use client'

import { Reveal, SectionLabel } from './Reveal'

const stats = [
  { value: '1.5y', label: 'Derivative trader' },
  { value: 'F&O', label: 'Options & futures' },
  { value: 'Clair', label: 'AI assistant built' },
]

const traits = ['Entrepreneur', 'Derivative Trader', 'AI Builder', 'Zerodha Certified']

export default function About() {
  return (
    <section id="about" className="relative py-36 px-6 md:px-16 max-w-7xl mx-auto">

      <div className="absolute left-8 top-36 hidden xl:flex flex-col items-center gap-3 opacity-30">
        <div className="h-20 w-[1px] bg-border" />
        <span className="font-mono text-[9px] tracking-[0.4em] text-muted rotate-90 whitespace-nowrap">
          01 / About
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Left — text */}
        <div>
          <Reveal>
            <SectionLabel>About me</SectionLabel>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display font-light text-5xl md:text-6xl leading-tight mb-10" style={{ lineHeight: 1.1 }}>
              Hey,Everyone
              <br />
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="font-body text-text-secondary leading-relaxed text-base mb-6 max-w-lg">
              I'm Vansh — an entrepreneur and stock market enthusiast who started trading derivatives
              at 17. I've spent 1.5 years in F&O markets, and I know first-hand how paralyzing it
              is to stare at charts without a clear edge. That's exactly why I built{' '}
              <span className="text-accent font-medium">Clair</span>.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="font-body text-text-secondary leading-relaxed text-base mb-6 max-w-lg">
              <span className="text-accent font-medium">Clair</span> is an AI-powered trading assistant
              that tackles the two biggest problems retail traders face: decision paralysis and shallow
              analysis. It gives you institutional-grade technical analysis — fast, clear, and actionable.
            </p>
          </Reveal>

          {/* Traits */}
          <Reveal delay={0.4}>
            <div className="flex flex-wrap gap-2">
              {traits.map((t) => (
                <span
                  key={t}
                  className={`font-mono text-xs px-3 py-1.5 border tracking-wider transition-colors duration-200 ${
                    t === 'Zerodha Certified'
                      ? 'border-accent text-accent bg-accent/5'
                      : 'border-border text-text-secondary hover:border-accent/40 hover:text-accent/70'
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right — stats + visual */}
        <div className="space-y-6">
          {/* Abstract visual — Clair themed */}
          <Reveal delay={0.15} direction="left">
            <div className="relative aspect-square max-w-sm mx-auto lg:mx-0 border border-border p-8 group hover:border-accent/30 transition-colors duration-500 glass">
              {/* Corner marks */}
              {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-4 h-4`}
                  style={{
                    borderTop: pos.includes('top') ? '1px solid rgba(79,124,255,0.5)' : 'none',
                    borderBottom: pos.includes('bottom') ? '1px solid rgba(79,124,255,0.5)' : 'none',
                    borderLeft: pos.includes('left') ? '1px solid rgba(79,124,255,0.5)' : 'none',
                    borderRight: pos.includes('right') ? '1px solid rgba(79,124,255,0.5)' : 'none',
                  }}
                />
              ))}

              {/* Chart-like SVG representing markets/Clair */}
              <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" className="opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                {/* Grid lines */}
                {[40,80,120,160].map(y => (
                  <line key={y} x1="20" y1={y} x2="180" y2={y} stroke="rgba(79,124,255,0.06)" strokeWidth="0.5" />
                ))}
                {[50,100,150].map(x => (
                  <line key={x} x1={x} y1="20" x2={x} y2="180" stroke="rgba(79,124,255,0.06)" strokeWidth="0.5" />
                ))}

                {/* Candlestick-like bars */}
                {[
                  {x:30,h:60,y:90,up:false},
                  {x:50,h:40,y:70,up:true},
                  {x:70,h:50,y:80,up:false},
                  {x:90,h:70,y:60,up:true},
                  {x:110,h:35,y:55,up:true},
                  {x:130,h:55,y:50,up:true},
                  {x:150,h:30,y:45,up:true},
                  {x:170,h:45,y:40,up:true},
                ].map((bar, i) => (
                  <g key={i}>
                    <rect
                      x={bar.x - 6} y={bar.y}
                      width={12} height={bar.h}
                      fill={bar.up ? 'rgba(79,124,255,0.25)' : 'rgba(165,180,252,0.12)'}
                      stroke={bar.up ? 'rgba(79,124,255,0.7)' : 'rgba(165,180,252,0.4)'}
                      strokeWidth="0.5"
                    />
                    <line x1={bar.x} y1={bar.y - 8} x2={bar.x} y2={bar.y} stroke={bar.up ? 'rgba(79,124,255,0.5)' : 'rgba(165,180,252,0.3)'} strokeWidth="0.5" />
                    <line x1={bar.x} y1={bar.y + bar.h} x2={bar.x} y2={bar.y + bar.h + 8} stroke={bar.up ? 'rgba(79,124,255,0.5)' : 'rgba(165,180,252,0.3)'} strokeWidth="0.5" />
                  </g>
                ))}

                {/* Trend line */}
                <polyline
                  points="30,140 50,120 70,125 90,95 110,80 130,70 150,58 170,50"
                  stroke="rgba(79,124,255,0.8)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="4 3"
                />

                {/* Clair dot at end */}
                <circle cx="170" cy="50" r="4" fill="#4f7cff" style={{ filter: 'drop-shadow(0 0 6px #4f7cff)' }} />
              </svg>

              {/* Label overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="font-mono text-[9px] tracking-[0.3em] text-accent opacity-70">CLAIR.AI.ANALYSIS</div>
              </div>
            </div>
          </Reveal>

          {/* Stats row */}
          <Reveal delay={0.3}>
            <div className="grid grid-cols-3 gap-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="border border-border p-4 group hover:border-accent/30 transition-colors duration-300 glass">
                  <div className="font-display text-2xl text-accent mb-1">{value}</div>
                  <div className="font-mono text-[9px] tracking-[0.2em] text-muted uppercase">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
