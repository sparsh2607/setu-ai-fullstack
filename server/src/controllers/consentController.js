export async function acceptConsent(req, res) {
  const { accepted, phone, name } = req.body
  res.json({
    success: true,
    data: {
      accepted: Boolean(accepted),
      phone: phone || null,
      name: name || null,
      acceptedAt: new Date().toISOString(),
      message: 'Consent captured. In Mongo mode, persist this on the user profile.',
    },
  })
}

export async function deleteUserData(req, res) {
  res.json({
    success: true,
    data: {
      identifier: req.params.identifier,
      deletedAt: new Date().toISOString(),
      message: 'Demo delete complete. In Mongo mode, delete user/profile/reminders by identifier.',
    },
  })
}
