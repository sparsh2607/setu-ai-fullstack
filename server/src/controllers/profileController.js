const memoryProfiles = new Map()

export async function saveProfile(req, res) {
  const profile = req.body.profile || req.body
  const id = profile.phone || profile.email || `profile_${Date.now()}`
  const saved = { id, ...profile, updatedAt: new Date().toISOString() }
  memoryProfiles.set(id, saved)
  res.json({ success: true, data: saved })
}

export async function getProfile(req, res) {
  const profile = memoryProfiles.get(req.params.id)
  if (!profile) return res.status(404).json({ success: false, message: 'Profile not found in demo memory' })
  res.json({ success: true, data: profile })
}
