import { useEffect, useState } from 'react'
import { Copy, Bell, FileText, UserCheck } from 'react-feather'
import AppShell from './AppShell'
import { api } from '../services/api'
import { loadProfile } from '../utils/storage'

export default function DraftPage({ id }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const profile = loadProfile()

  useEffect(() => {
    api
      .createDraft(id, profile)
      .then((r) => setData(r.data))
      .catch((e) => setError(e.message))
  }, [id])

  async function copyDraft() {
    await navigator.clipboard.writeText(data.draft.body)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  async function saveReminder() {
    await api.createReminder({
      phone: profile.phone,
      schemeId: id,
      schemeName: data.scheme.name,
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      note: 'Apply for scheme',
    })

    alert('Reminder saved in backend demo memory')
  }

  return (
    <AppShell
      title="Application draft"
      subtitle="Copy-paste ready draft aur personalized document checklist aapki profile ke basis par generate hua hai."
    >
      {error && <p className="text-red-600 font-semibold">{error}</p>}
      {!data && !error && <p className="font-semibold text-teal-deep">Generating draft...</p>}

      {data && (
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          <section className="space-y-5">
            <div className="rounded-3xl border border-hairline bg-white p-5">
              <p className="text-xs font-bold tracking-widest text-teal-deep uppercase mb-2">
                Selected Scheme
              </p>
              <h2 className="font-display text-2xl font-medium mb-2">{data.scheme.name}</h2>
              <p className="text-inkSoft leading-relaxed">
                {data.scheme.plainLanguage || data.scheme.summary}
              </p>
            </div>

            <div className="rounded-3xl border border-hairline bg-white p-5">
              <h3 className="font-display text-xl font-medium mb-3 flex items-center gap-2">
                <FileText size={20} /> Draft Preview
              </h3>

              <pre className="whitespace-pre-wrap bg-paperAlt border border-hairline rounded-2xl p-5 text-sm leading-relaxed font-body">
                {data.draft.body}
              </pre>

              <p className="text-xs text-inkFaint mt-3">{data.draft.disclaimer}</p>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-hairline bg-white p-5">
              <h3 className="font-display text-xl font-medium mb-3 flex items-center gap-2">
                <UserCheck size={19} /> Applicant summary
              </h3>

              <div className="space-y-2 text-sm text-inkSoft">
                <Row label="Name" value={profile.name || 'Not provided'} />
                <Row label="Age" value={profile.age || 'Not provided'} />
                <Row label="State" value={profile.state || 'Not provided'} />
                <Row label="Income" value={profile.annualIncome ? `₹${profile.annualIncome}` : 'Not provided'} />
                <Row label="Occupation" value={profile.occupation || 'Not provided'} />
                <Row label="Education" value={profile.education || 'Not provided'} />
              </div>
            </div>

            <div className="rounded-2xl border border-hairline bg-white p-5">
              <h3 className="font-display text-xl font-medium mb-3">Document checklist</h3>

              <ul className="space-y-2 text-sm text-inkSoft">
                {(data.draft.checklist || []).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-teal-deep font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={copyDraft}
              className="w-full rounded-full bg-ink text-white px-5 py-3 font-bold inline-flex items-center justify-center gap-2"
            >
              <Copy size={17} />
              {copied ? 'Copied' : 'Copy draft'}
            </button>

            <button
              onClick={saveReminder}
              className="w-full rounded-full border border-hairline px-5 py-3 font-bold hover:border-teal inline-flex items-center justify-center gap-2"
            >
              <Bell size={17} /> Set 7-day reminder
            </button>
          </aside>
        </div>
      )}
    </AppShell>
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