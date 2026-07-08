const PROFILE_KEY = 'setu_profile'
const MATCHES_KEY = 'setu_matches'

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile || {}))
}

export function loadProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}')
  } catch {
    return {}
  }
}

export function saveMatches(matches) {
  localStorage.setItem(MATCHES_KEY, JSON.stringify(matches || []))
}

export function loadMatches() {
  try {
    return JSON.parse(localStorage.getItem(MATCHES_KEY) || '[]')
  } catch {
    return []
  }
}

export function clearSavedData() {
  localStorage.removeItem(PROFILE_KEY)
  localStorage.removeItem(MATCHES_KEY)
}
export function clearSetuData() {
  localStorage.removeItem('setu_profile')
  localStorage.removeItem('setu_matches')
}