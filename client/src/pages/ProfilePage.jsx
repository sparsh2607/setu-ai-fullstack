import { useState } from 'react'
import AppShell from './AppShell'
import { api } from '../services/api'
import { saveMatches, saveProfile } from '../utils/storage'

const initial = {
  name: 'Rekha Kumari',
  phone: '9999999999',
  age: 36,
  gender: 'female',
  state: 'BIHAR',
  district: 'Patna',
  annualIncome: 180000,
  occupation: 'farmer',
  education: 'secondary',
  disability: false,
  language: 'hinglish',
  freeText: 'I help my family in farming and want support for agriculture, health and housing.',
}

export default function ProfilePage() {
  const [form, setForm] = useState(() => ({ ...initial, ...JSON.parse(localStorage.getItem('setu_profile') || '{}') }))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function setField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const profile = { ...form, age: Number(form.age), annualIncome: Number(form.annualIncome), disability: Boolean(form.disability) }
      saveProfile(profile)
      await api.saveProfile(profile)
      const result = await api.match(profile)
      saveMatches(result.data || [])
      window.location.href = '/results'
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppShell title="Build your eligibility profile" subtitle="Ye same data backend ke /match endpoint par jayega: hard filters + semantic matching + grounded explanation.">
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-5">
        <Input label="Name" value={form.name} onChange={(v) => setField('name', v)} />
        <Input label="Phone / WhatsApp" value={form.phone} onChange={(v) => setField('phone', v)} />
        <Input label="Age" type="number" value={form.age} onChange={(v) => setField('age', v)} />
        <Select label="Gender" value={form.gender} onChange={(v) => setField('gender', v)} options={[['female','Female'], ['male','Male'], ['other','Other']]} />
        <Select label="State" value={form.state} onChange={(v) => setField('state', v)} options={[['BIHAR','Bihar'], ['UTTAR PRADESH','Uttar Pradesh'], ['DELHI','Delhi'], ['RAJASTHAN','Rajasthan'], ['MAHARASHTRA','Maharashtra']]} />
        <Input label="District" value={form.district} onChange={(v) => setField('district', v)} />
        <Input label="Annual Income" type="number" value={form.annualIncome} onChange={(v) => setField('annualIncome', v)} />
        <Select label="Occupation" value={form.occupation} onChange={(v) => setField('occupation', v)} options={[['farmer','Farmer'], ['student','Student'], ['daily-wage','Daily wage worker'], ['street-vendor','Street vendor'], ['self-employed','Self employed'], ['artisan','Artisan'], ['unemployed','Unemployed']]} />
        <Select label="Education" value={form.education} onChange={(v) => setField('education', v)} options={[['none','None'], ['primary','Primary'], ['secondary','Secondary'], ['college','College'], ['graduate','Graduate']]} />
        <Select label="Language" value={form.language} onChange={(v) => setField('language', v)} options={[['hinglish','Hinglish'], ['hindi','Hindi'], ['english','English']]} />
        <label className="md:col-span-2 flex items-center gap-3 p-4 rounded-2xl bg-paperAlt border border-hairline font-semibold">
          <input type="checkbox" checked={form.disability} onChange={(e) => setField('disability', e.target.checked)} className="w-5 h-5 accent-teal" />
          Disability status applicable
        </label>
        <label className="md:col-span-2">
          <span className="block text-sm font-bold text-ink mb-2">Free text / life situation</span>
          <textarea
            className="w-full min-h-[120px] rounded-2xl border border-hairline bg-white px-4 py-3 outline-none focus:border-teal"
            value={form.freeText}
            onChange={(e) => setField('freeText', e.target.value)}
          />
        </label>
        {error && <p className="md:col-span-2 text-red-600 font-semibold text-sm">{error}</p>}
        <button disabled={loading} className="md:col-span-2 rounded-full bg-ink text-white font-bold py-4 hover:bg-teal-deep transition-colors disabled:opacity-50">
          {loading ? 'Matching schemes...' : 'Find matching schemes'}
        </button>
      </form>
    </AppShell>
  )
}

function Input({ label, value, onChange, type = 'text' }) {
  return (
    <label>
      <span className="block text-sm font-bold text-ink mb-2">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-hairline bg-white px-4 py-3 outline-none focus:border-teal" />
    </label>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <label>
      <span className="block text-sm font-bold text-ink mb-2">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-hairline bg-white px-4 py-3 outline-none focus:border-teal">
        {options.map(([v, text]) => <option key={v} value={v}>{text}</option>)}
      </select>
    </label>
  )
}
