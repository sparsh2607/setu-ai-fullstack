import { useEffect, useState } from 'react'
import AppShell from './AppShell'
import { api } from '../services/api'

export default function SchemeDetailPage({ id }) {
  const [scheme, setScheme] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getScheme(id).then((r) => setScheme(r.data)).catch((e) => setError(e.message))
  }, [id])

  const documents = getDocuments(scheme)
  const benefits = getBenefits(scheme)
  const eligibility = getEligibility(scheme)
  const steps = getApplySteps(scheme)

  return (
    <AppShell
      title="Scheme detail"
      subtitle="Eligibility, benefits, required documents aur application guidance ek clean page par."
    >
      {error && <p className="text-red-600 font-semibold">{error}</p>}
      {!scheme && !error && <p className="font-semibold text-teal-deep">Loading scheme...</p>}

      {scheme && (
        <div className="space-y-6">
          <section className="rounded-3xl border border-hairline bg-white p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-soft text-teal-deep">
                    {scheme.category || 'Government Scheme'}
                  </span>

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-paperAlt text-inkSoft">
                    Verified {scheme.lastVerifiedDate || scheme.last_verified_date || '2026-07-01'}
                  </span>
                </div>

                <h2 className="font-display text-3xl font-medium mb-3">{scheme.name}</h2>

                <p className="text-inkSoft leading-relaxed max-w-3xl">
                  {scheme.plainLanguage || scheme.summary}
                </p>
              </div>

              <button
                onClick={() => {
                  window.location.href = `/draft/${scheme.id}`
                }}
                className="rounded-full bg-ink text-white px-6 py-3 font-bold shrink-0"
              >
                Generate draft
              </button>
            </div>
          </section>

          <div className="grid lg:grid-cols-[1fr_340px] gap-6">
            <main className="space-y-6">
              <InfoCard title="Scheme overview">
                <p className="text-inkSoft leading-relaxed">
                  {scheme.summary ||
                    'This scheme may provide government support based on the applicant profile and eligibility conditions.'}
                </p>
              </InfoCard>

              <InfoCard title="Who can apply">
                <ul className="space-y-2 text-inkSoft">
                  {eligibility.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-teal-deep font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>

              <InfoCard title="Benefits">
                <ul className="space-y-2 text-inkSoft">
                  {benefits.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-teal-deep font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>

              <InfoCard title="How to apply">
                <ol className="space-y-2 text-inkSoft list-decimal list-inside">
                  {steps.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </InfoCard>
            </main>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-hairline bg-white p-5">
                <h3 className="font-display text-xl font-medium mb-3">Required documents</h3>

                <ul className="space-y-2 text-sm text-inkSoft">
                  {documents.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-teal-deep font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-hairline bg-paperAlt p-5">
                <h3 className="font-display text-xl font-medium mb-3">Eligibility snapshot</h3>

                <div className="space-y-2 text-sm text-inkSoft">
                  <Row label="States" value={(scheme.states || ['ALL']).join(', ')} />
                  <Row
                    label="Age range"
                    value={
                      scheme.age
                        ? `${scheme.age.min || 0} - ${scheme.age.max || 'No limit'}`
                        : 'Depends on scheme'
                    }
                  />
                  <Row
                    label="Income limit"
                    value={
                      scheme.incomeMax
                        ? `₹${Number(scheme.incomeMax).toLocaleString('en-IN')}`
                        : 'No fixed limit in demo data'
                    }
                  />
                  <Row label="Category" value={scheme.category || 'General'} />
                </div>
              </div>

              <div className="rounded-2xl border border-hairline bg-white p-5">
                <h3 className="font-display text-xl font-medium mb-3">Important note</h3>
                <p className="text-sm text-inkSoft leading-relaxed">
                  Setu AI eligibility matching is an assistance layer. Final approval depends on the official
                  scheme rules, documents, and verification by the concerned department.
                </p>
              </div>

              {scheme.applicationUrl && (
                <a
                  href={scheme.applicationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center rounded-full border border-hairline px-6 py-3 font-bold hover:border-teal"
                >
                  Open official portal
                </a>
              )}
            </aside>
          </div>
        </div>
      )}
    </AppShell>
  )
}

function InfoCard({ title, children }) {
  return (
    <section className="rounded-3xl border border-hairline bg-white p-6">
      <h3 className="font-display text-2xl font-medium mb-4">{title}</h3>
      {children}
    </section>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-hairline pb-2">
      <span className="font-bold text-ink">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  )
}

function getDocuments(scheme) {
  if (!scheme) return []

  return (
    scheme.documentChecklist ||
    scheme.requiredDocuments ||
    scheme.documents || [
      'Aadhaar card',
      'Income certificate',
      'Address proof',
      'Bank account details',
      'Passport size photo',
    ]
  )
}

function getBenefits(scheme) {
  if (!scheme) return []

  if (scheme.benefits?.length) return scheme.benefits

  return [
    scheme.plainLanguage || scheme.summary || 'Eligible users may receive government support.',
    'Reduces confusion by showing scheme-specific eligibility and document guidance.',
  ]
}

function getEligibility(scheme) {
  if (!scheme) return []

  const items = []

  if (scheme.states?.includes('ALL')) {
    items.push('Available across India or multiple states')
  } else if (scheme.states?.length) {
    items.push(`Applicable in: ${scheme.states.join(', ')}`)
  }

  if (scheme.age) {
    items.push(`Applicant age should be between ${scheme.age.min || 0} and ${scheme.age.max || 'no upper limit'}`)
  }

  if (scheme.incomeMax) {
    items.push(`Annual family income should generally be up to ₹${Number(scheme.incomeMax).toLocaleString('en-IN')}`)
  }

  if (scheme.occupations?.length && !scheme.occupations.includes('ALL')) {
    items.push(`Relevant for: ${scheme.occupations.join(', ')}`)
  }

  if (!items.length) {
    items.push('Eligibility depends on official scheme rules and applicant documents')
  }

  return items
}

function getApplySteps(scheme) {
  return [
    'Check your eligibility and required documents.',
    'Prepare Aadhaar, income proof, address proof and scheme-specific documents.',
    'Use Setu AI draft as a starting point for your application.',
    scheme?.applicationUrl
      ? 'Open the official portal and complete the final submission.'
      : 'Visit the official department portal or nearest government service centre for final submission.',
  ]
}
