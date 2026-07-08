import { loadProfile, loadMatches } from './storage'

export function hasSavedProfile() {
  try {
    const profile = loadProfile()
    return Boolean(profile && Object.keys(profile).length > 0)
  } catch {
    return false
  }
}

export function goToEligibilityFlow(from = 'home') {
  if (hasSavedProfile()) {
    window.location.assign(`/results?from=${from}`)
  } else {
    window.location.assign(`/consent?from=${from}`)
  }
}

export function goToSignInFlow(from = 'home') {
  window.location.assign(`/consent?from=${from}`)
}
export function goToNewProfileFlow(from = 'home') {
  window.location.assign(`/consent?from=${from}&mode=new-profile`)
}

export function openWhatsAppMessage() {
  const profile = loadProfile()
  const matches = loadMatches()

  const topScheme = matches?.[0]?.scheme?.name || 'government schemes'

  const text = `Hi Setu AI, I want help with government schemes.

Name: ${profile.name || 'Not added'}
State: ${profile.state || 'Not added'}
Occupation: ${profile.occupation || 'Not added'}
Income: ${profile.annualIncome || 'Not added'}
Top match: ${topScheme}

Please help me understand my eligibility.`

  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
}