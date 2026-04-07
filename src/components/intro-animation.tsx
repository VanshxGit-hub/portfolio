"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface IntroAnimationProps {
  onComplete: () => void
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [visible, setVisible] = useState(true)
  const [startExit, setStartExit] = useState(false)

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setStartExit(true)
    }, 3200)

    const completeTimer = setTimeout(() => {
      setVisible(false)
      onComplete()
    }, 4000)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  const lines = [
    {
      text: "Markets move in seconds.",
      delay: 0.2,
      gradient: false,
      className: "text-2xl md:text-3xl font-medium tracking-tight text-white/80",
    },
    {
      text: "Decisions shouldn't lag.",
      delay: 0.9,
      gradient: false,
      className: "text-2xl md:text-3xl font-medium tracking-tight text-white/80",
    },
    {
      text: "Meet Clair.",
      delay: 1.6,
      gradient: true,
      className: "text-4xl md:text-6xl font-bold tracking-tight",
    },
  ]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            backgroundColor: "#06080f",
            zIndex: 99999,
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: startExit ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(79,124,255,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(79,124,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(79,124,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Lines */}
          <div className="relative z-10 flex flex-col items-center gap-4 px-8 text-center">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{
                  opacity: startExit ? 0 : 1,
                  y: startExit ? -8 : 0,
                }}
                transition={{
                  opacity: {
                    delay: startExit ? 0 : line.delay,
                    duration: startExit ? 0.4 : 0.7,
                    ease: "easeOut",
                  },
                  y: {
                    delay: startExit ? 0 : line.delay,
                    duration: startExit ? 0.4 : 0.7,
                    ease: "easeOut",
                  },
                }}
              >
                {line.gradient ? (
                  <span
                    className={line.className}
                    style={{
                      background: "linear-gradient(135deg, #4f7cff 0%, #a5b4fc 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {line.text}
                  </span>
                ) : (
                  <span className={line.className}>{line.text}</span>
                )}
              </motion.div>
            ))}

            {/* Subtle line under Meet Clair */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: startExit ? 0 : 1,
                opacity: startExit ? 0 : 1,
              }}
              transition={{
                delay: startExit ? 0 : 2.2,
                duration: 0.6,
                ease: "easeOut",
              }}
              style={{
                height: "1px",
                width: "120px",
                background: "linear-gradient(90deg, transparent, #4f7cff, transparent)",
                transformOrigin: "center",
                marginTop: "8px",
              }}
            />
          </div>

          {/* Skip button */}
          <motion.button
            className="absolute bottom-10 text-xs tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.25)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: startExit ? 0 : 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            onClick={() => {
              setStartExit(true)
              setTimeout(() => {
                setVisible(false)
                onComplete()
              }, 500)
            }}
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}