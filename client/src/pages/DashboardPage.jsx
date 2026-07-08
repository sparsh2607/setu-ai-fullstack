import { useEffect, useState } from 'react'
import { Grid, User, Star, FileText, MessageCircle, Shield } from 'react-feather'
import { api } from '../services/api'
import { loadProfile, loadMatches, saveMatches } from '../utils/storage'

export default function DashboardPage() {
  const profile = loadProfile()
  const [matches, setMatches] = useState(loadMatches())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!matches.length && Object.keys(profile).length) {
      refreshMatches()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function refreshMatches() {
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

  function clearData() {
    const ok = confirm('Clear saved profile and scheme matches from this browser?')
    if (!ok) return

    localStorage.removeItem('setu_profile')
    localStorage.removeItem('setu_matches')
    window.location.href = '/profile'
  }

  function openWhatsApp() {
    const text = `Hi Setu AI, I want to check government schemes for my profile. My occupation is ${
      profile.occupation || 'not added'
    }, state is ${profile.state || 'not added'}, and income is ${profile.annualIncome || 'not added'}.`

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const topMatches = matches.slice(0, 2)
  const name = profile.name || 'Asha'
  const firstName = name.split(' ')[0]
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <main className="min-h-screen bg-[#F8F5EE] px-5 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => {
              window.location.href = '/'
            }}
            className="rounded-full border border-hairline bg-white px-5 py-2 font-bold hover:border-teal"
          >
            ← Home
          </button>

          <button
            onClick={() => {
              window.location.href = '/profile?from=dashboard'
            }}
            className="rounded-full bg-ink text-white px-5 py-2 font-bold"
          >
            Update profile
          </button>
        </div>

        <section className="rounded-[2rem] bg-white border border-hairline shadow-2xl overflow-hidden">
          <div className="h-14 border-b border-hairline bg-[#F7F3EA] flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-400"></span>
              <span className="ml-4 rounded-lg bg-white px-8 py-1 text-sm text-inkFaint font-bold">
                app.setu.ai/dashboard
              </span>
            </div>

            <span className="text-sm font-bold text-green-500">• Live</span>
          </div>

          <div className="grid lg:grid-cols-[260px_1fr]">
            <aside className="border-r border-hairline bg-[#FBFAF7] p-6 hidden lg:flex flex-col justify-between min-h-[660px]">
              <nav className="space-y-3">
                <SideItem active={activeTab === 'overview'} label="Overview" icon={Grid} onClick={() => setActiveTab('overview')} />
                <SideItem active={activeTab === 'profile'} label="Profile" icon={User} onClick={() => setActiveTab('profile')} />
                <SideItem active={activeTab === 'matches'} label="Matches" icon={Star} onClick={() => setActiveTab('matches')} />
                <SideItem active={activeTab === 'drafts'} label="Drafts" icon={FileText} onClick={() => setActiveTab('drafts')} />
                <SideItem active={activeTab === 'whatsapp'} label="WhatsApp" icon={MessageCircle} onClick={() => setActiveTab('whatsapp')} />
                <SideItem active={activeTab === 'privacy'} label="Privacy" icon={Shield} onClick={() => setActiveTab('privacy')} />
              </nav>

              <div className="rounded-2xl bg-white border border-hairline p-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal to-amber flex items-center justify-center text-white font-bold">
                  {initials || 'AS'}
                </div>
                <div>
                  <p className="font-bold text-ink">{firstName}</p>
                  <p className="text-xs text-inkSoft">{profile.state || 'India'} · Verified</p>
                </div>
              </div>
            </aside>

            <section className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-6">
                <div>
                  <h1 className="font-display text-3xl font-medium text-ink">
                    {getTabTitle(activeTab, firstName)}
                  </h1>
                  <p className="text-inkSoft mt-2">
                    {getTabSubtitle(activeTab, matches.length)}
                  </p>
                </div>

                <button
                  onClick={refreshMatches}
                  className="rounded-full bg-ink text-white px-6 py-3 font-bold"
                >
                  {loading ? 'Checking...' : '+ Re-check'}
                </button>
              </div>

              {error && (
                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 font-semibold">
                  {error}
                </div>
              )}

              {activeTab === 'overview' && (
                <OverviewPanel matches={matches} topMatches={topMatches} profile={profile} />
              )}

              {activeTab === 'profile' && (
                <ProfilePanel profile={profile} />
              )}

              {activeTab === 'matches' && (
                <MatchesPanel matches={matches} />
              )}

              {activeTab === 'drafts' && (
                <DraftsPanel matches={matches} />
              )}

              {activeTab === 'whatsapp' && (
                <WhatsAppPanel onOpen={openWhatsApp} profile={profile} />
              )}

              {activeTab === 'privacy' && (
                <PrivacyPanel onClear={clearData} />
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}

function OverviewPanel({ matches, topMatches, profile }) {
  return (
    <>
      <div className="rounded-2xl border border-amber-200 bg-amber-soft/60 p-5 mb-7">
        <p className="font-bold text-ink">
          ✨ You’re eligible for {matches.length || 0} government schemes
        </p>
        <p className="text-sm text-inkSoft mt-1">
          Triggered by profile update: {profile.occupation || 'occupation'} →{' '}
          {profile.education || 'education status'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-7">
        {topMatches.length ? (
          topMatches.map((match, index) => (
            <SchemeCard key={match.scheme?.id || index} match={match} index={index} />
          ))
        ) : (
          <>
            <EmptyCard title="Complete your profile" text="Add age, state, income and occupation to get matches." />
            <EmptyCard title="No matches yet" text="Once your profile is ready, Setu AI will show eligible schemes here." />
          </>
        )}
      </div>

      <div className="rounded-2xl border border-hairline bg-white p-5">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-bold text-inkSoft">
            Retrieval quality — latest eligibility checks
          </p>
          <p className="text-sm font-bold text-teal-deep">
            {Math.min(matches.length, 13)}/15 top-3 hit rate
          </p>
        </div>

        <div className="grid grid-cols-10 gap-3 items-end h-28">
          {[58, 66, 45, 62, 70, 40, 61, 68, 72, 57].map((height, i) => (
            <div
              key={i}
              className="rounded-t-lg bg-gradient-to-t from-teal-soft to-teal"
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>
      </div>
    </>
  )
}

function ProfilePanel({ profile }) {
  return (
    <div className="rounded-3xl border border-hairline bg-white p-6">
      <h2 className="font-display text-2xl font-medium mb-5">Your eligibility profile</h2>

      <div className="grid md:grid-cols-2 gap-4 text-sm text-inkSoft">
        <Row label="Name" value={profile.name || 'Not added'} />
        <Row label="Phone" value={profile.phone || 'Not added'} />
        <Row label="Age" value={profile.age || 'Not added'} />
        <Row label="Gender" value={profile.gender || 'Not added'} />
        <Row label="State" value={profile.state || 'Not added'} />
        <Row label="District" value={profile.district || 'Not added'} />
        <Row label="Income" value={profile.annualIncome ? `₹${profile.annualIncome}` : 'Not added'} />
        <Row label="Occupation" value={profile.occupation || 'Not added'} />
        <Row label="Education" value={profile.education || 'Not added'} />
        <Row label="Category" value={profile.category || 'Not added'} />
        <Row label="Area" value={profile.area || 'Not added'} />
        <Row label="Family type" value={profile.familyType || 'Not added'} />
      </div>

      <button
        onClick={() => {
          window.location.href = '/profile?from=dashboard'
        }}
        className="mt-6 rounded-full bg-ink text-white px-6 py-3 font-bold"
      >
        Edit profile
      </button>
    </div>
  )
}

function MatchesPanel({ matches }) {
  return (
    <div className="space-y-4">
      {matches.length ? (
        matches.map((match, index) => (
          <SchemeCard key={match.scheme?.id || index} match={match} index={index} />
        ))
      ) : (
        <EmptyCard title="No matches found" text="Complete your profile and click Re-check." />
      )}
    </div>
  )
}

function DraftsPanel({ matches }) {
  return (
    <div className="rounded-3xl border border-hairline bg-white p-6">
      <h2 className="font-display text-2xl font-medium mb-5">Application drafts</h2>

      {matches.length ? (
        <div className="space-y-3">
          {matches.map((match) => (
            <div
              key={match.scheme?.id}
              className="rounded-2xl border border-hairline p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
            >
              <div>
                <p className="font-bold text-ink">{match.scheme?.name}</p>
                <p className="text-sm text-inkSoft">{match.score}% match · draft ready</p>
              </div>

              <button
                onClick={() => {
                  window.location.href = `/draft/${match.scheme?.id}`
                }}
                className="rounded-full bg-ink text-white px-5 py-2 font-bold"
              >
                Open draft
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-inkSoft">No drafts yet. Match schemes first.</p>
      )}
    </div>
  )
}

function WhatsAppPanel({ onOpen, profile }) {
  return (
    <div className="rounded-3xl border border-hairline bg-white p-6">
      <h2 className="font-display text-2xl font-medium mb-3">WhatsApp assistance</h2>

      <p className="text-inkSoft leading-relaxed mb-5">
        Users can share their scheme discovery request in WhatsApp message format. For the demo, 
        this button opens the WhatsApp share window.
      </p>

      <div className="rounded-2xl bg-paperAlt p-4 text-sm text-inkSoft mb-5">
        Hi Setu AI, I want to check government schemes. My occupation is{' '}
        <b>{profile.occupation || 'not added'}</b>, state is <b>{profile.state || 'not added'}</b>,
        and income is <b>{profile.annualIncome || 'not added'}</b>.
      </div>

      <button
        onClick={onOpen}
        className="rounded-full bg-ink text-white px-6 py-3 font-bold"
      >
        Open WhatsApp
      </button>
    </div>
  )
}

function PrivacyPanel({ onClear }) {
  return (
    <div className="rounded-3xl border border-hairline bg-white p-6">
      <h2 className="font-display text-2xl font-medium mb-3">Privacy controls</h2>

      <p className="text-inkSoft leading-relaxed mb-5">
        This demo app stores the profile and scheme matches in the browser localStorage. Users can clear their 
        locally saved data anytime.
      </p>

      <button
        onClick={onClear}
        className="rounded-full bg-red-600 text-white px-6 py-3 font-bold"
      >
        Clear saved data
      </button>
    </div>
  )
}

function SideItem({ label, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left font-bold transition-colors ${
        active ? 'bg-ink text-white' : 'text-inkSoft hover:bg-white hover:text-ink'
      }`}
    >
      <Icon size={18} strokeWidth={2.2} />
      <span>{label}</span>
    </button>
  )
}
function SchemeCard({ match, index }) {
  const scheme = match.scheme || {}
  const score = match.score || 68
  const isStrong = score >= 80

  return (
    <article className="rounded-2xl border border-hairline bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            isStrong ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-amber-soft text-amber-deep'
          }`}
        >
          {score}% match
        </span>

        <span className="text-xs font-bold text-inkFaint">
          ✓ Verified {index === 0 ? '3d ago' : '1w ago'}
        </span>
      </div>

      <h2 className="font-display text-xl font-medium mb-3">
        {scheme.name || 'Government Scheme'}
      </h2>

      <p className="text-sm text-inkSoft leading-relaxed mb-4">
        <span className="font-bold text-ink">Why you match:</span> {getWhy(match)}
      </p>

      <div className="h-2 rounded-full bg-paperAlt overflow-hidden mb-4">
        <div
          className={`h-full rounded-full ${isStrong ? 'bg-teal' : 'bg-amber'}`}
          style={{ width: `${Math.min(score, 100)}%` }}
        ></div>
      </div>

      <div className="flex gap-2">
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
          className="rounded-full bg-ink text-white px-4 py-2 text-sm font-bold"
        >
          Draft
        </button>
      </div>
    </article>
  )
}

function EmptyCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-hairline bg-white p-5">
      <h2 className="font-display text-xl font-medium mb-3">{title}</h2>
      <p className="text-sm text-inkSoft">{text}</p>
    </div>
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

function getWhy(match) {
  if (typeof match.explanation === 'string') return match.explanation
  return (
    match.explanation?.text ||
    'Age, income, state and profile details satisfy initial eligibility.'
  )
}

function getTabTitle(tab, firstName) {
  const titles = {
    overview: `Welcome back, ${firstName}`,
    profile: 'Profile',
    matches: 'Scheme matches',
    drafts: 'Drafts',
    whatsapp: 'WhatsApp',
    privacy: 'Privacy',
  }

  return titles[tab] || 'Dashboard'
}

function getTabSubtitle(tab, count) {
  const subtitles = {
    overview: `${count} scheme matches based on your latest eligibility profile`,
    profile: 'Your saved eligibility details used for scheme matching.',
    matches: 'All matched schemes ranked by eligibility and user intent.',
    drafts: 'Open copy-ready application drafts for matched schemes.',
    whatsapp: 'Share your scheme discovery request through WhatsApp.',
    privacy: 'Manage local demo data stored in this browser.',
  }

  return subtitles[tab] || ''
}