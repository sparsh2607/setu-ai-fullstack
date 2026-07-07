import { Users, Sparkles, FileText, MessageCircle, Clock, Wifi, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import TiltCard from './TiltCard'

export default function Features() {
  return (
    <section id="features" className="py-28 md:py-32 px-5 md:px-14">
      <div className="max-w-[720px] mx-auto text-center mb-16 md:mb-20">
        <Reveal custom={0} as="span" className="inline-block text-sm font-bold text-teal-deep uppercase tracking-wider mb-4.5">What you get</Reveal>
        <Reveal custom={1}>
          <h2 className="font-display font-medium text-[clamp(2rem,3.6vw,3rem)] leading-tight tracking-tight mb-5">
            Discovery is easy.<br /><span className="highlight-underline">Applying is the hard part.</span>
          </h2>
        </Reveal>
        <Reveal custom={2} className="text-inkSoft text-[1.05rem] leading-relaxed">
          Setu closes the gap other platforms leave open — from "you're eligible" to a filled, submittable draft.
        </Reveal>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(220px,auto)] gap-5">

        <Reveal custom={0} className="md:col-span-2 md:row-span-2">
          <TiltCard className="relative h-full bg-white rounded-[26px] p-8 border border-hairline overflow-hidden hover:shadow-lg2 hover:border-transparent transition-shadow duration-400 group">
            <div className="absolute -top-[40%] -right-[30%] w-[220px] h-[220px] rounded-full bg-amber/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-12 h-12 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center mb-5 transition-transform duration-400 group-hover:scale-110 group-hover:-rotate-6">
              <Users size={22} />
            </div>
            <h3 className="font-display text-2xl font-medium mb-2.5">Personalized matching</h3>
            <p className="text-inkSoft text-[0.92rem] leading-relaxed max-w-lg">
              Hard filters catch the non-negotiables. Semantic RAG understands what a rigid form never could —
              "I help my father farm" gets you agricultural schemes, not a dead end.
            </p>
            <div className="flex items-center gap-3.5 mt-7 flex-wrap">
              <div className="font-mono text-xs px-3.5 py-2 rounded-lg bg-paperAlt text-inkSoft border border-hairline">"my father is a small farmer"</div>
              <ArrowRight size={18} className="text-teal shrink-0" />
              <div className="font-mono text-xs px-3.5 py-2 rounded-lg bg-teal-soft text-teal-deep font-semibold border border-teal/20">PM Kisan · 94% match</div>
            </div>
          </TiltCard>
        </Reveal>

        <Reveal custom={1}>
          <TiltCard className="h-full bg-white rounded-[26px] p-8 border border-hairline hover:shadow-lg2 hover:border-transparent transition-shadow duration-400 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-soft text-amber-deep flex items-center justify-center mb-5 transition-transform duration-400 group-hover:scale-110 group-hover:-rotate-6">
              <Sparkles size={22} />
            </div>
            <h3 className="font-display text-xl font-medium mb-2.5">"Why you match"</h3>
            <p className="text-inkSoft text-[0.92rem] leading-relaxed">No black-box AI. Every result comes with plain-language reasoning grounded in the actual scheme record.</p>
          </TiltCard>
        </Reveal>

        <Reveal custom={2}>
          <TiltCard className="h-full bg-white rounded-[26px] p-8 border border-hairline hover:shadow-lg2 hover:border-transparent transition-shadow duration-400 group">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF1F6] text-ink flex items-center justify-center mb-5 transition-transform duration-400 group-hover:scale-110 group-hover:-rotate-6">
              <FileText size={22} />
            </div>
            <h3 className="font-display text-xl font-medium mb-2.5">Copy-paste drafts</h3>
            <p className="text-inkSoft text-[0.92rem] leading-relaxed">From "I found a scheme" to "I can apply" — a filled, ready draft plus a personalized document checklist.</p>
          </TiltCard>
        </Reveal>

        <Reveal custom={3} className="md:col-span-2">
          <TiltCard className="relative h-full bg-white rounded-[26px] p-8 border border-hairline overflow-hidden hover:shadow-lg2 hover:border-transparent transition-shadow duration-400 group">
            <div className="absolute -top-[40%] -right-[20%] w-[220px] h-[220px] rounded-full bg-teal/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-12 h-12 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center mb-5 transition-transform duration-400 group-hover:scale-110 group-hover:-rotate-6">
              <MessageCircle size={22} />
            </div>
            <h3 className="font-display text-xl font-medium mb-2.5">Lives on WhatsApp</h3>
            <p className="text-inkSoft text-[0.92rem] leading-relaxed mb-5">Zero app download. Message in Hinglish, get real matches back in seconds.</p>
            <div className="flex flex-col gap-2 max-w-sm">
              <div className="self-end bg-[#DCF8C6] text-[#1a2e1a] text-sm px-3.5 py-2.5 rounded-2xl rounded-br-md">मैं किसान हूं, UP में जमीन है</div>
              <div className="bg-white border border-hairline text-sm px-3.5 py-2.5 rounded-2xl rounded-bl-md">
                <b>3 matches found</b><br />PM-Kisan · PMFBY · Soil Health Card<br />
                <span className="text-teal-deep font-semibold text-xs">View full details →</span>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <Reveal custom={4}>
          <TiltCard className="h-full bg-white rounded-[26px] p-8 border border-hairline hover:shadow-lg2 hover:border-transparent transition-shadow duration-400 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-soft text-amber-deep flex items-center justify-center mb-5 transition-transform duration-400 group-hover:scale-110 group-hover:-rotate-6">
              <Clock size={22} />
            </div>
            <h3 className="font-display text-xl font-medium mb-2.5">Life-event re-matching</h3>
            <p className="text-inkSoft text-[0.92rem] leading-relaxed">New job, marriage, new baby — your profile update auto-triggers a re-check, surfacing what's newly unlocked.</p>
          </TiltCard>
        </Reveal>

        <Reveal custom={5}>
          <TiltCard className="h-full bg-white rounded-[26px] p-8 border border-hairline hover:shadow-lg2 hover:border-transparent transition-shadow duration-400 group">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF1F6] text-ink flex items-center justify-center mb-5 transition-transform duration-400 group-hover:scale-110 group-hover:-rotate-6">
              <Wifi size={22} />
            </div>
            <h3 className="font-display text-xl font-medium mb-2.5">Works offline</h3>
            <p className="text-inkSoft text-[0.92rem] leading-relaxed">PWA-installable. Previously matched results stay visible on poor or intermittent rural connections.</p>
          </TiltCard>
        </Reveal>

      </div>
    </section>
  )
}
