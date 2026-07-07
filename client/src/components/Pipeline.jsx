import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { List, Waypoints, Sparkles } from 'lucide-react'
import Reveal from './Reveal'

const steps = [
  {
    num: '01', icon: List, tone: 'teal', title: 'Hard filters',
    desc: 'Deterministic checks against indexed fields — age, state, income bracket. Fast, cheap, no AI required.',
    tag: 'MongoDB indexed query',
  },
  {
    num: '02', icon: Waypoints, tone: 'amber', title: 'Semantic retrieval',
    desc: 'Free text like "my father is a small farmer" becomes a vector, matched via $vectorSearch against surviving schemes.',
    tag: 'Atlas Vector Search · cosine similarity',
  },
  {
    num: '03', icon: Sparkles, tone: 'ink', title: 'Grounded explanation',
    desc: 'The LLM writes "why you match" using only retrieved scheme data — user text is sandboxed, never treated as instruction.',
    tag: 'Prompt-injection safe',
  },
]

const toneClasses = {
  teal: 'bg-teal-soft text-teal-deep',
  amber: 'bg-amber-soft text-amber-deep',
  ink: 'bg-ink text-white',
}

function StepCard({ step, i }) {
  const Icon = step.icon
  return (
    <Reveal custom={i} className="relative z-10 bg-white rounded-3xl p-9 border border-hairline shadow-sm2 hover:shadow-lg2 hover:-translate-y-2 transition-all duration-400 group">
      <div className="font-mono text-xs text-inkFaint font-semibold mb-5">{step.num}</div>
      <div className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-5 transition-transform duration-400 group-hover:-rotate-6 group-hover:scale-105 ${toneClasses[step.tone]}`}>
        <Icon size={24} />
      </div>
      <h3 className="font-display text-2xl font-medium mb-3">{step.title}</h3>
      <p className="text-inkSoft text-[0.94rem] leading-relaxed mb-5">{step.desc}</p>
      <div className="inline-block font-mono text-xs text-inkFaint px-3 py-1.5 bg-paperAlt rounded-lg border border-hairline group-hover:border-teal group-hover:text-teal-deep transition-colors">
        {step.tag}
      </div>
    </Reveal>
  )
}

export default function Pipeline() {
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 85%', 'end 60%'] })
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="pipeline" className="py-28 md:py-32 px-5 md:px-14 bg-paperAlt rounded-[48px] mx-2 md:mx-6">
      <div className="max-w-[720px] mx-auto text-center mb-16 md:mb-20">
        <Reveal custom={0} as="span" className="inline-block text-sm font-bold text-teal-deep uppercase tracking-wider mb-4.5">
          How Setu AI decides
        </Reveal>
        <Reveal custom={1}>
          <h2 className="font-display font-medium text-[clamp(2rem,3.6vw,3rem)] leading-tight tracking-tight mb-5">
            Three deterministic steps.<br /><span className="highlight-underline">Zero invented eligibility.</span>
          </h2>
        </Reveal>
        <Reveal custom={2} className="text-inkSoft text-[1.05rem] leading-relaxed">
          Retrieval-Augmented Generation means we look up real scheme data first —
          only then does AI explain it in plain language. The model explains. It never invents.
        </Reveal>
      </div>

      <div ref={trackRef} className="relative max-w-[1200px] mx-auto grid md:grid-cols-3 gap-6 md:gap-8">
        <div className="hidden md:block absolute top-[52px] left-[8%] right-[8%] h-0.5 bg-hairlineStrong z-0">
          <motion.div className="h-full bg-gradient-to-r from-teal to-amber" style={{ width }} />
        </div>
        {steps.map((s, i) => <StepCard key={s.num} step={s} i={i} />)}
      </div>
    </section>
  )
}
