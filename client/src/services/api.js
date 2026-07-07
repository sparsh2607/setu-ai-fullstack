const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.message || `Request failed: ${res.status}`)
  }
  return data
}

export const api = {
  health: () => request('/health'),
  acceptConsent: (payload) => request('/consent', { method: 'POST', body: JSON.stringify(payload) }),
  saveProfile: (profile) => request('/profile', { method: 'POST', body: JSON.stringify({ profile }) }),
  getSchemes: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return request(`/schemes${query ? `?${query}` : ''}`)
  },
  getScheme: (id) => request(`/schemes/${id}`),
  match: (profile) => request('/match', { method: 'POST', body: JSON.stringify({ profile }) }),
  createDraft: (schemeId, profile) => request('/draft', { method: 'POST', body: JSON.stringify({ schemeId, profile }) }),
  createReminder: (payload) => request('/reminders', { method: 'POST', body: JSON.stringify(payload) }),
  deleteUserData: (identifier) => request(`/consent/${encodeURIComponent(identifier)}`, { method: 'DELETE' }),
}

export { API_BASE_URL }
