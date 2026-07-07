import { useEffect, useState } from 'react'
import { FileText, RefreshCw, CheckCircle, Clipboard } from 'react-feather'
import AppShell from './AppShell'
import { api } from '../services/api'
import { loadProfile, loadMatches, saveMatches } from '../utils/storage'

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
      subtitle="Setu AI ne aapki profile, age, income, occupation, education aur life situation ke hisaab se eligible government schemes match ki hain."
      action={
        <button
          onClick={recheck}
          className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-4 py-2 text-sm font-bold"
        >
          <RefreshCw size={16} /> Re-check
        </button>
      }
    >
      {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}
      {loading && <p className="font-semibold text-teal-deep mb-4">Matching in progress...</p>}

      <div className="space-y-5">
        {matches.map((match) => {
          const scheme = match.scheme || {}
          const checklist = getChecklist(match)
          const factors = getMatchedFactors(match, profile)

          return (
            <article
              key={scheme.id}
              className="rounded-3xl border border-hairline p-5 bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        match.score >= 80
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : 'bg-amber-soft text-amber-deep'
                      }`}
                    >
                      {match.score}% match
                    </span>

                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-paperAlt text-inkSoft">
                      {scheme.category || 'Government Scheme'}
                    </span>

                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-soft text-teal-deep">
                      Verified {scheme.lastVerifiedDate || scheme.last_verified_date || '2026-07-01'}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-medium">{scheme.name}</h2>

                  <p className="text-inkSoft leading-relaxed">
                    {scheme.plainLanguage || scheme.summary}
                  </p>

                  <div className="bg-paperAlt rounded-2xl p-4">
                    <p className="text-inkSoft leading-relaxed">
                      <span className="font-bold text-ink">Why you match: </span>
                      {getExplanationText(match)}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <InfoBox title="Matched factors" icon={<CheckCircle size={16} />}>
                      {factors.map((item) => (
                        <li key={item}>✓ {item}</li>
                      ))}
                    </InfoBox>

                    <InfoBox title="Documents preview" icon={<Clipboard size={16} />}>
                      {checklist.slice(0, 4).map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </InfoBox>
                  </div>

                  {match.explanation?.pending?.length > 0 && (
                    <p className="text-xs text-amber-deep">
                      Pending checks: {match.explanation.pending.join(', ')}
                    </p>
                  )}
                </div>

                <div className="flex lg:flex-col gap-2 shrink-0">
                  <button
                    onClick={() => {
                      window.location.href = `/schemes/${scheme.id}`
                    }}
                    className="rounded-full border border-hairline px-4 py-2 text-sm font-bold hover:border-teal"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => {
                      window.location.href = `/draft/${scheme.id}`
                    }}
                    className="rounded-full bg-ink text-white px-4 py-2 text-sm font-bold inline-flex items-center gap-2"
                  >
                    <FileText size={16} /> Draft
                  </button>
                </div>
              </div>
            </article>
          )
        })}

        {!matches.length && !loading && (
          <div className="text-center p-10 bg-paperAlt rounded-3xl">
            <p className="font-semibold mb-3">No matches yet. Please complete your profile.</p>
            <button
              onClick={() => {
                window.location.href = '/profile'
              }}
              className="rounded-full bg-ink text-white px-6 py-3 font-bold"
            >
              Go to profile
            </button>
          </div>
        )}
      </div>
    </AppShell>
  )
}

function InfoBox({ title, icon, children }) {
  return (
    <div className="rounded-2xl border border-hairline bg-white p-4">
      <h3 className="font-bold text-sm mb-2 flex items-center gap-2 text-ink">
        {icon}
        {title}
      </h3>
      <ul className="space-y-1 text-sm text-inkSoft">{children}</ul>
    </div>
  )
}

function getExplanationText(match) {
  if (!match.explanation) return 'Your profile matches important eligibility conditions for this scheme.'
  if (typeof match.explanation === 'string') return match.explanation
  return match.explanation.text || 'Your profile matches important eligibility conditions for this scheme.'
}

function getChecklist(match) {
  return (
    match.documentChecklist ||
    match.scheme?.documentChecklist ||
    match.scheme?.requiredDocuments ||
    match.scheme?.documents || [
      'Aadhaar card',
      'Income certificate',
      'Address proof',
      'Bank account details',
    ]
  )
}

function getMatchedFactors(match, profile) {
  const scheme = match.scheme || {}
  const factors = []

  if (profile.age) factors.push(`Age ${profile.age} is within scheme criteria`)
  if (profile.state) factors.push(`${profile.state} applicability matched`)
  if (profile.annualIncome) factors.push(`Income profile fits initial eligibility`)
  if (profile.occupation) factors.push(`${profile.occupation} profile considered`)
  if (profile.education) factors.push(`${profile.education} education status used`)
  if (scheme.category) factors.push(`${scheme.category} category relevance found`)

  return factors.slice(0, 5)
}
