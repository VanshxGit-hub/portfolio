'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['About', 'Projects', 'Skills', 'Contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className="fixed top-0 inset-x-0 z-[9000] flex items-center justify-between px-8 md:px-16 py-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <AnimatePresence>
        {scrolled && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'rgba(6,8,15,0.85)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(79,124,255,0.08)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Logo — Clair branded */}
      <div className="relative z-10 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent" style={{ boxShadow: '0 0 8px #4f7cff' }} />
        <span className="font-mono text-sm text-accent tracking-widest select-none font-medium">
          CLAIR
        </span>
      </div>

      {/* Links */}
      <div className="relative z-10 hidden md:flex items-center gap-10">
        {links.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            className="font-body text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-text transition-colors duration-300 relative group"
            data-hover
          >
            {link}
            <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
          </button>
        ))}
      </div>

      {/* CTA */}
      <a
        href="mailto:vanshh7126@gmail.com"
        className="relative z-10 hidden md:flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase px-5 py-2.5 border border-border hover:border-accent text-text-secondary hover:text-accent transition-all duration-300 glass"
        data-hover
      >
        Get in touch
      </a>
    </motion.nav>
  )
}
