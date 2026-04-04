'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 }
  const trailConfig = { damping: 20, stiffness: 120, mass: 1 }

  const dotX = useSpring(mouseX, springConfig)
  const dotY = useSpring(mouseY, springConfig)
  const trailX = useSpring(mouseX, trailConfig)
  const trailY = useSpring(mouseY, trailConfig)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [data-hover], input, textarea, [role="button"]')
      setIsHovering(!!isInteractive)
    }

    const handleDown = () => setIsClicking(true)
    const handleUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleOver)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isClicking ? 6 : isHovering ? 10 : 6,
            height: isClicking ? 6 : isHovering ? 10 : 6,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Trail ring */}
      <motion.div
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="rounded-full border border-accent"
          animate={{
            width: isClicking ? 24 : isHovering ? 40 : 32,
            height: isClicking ? 24 : isHovering ? 40 : 32,
            opacity: isHovering ? 0.6 : 0.25,
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </motion.div>
    </>
  )
}
