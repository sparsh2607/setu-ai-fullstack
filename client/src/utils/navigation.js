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
  const phoneNumber = '14155238886'
  const message = encodeURIComponent('hi')

  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
}