import { useEffect, useState } from 'react'
import AppShell from './AppShell'
import { api } from '../services/api'
import { loadProfile } from '../utils/storage'

export default function DraftPage({ id }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const profile = loadProfile()

  useEffect(() => {
    api.createDraft(id, profile).then((r) => setData(r.data)).catch((e) => setError(e.message))
  }, [id])

  async function copyDraft() {
    await navigator.clipboard.writeText(data.draft.body)
    alert('Draft copied')
  }

  async function saveReminder() {
    await api.createReminder({ phone: profile.phone, schemeId: id, schemeName: data.scheme.name, dueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10), note: 'Apply for scheme' })
    alert('Reminder saved in backend demo memory')
  }

  return (
    <AppShell title="Application draft" subtitle="Copy-paste ready draft and personalized document checklist generated from your profile.">
      {error && <p className="text-red-600 font-semibold">{error}</p>}
      {!data && !error && <p className="font-semibold text-teal-deep">Generating draft...</p>}
      {data && (
        <div className="grid lg:grid-cols-[1fr_330px] gap-6">
          <div>
            <h2 className="font-display text-2xl font-medium mb-3">{data.draft.title}</h2>
            <pre className="whitespace-pre-wrap bg-paperAlt border border-hairline rounded-2xl p-5 text-sm leading-relaxed font-body">{data.draft.body}</pre>
            <p className="text-xs text-inkFaint mt-3">{data.draft.disclaimer}</p>
          </div>
          <aside className="space-y-4">
            <div className="rounded-2xl border border-hairline p-5">
              <h3 className="font-display text-xl font-medium mb-3">Document checklist</h3>
              <ul className="space-y-2 text-sm text-inkSoft">
                {data.draft.checklist.map((item) => <li key={item} className="flex gap-2"><span className="text-teal-deep">✓</span>{item}</li>)}
              </ul>
            </div>
            <button onClick={copyDraft} className="w-full rounded-full bg-ink text-white px-5 py-3 font-bold">Copy draft</button>
            <button onClick={saveReminder} className="w-full rounded-full border border-hairline px-5 py-3 font-bold hover:border-teal">Set 7-day reminder</button>
          </aside>
        </div>
      )}
    </AppShell>
  )
}
