import { MessageCircle } from 'lucide-react'
import Reveal from './Reveal'
import { MagneticButton } from './MagneticButton'
import { goToEligibilityFlow, openWhatsAppMessage } from '../utils/navigation'

export default function FinalCTA() {
  return (
    <section className="relative text-center pt-24 pb-32 px-5 md:px-14">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-full bg-[radial-gradient(ellipse_at_top,rgba(13,148,136,0.08),transparent_60%)] pointer-events-none" />
      <div className="relative max-w-[680px] mx-auto">
        <Reveal custom={0}>
          <h2 className="font-display font-medium text-[clamp(2.1rem,4.5vw,3.2rem)] leading-tight tracking-tight mb-4.5">
            Ready to find out<br />what you already qualify for?
          </h2>
        </Reveal>
        <Reveal custom={1} className="text-inkSoft text-lg mb-9">Takes under two minutes. No app to install.</Reveal>
        <Reveal custom={2} className="flex gap-3.5 justify-center flex-wrap">
          <MagneticButton variant="primary" onClick={() =>  goToEligibilityFlow('home') }>Check my eligibility</MagneticButton>
          <MagneticButton variant="outline" icon={false} onClick={openWhatsAppMessage}>
            <span className="flex items-center gap-2">
              <MessageCircle size={18} />
              Message us on WhatsApp
            </span>
          </MagneticButton>
        </Reveal>
        <p className="mt-4 text-xs md:text-sm text-inkFaint max-w-xl mx-auto leading-relaxed">
          Demo note: first send{' '}
          <span className="font-semibold text-ink">join ball-military</span>{' '}
          to{' '}
          <span className="font-semibold text-ink">+1 415 523 8886</span>, then send{' '}
          <span className="font-semibold text-ink">hi</span>{' '}
          to use the Setu AI WhatsApp bot.
        </p>
      </div>
    </section>
  )
}
