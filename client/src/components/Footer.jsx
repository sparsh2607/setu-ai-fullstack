import { MessageCircle, ArrowRight } from 'lucide-react'
import { goToEligibilityFlow, openWhatsAppMessage } from '../utils/navigation'

function goHome() {
  window.location.href = '/'
}

function goToSection(id) {
  window.location.href = `/#${id}`
}

function goDashboard() {
  window.location.href = '/dashboard'
}

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-paper px-5 py-10 md:py-12">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <button
              onClick={goHome}
              className="mb-4 flex items-center gap-3 text-left"
            >
              <span className="relative flex h-8 w-8 items-center justify-center">
                <span className="absolute h-5 w-5 rounded-t-full border-[3px] border-b-0 border-teal" />
                <span className="absolute right-1 top-3 h-2 w-2 rounded-full bg-amber" />
              </span>

              <span className="font-display text-xl font-semibold text-ink">
                Setu <span className="text-teal">AI</span>
              </span>
            </button>

            <p className="max-w-sm text-sm leading-relaxed text-inkFaint">
              Bridging citizens to government schemes they deserve through
              simple eligibility discovery and WhatsApp assistance.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-inkFaint">
              Explore
            </h3>

            <div className="space-y-3 text-sm font-medium text-inkSoft">
              <button onClick={goHome} className="block hover:text-teal-deep">
                Home
              </button>

              <button
                onClick={() => goToSection('pipeline')}
                className="block hover:text-teal-deep"
              >
                How it works
              </button>

              <button
                onClick={() => goToSection('features')}
                className="block hover:text-teal-deep"
              >
                Features
              </button>

              <button onClick={goDashboard} className="block hover:text-teal-deep">
                Dashboard
              </button>
            </div>
          </div>

          {/* Actions */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-inkFaint">
              Actions
            </h3>

            <div className="space-y-3 text-sm font-medium text-inkSoft">
              <button
                onClick={() => goToEligibilityFlow('home')}
                className="flex items-center gap-2 hover:text-teal-deep"
              >
                Check eligibility <ArrowRight size={14} />
              </button>

              <button
                onClick={openWhatsAppMessage}
                className="flex items-center gap-2 hover:text-teal-deep"
              >
                WhatsApp bot <MessageCircle size={14} />
              </button>
            </div>

            <p className="mt-4 max-w-xs text-xs leading-relaxed text-inkFaint">
              Demo: first send{' '}
              <span className="font-semibold text-ink">join ball-military</span>{' '}
              to{' '}
              <span className="font-semibold text-ink">+1 415 523 8886</span>.
            </p>
          </div>

          {/* Trust */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-inkFaint">
              Trust
            </h3>

            <div className="space-y-3 text-sm font-medium text-inkSoft">
              <button
                onClick={() => window.location.href = '/consent?from=home'}
                className="block hover:text-teal-deep"
              >
                Privacy & consent
              </button>

              <button
                onClick={() => goToSection('trust')}
                className="block hover:text-teal-deep"
              >
                Security
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-hairline pt-6">
          <p className="w-full text-center text-xs text-inkFaint">
            © 2026 Setu AI. Built by<b> Sparsh Gahoi</b> & <b>Yash Saxena</b> for Lenovo Leap Hackathon 2026.
          </p>
        </div>
      </div>
    </footer>
  )
}
