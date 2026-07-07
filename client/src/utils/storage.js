export function saveProfile(profile) {
  localStorage.setItem('setu_profile', JSON.stringify(profile))
}

export function loadProfile() {
  try {
    return JSON.parse(localStorage.getItem('setu_profile') || '{}')
  } catch {
    return {}
  }
}

export function saveMatches(matches) {
  localStorage.setItem('setu_matches', JSON.stringify(matches))
}

export function loadMatches() {
  try {
    return JSON.parse(localStorage.getItem('setu_matches') || '[]')
  } catch {
    return []
  }
}

export function clearSetuData() {
  localStorage.removeItem('setu_profile')
  localStorage.removeItem('setu_matches')
  localStorage.removeItem('setu_consent')
}
