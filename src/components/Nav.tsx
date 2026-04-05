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
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <AnimatePresence>
        {scrolled && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #1a1a1a' }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 font-mono text-xs tracking-[0.3em] text-text uppercase select-none">
        VG
      </div>

      <div className="relative z-10 hidden md:flex items-center gap-10">
        {links.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            className="font-body text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-text transition-colors duration-300 relative group"
          >
            {link}
            <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-text group-hover:w-full transition-all duration-300" />
          </button>
        ))}
      </div>

      <a
        href="mailto:vanshh7126@gmail.com"
        className="relative z-10 hidden md:flex items-center font-mono text-[10px] tracking-[0.2em] uppercase text-text-secondary hover:text-text transition-colors duration-300"
      >
        Get in touch
      </a>
    </motion.nav>
  )
}