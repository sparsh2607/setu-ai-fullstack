import { useState } from 'react'
import AppShell from './AppShell'
import { api } from '../services/api'
import { saveMatches, saveProfile } from '../utils/storage'

const initial = {
  name: 'Asha Sharma',
  phone: '9999999999',
  age: 20,
  gender: 'female',
  state: 'DELHI',
  district: 'New Delhi',
  annualIncome: 120000,
  occupation: 'student',
  education: 'college',
  disability: false,
  category: 'general',
  area: 'urban',
  familyType: 'low-income',
  language: 'hinglish',
  freeText: 'I am a college student from a low-income family and want support for education, health and housing.',
}

export default function ProfilePage() {
  const [form, setForm] = useState(() => ({
    ...initial,
    ...JSON.parse(localStorage.getItem('setu_profile') || '{}'),
  }))

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
      const profile = {
        ...form,
        age: Number(form.age),
        annualIncome: Number(form.annualIncome),
        disability: Boolean(form.disability),
      }

      const matchProfile = {
        ...profile,
        freeText: `
          ${profile.freeText || ''}
          Occupation: ${profile.occupation}.
          Education: ${profile.education}.
          Category: ${profile.category}.
          Area: ${profile.area}.
          Family type: ${profile.familyType}.
          Gender: ${profile.gender}.
          Disability: ${profile.disability ? 'yes' : 'no'}.
        `,
      }

      saveProfile(profile)
      await api.saveProfile(profile)

      const result = await api.match(matchProfile)
      saveMatches(result.data || [])

      const from = new URLSearchParams(window.location.search).get('from') || 'home'
      window.location.href = `/results?from=${from}`
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppShell
      title="Build your eligibility profile"
      subtitle="Apni details daalo. Setu AI age, state, income, occupation, education, category aur life situation ke basis par matching government schemes dikhayega."
    >
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-5">
        <Input label="Name" value={form.name} onChange={(v) => setField('name', v)} />

        <Input label="Phone / WhatsApp" value={form.phone} onChange={(v) => setField('phone', v)} />

        <Input label="Age" type="number" value={form.age} onChange={(v) => setField('age', v)} />

        <Select
          label="Gender"
          value={form.gender}
          onChange={(v) => setField('gender', v)}
          options={[
            ['female', 'Female'],
            ['male', 'Male'],
            ['other', 'Other'],
          ]}
        />

        <Select
          label="State"
          value={form.state}
          onChange={(v) => setField('state', v)}
          options={[
            ['BIHAR', 'Bihar'],
            ['UTTAR PRADESH', 'Uttar Pradesh'],
            ['DELHI', 'Delhi'],
            ['RAJASTHAN', 'Rajasthan'],
            ['MAHARASHTRA', 'Maharashtra'],
            ['MADHYA PRADESH', 'Madhya Pradesh'],
            ['GUJARAT', 'Gujarat'],
            ['HARYANA', 'Haryana'],
            ['PUNJAB', 'Punjab'],
            ['WEST BENGAL', 'West Bengal'],
            ['KARNATAKA', 'Karnataka'],
            ['TAMIL NADU', 'Tamil Nadu'],
          ]}
        />

        <Input label="District" value={form.district} onChange={(v) => setField('district', v)} />

        <Input
          label="Annual Family Income"
          type="number"
          value={form.annualIncome}
          onChange={(v) => setField('annualIncome', v)}
        />

        <Select
          label="Occupation"
          value={form.occupation}
          onChange={(v) => setField('occupation', v)}
          options={[
            ['student', 'Student'],
            ['unemployed', 'Unemployed'],
            ['daily-wage', 'Daily wage worker'],
            ['worker', 'Worker'],
            ['street-vendor', 'Street vendor'],
            ['self-employed', 'Self employed'],
            ['business-owner', 'Business owner'],
            ['entrepreneur', 'Entrepreneur'],
            ['artisan', 'Artisan / Craft worker'],
            ['farmer', 'Farmer'],
            ['domestic-worker', 'Domestic worker'],
            ['driver', 'Driver'],
            ['retired', 'Retired / Senior citizen'],
            ['homemaker', 'Homemaker'],
          ]}
        />

        <Select
          label="Education Status"
          value={form.education}
          onChange={(v) => setField('education', v)}
          options={[
            ['none', 'No formal education'],
            ['primary', 'Primary school'],
            ['secondary', 'Secondary school'],
            ['college', 'College student'],
            ['graduate', 'Graduate'],
            ['postgraduate', 'Postgraduate'],
          ]}
        />

        <Select
          label="Category"
          value={form.category}
          onChange={(v) => setField('category', v)}
          options={[
            ['general', 'General'],
            ['obc', 'OBC'],
            ['sc', 'SC'],
            ['st', 'ST'],
            ['minority', 'Minority'],
            ['ews', 'EWS'],
          ]}
        />

        <Select
          label="Area"
          value={form.area}
          onChange={(v) => setField('area', v)}
          options={[
            ['urban', 'Urban'],
            ['rural', 'Rural'],
          ]}
        />

        <Select
          label="Family Type"
          value={form.familyType}
          onChange={(v) => setField('familyType', v)}
          options={[
            ['low-income', 'Low-income family'],
            ['middle-income', 'Middle-income family'],
            ['single-parent', 'Single parent family'],
            ['senior-citizen', 'Senior citizen household'],
            ['woman-led', 'Woman-led household'],
            ['student-family', 'Student needing support'],
          ]}
        />

        <Select
          label="Preferred Language"
          value={form.language}
          onChange={(v) => setField('language', v)}
          options={[
            ['hinglish', 'Hinglish'],
            ['hindi', 'Hindi'],
            ['english', 'English'],
          ]}
        />

        <label className="md:col-span-2 flex items-center gap-3 p-4 rounded-2xl bg-paperAlt border border-hairline font-semibold">
          <input
            type="checkbox"
            checked={form.disability}
            onChange={(e) => setField('disability', e.target.checked)}
            className="w-5 h-5 accent-teal"
          />
          Disability status applicable
        </label>

        <label className="md:col-span-2">
          <span className="block text-sm font-bold text-ink mb-2">Tell us your need / life situation</span>
          <textarea
            className="w-full min-h-[120px] rounded-2xl border border-hairline bg-white px-4 py-3 outline-none focus:border-teal"
            value={form.freeText}
            onChange={(e) => setField('freeText', e.target.value)}
            placeholder="Example: I am a student from low-income family. I need scholarship, health support or housing help."
          />
          <p className="mt-2 text-xs text-inkSoft">
            Example: student scholarship, health support, pension, housing, business loan, worker welfare, women support.
          </p>
        </label>

        {error && <p className="md:col-span-2 text-red-600 font-semibold text-sm">{error}</p>}

        <button
          disabled={loading}
          className="md:col-span-2 rounded-full bg-ink text-white font-bold py-4 hover:bg-teal-deep transition-colors disabled:opacity-50"
        >
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
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-hairline bg-white px-4 py-3 outline-none focus:border-teal"
      />
    </label>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <label>
      <span className="block text-sm font-bold text-ink mb-2">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-hairline bg-white px-4 py-3 outline-none focus:border-teal"
      >
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
    </label>
  )
}
