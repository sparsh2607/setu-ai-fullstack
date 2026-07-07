import { useEffect, useState } from 'react'
import AppShell from './AppShell'
import { api } from '../services/api'

export default function SchemeDetailPage({ id }) {
  const [scheme, setScheme] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getScheme(id).then((r) => setScheme(r.data)).catch((e) => setError(e.message))
  }, [id])

  return (
    <AppShell title="Scheme detail" subtitle="Official link, benefits, eligibility hints and documents in one clean page.">
      {error && <p className="text-red-600 font-semibold">{error}</p>}
      {!scheme && !error && <p className="font-semibold text-teal-deep">Loading scheme...</p>}
      {scheme && (
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-soft text-teal-deep">{scheme.category}</span>
            <h2 className="font-display text-3xl font-medium mt-4">{scheme.name}</h2>
            <p className="text-inkSoft mt-3 leading-relaxed max-w-3xl">{scheme.summary}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Info title="Benefits" items={scheme.benefits || []} />
            <Info title="Documents" items={scheme.documents || []} />
          </div>
          <div className="bg-paperAlt rounded-2xl p-5 border border-hairline">
            <p><b>State applicability:</b> {scheme.states?.join(', ')}</p>
            <p><b>Age range:</b> {scheme.age?.min} - {scheme.age?.max}</p>
            <p><b>Income max:</b> {scheme.incomeMax ? `₹${scheme.incomeMax}` : 'No fixed limit in demo data'}</p>
            <p><b>Last verified:</b> {scheme.lastVerifiedDate}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => { window.location.href = `/draft/${scheme.id}` }} className="rounded-full bg-ink text-white px-6 py-3 font-bold">Generate draft</button>
            <a href={scheme.applicationUrl} target="_blank" rel="noreferrer" className="rounded-full border border-hairline px-6 py-3 font-bold hover:border-teal">Open official portal</a>
          </div>
        </div>
      )}
    </AppShell>
  )
}

function Info({ title, items }) {
  return (
    <div className="rounded-2xl border border-hairline p-5">
      <h3 className="font-display text-xl font-medium mb-3">{title}</h3>
      <ul className="space-y-2 text-inkSoft">
        {items.map((item) => <li key={item} className="flex gap-2"><span className="text-teal-deep">✓</span>{item}</li>)}
      </ul>
    </div>
  )
}
