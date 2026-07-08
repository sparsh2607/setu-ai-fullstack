import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Sparkles } from 'lucide-react'
import BridgeScene from './BridgeScene'
import Counter from './Counter'
import { MagneticButton } from './MagneticButton'
import Reveal from './Reveal'
import { goToEligibilityFlow } from '../utils/navigation'

const words = ['welfare', 'schemes', 'benefits', 'support']

function WordSwap() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % words.length), 2800)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="inline-block relative w-[9ch] text-left">
      <motion.span
        key={idx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        {words[idx]}
      </motion.span>
    </span>
  )
}

function FloatCard({ className, delay, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      className={`absolute glass rounded-2xl shadow-md2 px-4 py-3.5 ${className}`}
      style={{ animation: `floatY 6s ease-in-out ${delay}s infinite` }}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center px-5 md:px-14 pt-36 pb-16 overflow-hidden">
      <style>{`@keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }`}</style>

      <div
        className="absolute -top-[20%] -right-[10%] w-[60vw] max-w-[900px] aspect-square rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.10) 0%, rgba(245,158,11,0.05) 45%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto w-full grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
        <div>
          <Reveal custom={0} className="inline-flex items-center gap-2 text-sm font-semibold text-teal-deep px-4 py-2 rounded-full bg-teal-soft border border-teal/15 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            AI-powered · RAG-grounded · Built for Bharat
          </Reveal>

          <Reveal custom={1}>
            <h1 className="font-display font-medium leading-[1.05] tracking-tight text-[clamp(2.6rem,5.2vw,4.4rem)] mb-6">
              <span className="block">The bridge between</span>
              <span className="block">citizens and the</span>
              <span className="block text-teal-deep italic font-medium"><WordSwap /> they deserve</span>
            </h1>
          </Reveal>

          <Reveal custom={2} className="text-lg text-inkSoft max-w-lg leading-relaxed mb-9">
            Setu means <em className="text-ink not-italic font-semibold">bridge</em>. We connect eligible citizens to government
            schemes they qualify for — with plain-language reasoning grounded in
            real data, never invented. No app download. Works on WhatsApp.
          </Reveal>

          <Reveal custom={3} className="flex gap-3.5 flex-wrap mb-12">
            <MagneticButton variant="primary" onClick={() => goToEligibilityFlow('home') }>Find my schemes</MagneticButton>
            <MagneticButton variant="outline" icon={false}>
              <span className="flex items-center gap-2">
                <Play size={16} fill="currentColor" /> Watch 90-sec demo
              </span>
            </MagneticButton>
          </Reveal>

          <Reveal custom={4} className="flex items-baseline gap-5 flex-wrap">
            <div className="flex flex-col gap-0.5">
              <div><Counter target={62} suffix="%" /></div>
              <span className="text-xs text-inkFaint max-w-[130px] leading-tight">never knew a scheme existed*</span>
            </div>
            <div className="w-px h-10 bg-hairline" />
            <div className="flex flex-col gap-0.5">
              <div><Counter target={45} suffix="+" /></div>
              <span className="text-xs text-inkFaint max-w-[130px] leading-tight">verified schemes, sourced &amp; dated</span>
            </div>
            <div className="w-px h-10 bg-hairline" />
            <div className="flex flex-col gap-0.5">
              <div><Counter target={800} suffix="ms" /></div>
              <span className="text-xs text-inkFaint max-w-[130px] leading-tight">avg. match response time</span>
            </div>
          </Reveal>
          <p className="text-[0.72rem] text-inkFaint italic mt-3.5">*Six-state study on national health-insurance scheme awareness</p>
        </div>

        <div className="relative h-[420px] sm:h-[480px] lg:h-[560px]">
          <BridgeScene />

          <FloatCard className="top-[6%] -left-[2%] sm:-left-[6%] w-[190px] sm:w-[210px]" delay={2.6}>
            <div className="flex items-center gap-1.5 text-xs font-bold mb-1">
              <Sparkles size={13} className="text-amber" /> Why you match
            </div>
            <p className="text-[0.72rem] text-inkSoft leading-snug">
              Age, state and income details satisfy <b className="text-teal-deep">scheme</b> eligibility.
            </p>
          </FloatCard>

          <FloatCard className="bottom-[12%] -right-[4%] sm:-right-[8%] w-[190px] flex items-center gap-2.5" delay={3.1}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3.5a8.4 8.4 0 00-7.15 12.8L4 20.5l4.3-1.13A8.4 8.4 0 1012 3.5z" stroke="#0D9488" strokeWidth="1.6" /></svg>
            <div>
              <div className="text-[0.74rem] font-bold">Matched via WhatsApp</div>
              <div className="text-[0.68rem] text-inkFaint">"Mujhe scholarship aur health support chahiye"</div>
            </div>
          </FloatCard>

          <FloatCard className="-bottom-[2%] left-[6%] flex items-center gap-1.5 text-[0.72rem] font-semibold text-inkSoft" delay={3.4}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#0D9488" opacity=".15" /><path d="M5 8.2l2 2 4-4.4" stroke="#0D9488" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Verified 3 days ago
          </FloatCard>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[0.7rem] font-semibold text-inkFaint z-10"
      >
        <span>Scroll to see how</span>
        <svg width="14" height="20" viewBox="0 0 14 20">
          <rect x="1" y="1" width="12" height="18" rx="6" stroke="#0F172A" strokeOpacity="0.3" fill="none" />
          <motion.circle cx="7" cy="7" r="2" fill="#0D9488" animate={{ y: [0, 6, 0], opacity: [1, 0.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
        </svg>
      </motion.div>
    </section>
  )
}
