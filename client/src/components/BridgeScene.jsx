import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// A genuinely 3D scene built from layered CSS-transformed planes (translateZ + perspective)
// plus an animated SVG bridge with a traveling light pulse along the cable path.
// No WebGL dependency — renders instantly, zero install risk, still fully "3D" via real
// perspective/rotateX/rotateY/translateZ transforms that respond to cursor position.

function usePulsePosition(pathRef, duration = 3200, delayMs = 2600) {
  const [pos, setPos] = useState({ x: 320, y: 210 })
  useEffect(() => {
    let raf
    let start = null
    function loop(ts) {
      if (!pathRef.current) { raf = requestAnimationFrame(loop); return }
      if (start === null) start = ts + delayMs
      const elapsed = ts - start
      if (elapsed >= 0) {
        const len = pathRef.current.getTotalLength()
        const t = (elapsed % duration) / duration
        const p = pathRef.current.getPointAtLength(t * len)
        setPos({ x: p.x, y: p.y })
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [pathRef, duration, delayMs])
  return pos
}

export default function BridgeScene() {
  const containerRef = useRef(null)
  const cableRef = useRef(null)
  const pulse = usePulsePosition(cableRef)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 80, damping: 18 })
  const smy = useSpring(my, { stiffness: 80, damping: 18 })
  const rotateY = useTransform(smx, [-0.5, 0.5], [-11, 11])
  const rotateX = useTransform(smy, [-0.5, 0.5], [10, -10])

  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none), (pointer: coarse)').matches)
  }, [])

  const handleMove = (e) => {
    if (isTouch) return
    const rect = containerRef.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const reset = () => { mx.set(0); my.set(0) }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="w-full h-full relative"
      style={{ perspective: '1400px' }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {/* Background glow plane — pushed back in Z */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            transform: 'translateZ(-120px) scale(1.3)',
            background: 'radial-gradient(circle at 50% 45%, rgba(13,148,136,0.16), rgba(245,158,11,0.06) 45%, transparent 72%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Main bridge SVG plane */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox="0 0 640 560"
          style={{ transform: 'translateZ(20px)' }}
        >
          <defs>
            <linearGradient id="cableGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#0D9488" />
              <stop offset="0.5" stopColor="#14B8A6" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
            <radialGradient id="nodeGlowTeal" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0D9488" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0D9488" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="nodeGlowAmber" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
            <filter id="softBlur"><feGaussianBlur stdDeviation="6" /></filter>
          </defs>

          <motion.g initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ transformOrigin: '40px 330px' }}>
            <rect x="40" y="330" width="150" height="14" rx="7" fill="#0F172A" opacity="0.08" />
            <rect x="40" y="322" width="150" height="10" rx="5" fill="#0D9488" />
          </motion.g>
          <motion.g initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }} style={{ transformOrigin: '600px 330px' }}>
            <rect x="450" y="330" width="150" height="14" rx="7" fill="#0F172A" opacity="0.08" />
            <rect x="450" y="322" width="150" height="10" rx="5" fill="#F59E0B" />
          </motion.g>

          <motion.rect x="108" y="120" width="14" height="210" rx="7" fill="#0F172A" opacity="0.85"
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: '115px 330px' }} />
          <motion.rect x="518" y="120" width="14" height="210" rx="7" fill="#0F172A" opacity="0.85"
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: '525px 330px' }} />

          <motion.path
            ref={cableRef}
            d="M40 300 C 115 130, 205 130, 320 210 C 435 130, 525 130, 600 300"
            fill="none" stroke="url(#cableGrad)" strokeWidth="3.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.path
            d="M40 312 C 115 155, 205 155, 320 232 C 435 155, 525 155, 600 312"
            fill="none" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" opacity="0.25"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
          />

          {[80, 150, 260, 380, 490, 560].map((sx, i) => (
            <motion.line
              key={sx} x1={sx} x2={sx}
              y1={sx < 320 ? 300 - (sx - 40) * 0.4 : 300 - (600 - sx) * 0.4}
              y2={326}
              stroke="#0D9488" strokeWidth="1.6" opacity="0"
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.4, delay: 1.1 + i * 0.08 }}
            />
          ))}

          <circle cx={pulse.x} cy={pulse.y} r="5" fill="#F59E0B" filter="url(#softBlur)" opacity="0.9" />
          <circle cx={pulse.x} cy={pulse.y} r="2.6" fill="#FFFDF7" />

          <motion.g initial={{ opacity: 0, scale: 0.4, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3, ease: [0.34, 1.56, 0.64, 1] }}>
            <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
              <circle cx="90" cy="300" r="46" fill="url(#nodeGlowTeal)" />
              <circle cx="90" cy="300" r="30" fill="#FFFFFF" stroke="#0D9488" strokeWidth="1.5" />
              <path d="M90 288a9 9 0 100-18 9 9 0 000 18zm0 4c-8.4 0-18 4.5-18 10.5v3h36v-3c0-6-9.6-10.5-18-10.5z" fill="#0D9488" />
            </motion.g>
          </motion.g>

          <motion.g initial={{ opacity: 0, scale: 0.4, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.6, ease: [0.34, 1.56, 0.64, 1] }}>
            <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}>
              <circle cx="320" cy="210" r="58" fill="url(#nodeGlowTeal)" opacity="0.7" />
              <circle cx="320" cy="210" r="34" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
              <motion.g animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '320px 210px' }}>
                <circle cx="320" cy="210" r="4" fill="#0D9488" />
                <circle cx="303" cy="197" r="3.4" fill="#F59E0B" />
                <circle cx="337" cy="197" r="3.4" fill="#F59E0B" />
                <circle cx="303" cy="223" r="3.4" fill="#0D9488" />
                <circle cx="337" cy="223" r="3.4" fill="#0D9488" />
                <path d="M320 210L303 197M320 210L337 197M320 210L303 223M320 210L337 223" stroke="#0F172A" strokeWidth="1" opacity="0.35" />
              </motion.g>
            </motion.g>
          </motion.g>

          <motion.g initial={{ opacity: 0, scale: 0.4, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.9, ease: [0.34, 1.56, 0.64, 1] }}>
            <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.4 }}>
              <circle cx="550" cy="300" r="46" fill="url(#nodeGlowAmber)" />
              <circle cx="550" cy="300" r="30" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="1.5" />
              <path d="M538 292h24v20h-24z" fill="none" stroke="#F59E0B" strokeWidth="2" />
              <path d="M538 292l12 9 12-9" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinejoin="round" />
            </motion.g>
          </motion.g>

          <motion.text x="90" y="360" textAnchor="middle" className="fill-inkSoft text-xs font-semibold"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>Citizen</motion.text>
          <motion.text x="320" y="278" textAnchor="middle" className="fill-ink text-xs font-bold"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>RAG Match</motion.text>
          <motion.text x="550" y="360" textAnchor="middle" className="fill-inkSoft text-xs font-semibold"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}>Scheme</motion.text>
        </svg>

        <div
          className="absolute w-16 h-16 rounded-2xl pointer-events-none"
          style={{
            top: '8%', right: '12%', transform: 'translateZ(70px) rotate(12deg)',
            background: 'linear-gradient(135deg, rgba(13,148,136,0.14), rgba(245,158,11,0.10))',
            border: '1px solid rgba(255,255,255,0.6)',
            backdropFilter: 'blur(6px)',
          }}
        />
      </motion.div>

      <div className="absolute bottom-[-4%] left-[15%] right-[15%] h-8 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(15,23,42,0.12) 0%, transparent 70%)', filter: 'blur(8px)' }} />
    </div>
  )
}
