import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function MagneticButton({ children, variant = 'primary', icon = true, className = '', onClick }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35)
  }
  const reset = () => { x.set(0); y.set(0) }

  const base = "inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-[0.95rem] relative overflow-hidden group transition-shadow"
  const styles = variant === 'primary'
    ? "bg-ink text-white shadow-md2 hover:shadow-glowTeal"
    : "border-[1.5px] border-hairline text-ink bg-white/50 hover:border-teal hover:text-teal-deep hover:bg-teal-soft"

  return (
    <motion.button
      ref={ref}
      data-hover-target
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${styles} ${className}`}
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 -z-10 bg-gradient-to-r from-teal to-teal-deep translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
      )}
      <span className="relative z-10">{children}</span>
      {icon && <ArrowRight size={17} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />}
    </motion.button>
  )
}
