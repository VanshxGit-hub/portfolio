'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, SectionLabel } from './Reveal'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('vanshh7126@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative py-36 px-6 md:px-16 max-w-7xl mx-auto">

      <Reveal>
        <div className="relative border p-12 md:p-20 text-center overflow-hidden" style={{ borderColor: '#1a1a1a' }}>

          <div className="relative z-10">
            <SectionLabel>
              <span className="mx-auto block text-center">Contact</span>
            </SectionLabel>

            <h2 className="font-display font-extralight text-4xl md:text-6xl mb-6 mt-4" style={{ lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Let's talk.
            </h2>

            <p className="font-body text-sm max-w-sm mx-auto mb-12 leading-relaxed" style={{ color: '#555' }}>
              Open to conversations about markets, AI, startups, or anything interesting.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.button
                onClick={copyEmail}
                className="flex items-center gap-3 px-7 py-3.5 font-mono text-[10px] tracking-[0.25em] uppercase"
                style={{ background: '#e2e2e2', color: '#0a0a0a' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {copied ? 'Copied!' : 'vanshh7126@gmail.com'}
              </motion.button>

              <a
                href="mailto:vanshh7126@gmail.com"
                className="flex items-center gap-2 px-7 py-3.5 border font-mono text-[10px] tracking-[0.25em] uppercase transition-colors duration-300"
                style={{ borderColor: '#1a1a1a', color: '#555' }}
              >
                Send email
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t pt-10 mt-8" style={{ borderColor: '#1a1a1a' }}>
          <a
            href="https://twitter.com/gupta43938"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2"
          >
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: '#333' }}>X / Twitter</span>
            <span className="font-body text-xs transition-colors duration-300 group-hover:text-text" style={{ color: '#555' }}>@gupta43938</span>
          </a>

          <div className="font-mono text-[9px] tracking-[0.3em]" style={{ color: '#333' }}>
            © 2025 Vansh Gupta
          </div>
        </div>
      </Reveal>
    </section>
  )
}
