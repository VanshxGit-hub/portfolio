'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, SectionLabel } from './Reveal'

const links = [
  { label: 'X / Twitter', href: 'https://twitter.com/gupta43938', handle: '@gupta43938' },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('vanshh7126@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative py-36 px-6 md:px-16 max-w-7xl mx-auto">

      <div className="absolute left-8 top-36 hidden xl:flex flex-col items-center gap-3 opacity-30">
        <div className="h-20 w-[1px] bg-border" />
        <span className="font-mono text-[9px] tracking-[0.4em] text-muted rotate-90 whitespace-nowrap">04 / Contact</span>
      </div>

      {/* Full-width CTA block */}
      <Reveal>
        <div className="relative border border-border p-12 md:p-20 text-center overflow-hidden mb-16 group glass">
          {/* BG orb */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[400px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: 'radial-gradient(ellipse, rgba(79,124,255,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          </div>

          {/* Corner marks */}
          {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-6 h-6`}
              style={{
                borderTop: pos.includes('top') ? '1px solid rgba(79,124,255,0.4)' : 'none',
                borderBottom: pos.includes('bottom') ? '1px solid rgba(79,124,255,0.4)' : 'none',
                borderLeft: pos.includes('left') ? '1px solid rgba(79,124,255,0.4)' : 'none',
                borderRight: pos.includes('right') ? '1px solid rgba(79,124,255,0.4)' : 'none',
              }}
            />
          ))}

          <div className="relative z-10">
            <SectionLabel>
              <span className="mx-auto block text-center">Get in touch</span>
            </SectionLabel>

            {/* Clair callout */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass clair-badge mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" style={{ boxShadow: '0 0 6px #4f7cff' }} />
              <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase">
                Clair · AI Trading Assistant
              </span>
            </div>

            <h2 className="font-display font-light text-5xl md:text-7xl mb-6 mt-4" style={{ lineHeight: 1.1 }}>
              Let's talk<br />
              <span className="text-text-secondary">markets & ideas</span>
            </h2>

            <p className="font-body text-text-secondary text-sm max-w-lg mx-auto mb-12 leading-relaxed">
              Building <span className="text-accent">Clair</span> — if you're a founder, investor, or trader who wants to collaborate, 
              test the product, or just talk markets, I'm always up for it.
            </p>

            {/* Email CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                onClick={copyEmail}
                className="flex items-center gap-3 px-8 py-4 bg-accent text-bg font-body text-xs tracking-[0.25em] uppercase font-semibold hover:bg-indigo-400 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-hover
              >
                {copied ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    vanshh7126@gmail.com
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <rect x="1" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
                      <path d="M3 3V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H9" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </>
                )}
              </motion.button>

              <a
                href="mailto:vanshh7126@gmail.com"
                className="flex items-center gap-2 px-8 py-4 border border-border text-text-secondary font-body text-xs tracking-[0.25em] uppercase hover:border-accent hover:text-accent transition-all duration-300 glass"
                data-hover
              >
                Send email
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H6M10 2V6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Social links + footer */}
      <Reveal delay={0.2}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-border pt-10">
          <div className="flex flex-wrap gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
                data-hover
              >
                <span className="font-mono text-[9px] tracking-[0.25em] text-muted uppercase">{link.label}</span>
                <span className="font-body text-xs text-text-secondary group-hover:text-accent transition-colors duration-300 border-b border-transparent group-hover:border-accent/40">
                  {link.handle}
                </span>
              </a>
            ))}

            {/* Clair highlight */}
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-accent" style={{ boxShadow: '0 0 4px #4f7cff' }} />
              <span className="font-mono text-[9px] tracking-[0.25em] text-accent uppercase">Clair · In Development</span>
            </div>
          </div>

          <div className="font-mono text-[9px] tracking-[0.3em] text-muted">
            © 2026 Vansh Gupta
          </div>
        </div>
      </Reveal>
    </section>
  )
}
