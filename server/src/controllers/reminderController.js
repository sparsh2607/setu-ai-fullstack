const reminders = []

export async function createReminder(req, res) {
  const reminder = {
    id: `rem_${Date.now()}`,
    ...req.body,
    status: 'active',
    createdAt: new Date().toISOString(),
  }
  reminders.push(reminder)
  res.status(201).json({ success: true, data: reminder })
}

export async function listReminders(req, res) {
  const phone = req.query.phone
  const data = phone ? reminders.filter((r) => r.phone === phone) : reminders
  res.json({ success: true, count: data.length, data })
}
