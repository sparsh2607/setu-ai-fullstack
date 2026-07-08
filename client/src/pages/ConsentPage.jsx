import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import AppShell from './AppShell'
import { api } from '../services/api'
import { clearSetuData } from '../utils/storage'

export default function ConsentPage() {
  const [accepted, setAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const params = new URLSearchParams(window.location.search)
  const from = params.get('from') || 'home'
  const mode = params.get('mode')
  const isNewProfile = mode === 'new-profile'
  const cancelHref = from === 'dashboard' ? '/dashboard' : '/'

  async function continueNext() {
    if (!accepted) return
    setLoading(true)
    setError('')
    try {
      await api.acceptConsent({ accepted: true })
      localStorage.setItem('setu_consent', 'true')
      if (isNewProfile) {
          clearSetuData()
      }
      window.location.href = `/profile?from=${from}${isNewProfile ? '&mode=new-profile' : ''}`

    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppShell title="Privacy & consent" subtitle="Setu AI income, occupation, state, disability and other profile data only for scheme matching, draft generation and checklist personalization.">
      <div className="grid md:grid-cols-[1fr_340px] gap-8">
        <div className="space-y-4 text-inkSoft leading-relaxed">
          <div className="p-5 rounded-2xl bg-teal-soft text-teal-deep border border-teal/20 flex gap-3">
            <ShieldCheck className="shrink-0" />
            <p className="font-semibold">Your text is treated as data, not instruction. The AI explanation is grounded only in retrieved scheme records.</p>
          </div>
          <p><b className="text-ink">We collect:</b> age, state, income bracket, occupation, education, disability status, language preference and optional free text.</p>
          <p><b className="text-ink">We use it for:</b> hard eligibility filtering, semantic scheme retrieval, “why you match” explanation, application draft and document checklist.</p>
          <p><b className="text-ink">Deletion:</b> you can delete demo data from Settings. Backend has a deletion endpoint ready for Mongo mode.</p>
          {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}
        </div>
        <div className="bg-paperAlt rounded-2xl p-5 border border-hairline h-fit">
          <label className="flex gap-3 items-start text-sm font-semibold leading-relaxed cursor-pointer">
            <input className="mt-1 w-5 h-5 accent-teal" type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
            I agree to let Setu AI use my profile data for eligibility matching, application draft and document checklist generation.
          </label>
          {isNewProfile && (
              <div className="rounded-2xl border border-amber-200 bg-amber-soft/70 p-4 mb-5 text-sm text-inkSoft">
                You are about to create a new profile. Your current saved profile will stay safe unless you continue.
              </div>
            )}
          <div className="flex flex-col sm:flex-row gap-3">
            {isNewProfile && (
              <button
                type="button"
                onClick={() => {
                  window.location.href = cancelHref
                }}
                className="w-full rounded-full border border-hairline bg-white text-ink font-bold py-3.5 hover:border-teal transition-colors"
              >
                Cancel
              </button>
            )}

            <button
              onClick={continueNext}
              disabled={!accepted || loading}
              className="w-full rounded-full bg-ink text-white font-bold py-3.5 disabled:opacity-40 hover:bg-teal-deep transition-colors"
            >
              {loading ? 'Saving...' : isNewProfile ? 'Continue with new profile' : 'Continue to profile'}
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
