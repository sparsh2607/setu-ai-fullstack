import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { LayoutGrid, User, Sparkles, FileText, MessageCircle, ShieldCheck, Sparkle } from 'lucide-react'
import Reveal from './Reveal'

const barData = [88, 95, 72, 91, 98, 64, 89, 93, 97, 81]

function AnimatedBar({ h, i, inView }) {
  return (
    <div className="flex-1 h-full flex items-end">
      <motion.div
        className="w-full rounded-t bg-gradient-to-b from-teal to-teal-soft"
        initial={{ height: 0 }}
        animate={inView ? { height: `${h}%` } : { height: 0 }}
        transition={{ duration: 1, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

function MatchBar({ pct, color, inView, delay }) {
  return (
    <div className="h-1.5 bg-paperAlt rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

const sideItems = [
  { icon: LayoutGrid, label: 'Overview', active: true },
  { icon: User, label: 'Profile' },
  { icon: Sparkle, label: 'Matches' },
  { icon: FileText, label: 'Drafts' },
  { icon: MessageCircle, label: 'WhatsApp' },
  { icon: ShieldCheck, label: 'Privacy' },
]

export default function DashboardPreview() {
  const stageRef = useRef(null)
  const inView = useInView(stageRef, { once: true, amount: 0.3 })

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 100, damping: 20 })
  const sy = useSpring(y, { stiffness: 100, damping: 20 })
  const rotateX = useTransform(sy, [-0.5, 0.5], [18, -2])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-16, 4])

  const handleMove = (e) => {
    const rect = stageRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <section id="dashboard" className="py-28 md:py-32 px-5 md:px-14 bg-paperAlt rounded-[48px] mx-2 md:mx-6 overflow-hidden">
      <div className="max-w-[720px] mx-auto text-center mb-16 md:mb-20">
        <Reveal custom={0} as="span" className="inline-block text-sm font-bold text-teal-deep uppercase tracking-wider mb-4.5">Inside the product</Reveal>
        <Reveal custom={1}>
          <h2 className="font-display font-medium text-[clamp(2rem,3.6vw,3rem)] leading-tight tracking-tight mb-5">
            A dashboard that feels<br /><span className="highlight-underline">calm, not clinical.</span>
          </h2>
        </Reveal>
        <Reveal custom={2} className="text-inkSoft text-[1.05rem] leading-relaxed">
          Light, premium, and legible in bright outdoor light — because that's where it'll actually be used.
        </Reveal>
      </div>

      <div ref={stageRef} onMouseMove={handleMove} onMouseLeave={reset} className="relative max-w-[1200px] mx-auto" style={{ perspective: 2200 }}>
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full bg-teal/10 blur-[60px] pointer-events-none" />

        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative z-10 bg-white rounded-[20px] overflow-hidden shadow-lg2 border border-hairline"
        >
          {/* titlebar */}
          <div className="flex items-center gap-4 px-5 py-3.5 bg-paperAlt border-b border-hairline">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F87171]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80]" />
            </div>
            <div className="font-mono text-xs text-inkFaint bg-white px-3.5 py-1 rounded-lg flex-1 max-w-[260px]">app.setu.ai/dashboard</div>
            <div className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-teal-deep">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" /> Live
            </div>
          </div>

          <div className="grid md:grid-cols-[200px_1fr] min-h-[560px]">
            {/* sidebar */}
            <aside className="hidden md:flex flex-col gap-1 bg-paper border-r border-hairline p-5">
              {sideItems.map(item => (
                <div key={item.label} className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${item.active ? 'bg-ink text-white' : 'text-inkSoft hover:bg-paperAlt hover:text-ink'}`}>
                  <item.icon size={17} /> {item.label}
                </div>
              ))}
              <div className="mt-auto flex items-center gap-2.5 p-3 rounded-xl bg-paperAlt">
                <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-teal to-amber text-white text-xs font-bold flex items-center justify-center shrink-0">AS</div>
                <div>
                  <div className="text-xs font-bold">Asha S.</div>
                  <div className="text-[0.68rem] text-inkFaint">Delhi · Verified</div>
                </div>
              </div>
            </aside>

            {/* main */}
            <main className="p-7 md:p-8 overflow-hidden">
              <div className="flex justify-between items-start mb-5.5 gap-4">
                <div>
                  <h4 className="font-display text-2xl font-medium mb-1">Welcome back, Asha</h4>
                  <p className="text-sm text-inkFaint">3 new matches since your profile update</p>
                </div>
                <button className="bg-ink text-white px-4.5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap hover:bg-teal-deep hover:-translate-y-0.5 transition-all">+ Re-check</button>
              </div>

              <motion.div
                animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center gap-3 bg-gradient-to-r from-amber-soft to-[#FFF9EC] border border-amber/25 px-4.5 py-4 rounded-2xl mb-5.5"
              >
                <span className="text-xl">✨</span>
                <div>
                  <b className="text-sm block">You're now eligible for 2 new schemes</b>
                  <span className="text-xs text-inkFaint">Triggered by profile update: education → college</span>
                </div>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-4 mb-5.5">
                <div className="bg-white border border-hairline rounded-2xl p-4.5 hover:-translate-y-1 hover:shadow-md2 transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A]">94% match</span>
                    <span className="text-[0.68rem] text-inkFaint">✓ Verified 3d ago</span>
                  </div>
                  <h5 className="font-display text-base font-medium mb-2">National Scholarship Portal</h5>
                  <p className="text-xs text-inkSoft leading-snug mb-3.5"><b className="text-ink">Why you match:</b> Student status, income range and state details satisfy eligibility.</p>
                  <MatchBar pct={94} color="linear-gradient(90deg,#0D9488,#0B7A70)" inView={inView} delay={0.3} />
                </div>

                <div className="bg-white border border-hairline rounded-2xl p-4.5 hover:-translate-y-1 hover:shadow-md2 transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-soft text-amber-deep">68% match</span>
                    <span className="text-[0.68rem] text-inkFaint">✓ Verified 1w ago</span>
                  </div>
                  <h5 className="font-display text-base font-medium mb-2">Ayushman Bharat PM-JAY</h5>
                  <p className="text-xs text-inkSoft leading-snug mb-3.5"><b className="text-ink">Why you match:</b> Low-income household details match; final document verification pending.</p>
                  <MatchBar pct={68} color="linear-gradient(90deg,#F59E0B,#D97E06)" inView={inView} delay={0.4} />
                </div>
              </div>

              <div className="bg-white border border-hairline rounded-2xl p-4.5">
                <div className="flex justify-between text-xs text-inkFaint font-semibold mb-4">
                  <span>Retrieval quality — last 15 test queries</span>
                  <span className="text-teal-deep">13/15 top-3 hit rate</span>
                </div>
                <div className="flex items-end gap-2 h-20">
                  {barData.map((h, i) => <AnimatedBar key={i} h={h} i={i} inView={inView} />)}
                </div>
              </div>
            </main>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
