import { useEffect, useState } from 'react'
import { FileText, RefreshCw } from 'lucide-react'
import AppShell from './AppShell'
import { api } from '../services/api'
import { loadMatches, loadProfile, saveMatches } from '../utils/storage'

export default function ResultsPage() {
  const [matches, setMatches] = useState(loadMatches())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const profile = loadProfile()

  useEffect(() => {
    if (!matches.length && Object.keys(profile).length) recheck()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function recheck() {
    setLoading(true)
    setError('')
    try {
      const result = await api.match(profile)
      const data = result.data || []
      setMatches(data)
      saveMatches(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppShell
      title="Your scheme matches"
      subtitle="Backend ne aapki profile, state, income, occupation aur life situation ke hisab se eligible government schemes return ki hain."
      action={<button onClick={recheck} className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-4 py-2 text-sm font-bold"><RefreshCw size={16} /> Re-check</button>}
    >
      {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}
      {loading && <p className="font-semibold text-teal-deep mb-4">Matching in progress...</p>}
      <div className="grid gap-4">
        {matches.map((match) => (
          <article key={match.scheme.id} className="rounded-3xl border border-hairline p-5 bg-white hover:shadow-md2 transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${match.score >= 80 ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-amber-soft text-amber-deep'}`}>{match.score}% match</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-paperAlt text-inkSoft">{match.scheme.category}</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-soft text-teal-deep">Verified {match.scheme.lastVerifiedDate}</span>
                </div>
                <h2 className="font-display text-2xl font-medium">{match.scheme.name}</h2>
                <p className="text-inkSoft mt-2 leading-relaxed">{match.scheme.plainLanguage || match.scheme.summary}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => { window.location.href = `/schemes/${match.scheme.id}` }} className="rounded-full border border-hairline px-4 py-2 text-sm font-bold hover:border-teal">Details</button>
                <button onClick={() => { window.location.href = `/draft/${match.scheme.id}` }} className="rounded-full bg-ink text-white px-4 py-2 text-sm font-bold inline-flex items-center gap-2"><FileText size={16} /> Draft</button>
              </div>
            </div>
            <div className="mt-4 bg-paperAlt rounded-2xl p-4">
              <b>Why you match:</b> <span className="text-inkSoft">{match.explanation.text}</span>
              {!!match.explanation.pending?.length && <p className="text-sm text-amber-deep mt-2">Pending checks: {match.explanation.pending.join(', ')}</p>}
            </div>
          </article>
        ))}
        {!matches.length && !loading && (
          <div className="text-center p-10 bg-paperAlt rounded-3xl">
            <p className="font-semibold mb-4">No matches yet. Please complete your profile.</p>
            <button onClick={() => { window.location.href = '/profile' }} className="rounded-full bg-ink text-white px-6 py-3 font-bold">Go to profile</button>
          </div>
        )}
      </div>
    </AppShell>
  )
}
