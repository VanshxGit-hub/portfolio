'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from '@/components/Loader'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <CustomCursor />
      <Loader onComplete={() => setLoaded(true)} />

      <AnimatePresence>
        {loaded && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ScrollProgress />
            <Nav />
            <main>
              <Hero />
              <div className="max-w-7xl mx-auto px-6 md:px-16"><div className="h-[1px] bg-border" /></div>
              <About />
              <div className="max-w-7xl mx-auto px-6 md:px-16"><div className="h-[1px] bg-border" /></div>
              <Projects />
              <div className="max-w-7xl mx-auto px-6 md:px-16"><div className="h-[1px] bg-border" /></div>
              <Skills />
              <div className="max-w-7xl mx-auto px-6 md:px-16"><div className="h-[1px] bg-border" /></div>
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}