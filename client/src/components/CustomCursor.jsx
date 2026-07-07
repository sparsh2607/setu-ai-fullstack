import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isActive, setIsActive] = useState(false)
  const [isTouch, setIsTouch] = useState(true)
  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)
  const ringX = useSpring(dotX, { damping: 25, stiffness: 300 })
  const ringY = useSpring(dotY, { damping: 25, stiffness: 300 })

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none), (pointer: coarse)').matches)

    const move = (e) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }
    const onEnter = (e) => {
      if (e.target.closest('[data-hover-target]')) setIsActive(true)
    }
    const onLeave = (e) => {
      if (e.target.closest('[data-hover-target]')) setIsActive(false)
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [dotX, dotY])

  if (isTouch) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-ink pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border-[1.5px] border-teal/50 pointer-events-none z-[9999]"
        style={{
          x: ringX, y: ringY, translateX: '-50%', translateY: '-50%',
        }}
        animate={{
          width: isActive ? 56 : 34,
          height: isActive ? 56 : 34,
          backgroundColor: isActive ? 'rgba(13,148,136,0.08)' : 'rgba(13,148,136,0)',
          borderColor: isActive ? '#0D9488' : 'rgba(13,148,136,0.5)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
    </>
  )
}
