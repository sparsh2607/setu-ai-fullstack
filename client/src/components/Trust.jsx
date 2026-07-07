import { Minimize2, CheckSquare, Trash2, ShieldAlert } from 'lucide-react'
import Reveal from './Reveal'

const items = [
  { icon: Minimize2, num: '01', title: 'Data minimization', desc: 'Only fields actually used in matching are collected — nothing "just in case."' },
  { icon: CheckSquare, num: '02', title: 'Explicit consent', desc: 'A checked box, not a pre-checked default. No profile form proceeds without it.' },
  { icon: Trash2, num: '03', title: 'Real right to deletion', desc: '"Delete my data" triggers an actual hard delete — not a cosmetic screen.' },
  { icon: ShieldAlert, num: '04', title: 'Prompt-injection safe', desc: 'User text is always data, never instruction — sandboxed in every LLM call.' },
]

export default function Trust() {
  return (
    <section id="trust" className="py-28 md:py-32 px-5 md:px-14">
      <div className="max-w-[1100px] mx-auto">
        <div className="max-w-[720px] mx-auto text-center mb-16">
          <Reveal custom={0} as="span" className="inline-block text-sm font-bold text-teal-deep uppercase tracking-wider mb-4.5">Built responsibly</Reveal>
          <Reveal custom={1}>
            <h2 className="font-display font-medium text-[clamp(2rem,3.6vw,3rem)] leading-tight tracking-tight mb-5">
              Sensitive data.<br /><span className="highlight-underline">Handled seriously.</span>
            </h2>
          </Reveal>
          <Reveal custom={2} className="text-inkSoft text-[1.05rem] leading-relaxed">
            Income, disability status, occupation — this is exactly the data that deserves the most care, grounded in India's DPDP Act.
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <Reveal key={it.num} custom={i} className="bg-white border border-hairline rounded-[20px] p-7 hover:-translate-y-1.5 hover:shadow-md2 hover:border-teal transition-all duration-350">
              <div className="font-mono text-sm text-inkFaint font-semibold mb-4">{it.num}</div>
              <h4 className="font-display text-lg font-medium mb-2">{it.title}</h4>
              <p className="text-sm text-inkSoft leading-relaxed">{it.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
