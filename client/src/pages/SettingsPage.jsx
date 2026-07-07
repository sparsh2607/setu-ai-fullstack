import { useState } from 'react'
import AppShell from './AppShell'
import { api, API_BASE_URL } from '../services/api'
import { clearSetuData, loadProfile } from '../utils/storage'

export default function SettingsPage() {
  const [message, setMessage] = useState('')
  const profile = loadProfile()

  async function deleteData() {
    try {
      const id = profile.phone || profile.email || 'demo-user'
      await api.deleteUserData(id)
      clearSetuData()
      setMessage('Local + backend demo data delete ho gaya.')
    } catch (e) {
      setMessage(e.message)
    }
  }

  return (
    <AppShell title="Settings & backend status" subtitle="API base URL, privacy delete, and local demo data controls.">
      <div className="space-y-5">
        <div className="bg-paperAlt rounded-2xl p-5 border border-hairline">
          <p className="text-sm text-inkSoft">Current API base URL</p>
          <code className="font-mono text-sm font-bold">{API_BASE_URL}</code>
        </div>
        <button onClick={deleteData} className="rounded-full bg-ink text-white px-6 py-3 font-bold">Delete my demo data</button>
        {message && <p className="font-semibold text-teal-deep">{message}</p>}
      </div>
    </AppShell>
  )
}
