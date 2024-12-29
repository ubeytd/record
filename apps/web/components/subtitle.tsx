'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface SubtitleProps {
  currentTime: number
  duration: number
}

export function Subtitle({ currentTime, duration }: SubtitleProps) {
  const [activeWordIndex, setActiveWordIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  const words = loremIpsum.split(' ')

  useEffect(() => {
    const wordDuration = duration / words.length
    const currentWordIndex = Math.floor(currentTime / wordDuration)
    setActiveWordIndex(currentWordIndex)

    if (containerRef.current) {
      const container = containerRef.current
      const activeWord = container.children[currentWordIndex] as HTMLElement
      if (activeWord) {
        const containerHeight = container.offsetHeight
        const wordPosition = activeWord.offsetTop
        const scrollPosition = wordPosition - containerHeight / 2 + activeWord.offsetHeight / 2

        controls.start({
          y: -scrollPosition,
          transition: { duration: 2, ease: "linear" }
        })
      }
    }
  }, [currentTime, duration, words.length, controls])

  return (
    <div className="relative w-full overflow-hidden h-[40vh] flex justify-center bg-black">
      <motion.div
        ref={containerRef}
        className="flex flex-col items-center absolute py-4"
        animate={controls}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="my-1.5 text-white text-xl md:text-2xl font-medium text-center px-4"
            initial={{ opacity: 0.3, scale: 0.95 }}
            animate={{
              opacity: index === activeWordIndex ? 1 : 0.3,
              scale: index === activeWordIndex ? 1 : 0.95,
            }}
            transition={{ duration: 0.2 }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

