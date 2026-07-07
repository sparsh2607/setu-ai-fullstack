import bcrypt from 'bcryptjs'
import { signToken } from '../middleware/auth.js'

const demoUsers = new Map()

export async function register(req, res) {
  const { name, email, phone, password = 'setu1234' } = req.body
  const id = email || phone
  if (!id) return res.status(400).json({ success: false, message: 'email or phone is required' })
  if (demoUsers.has(id)) return res.status(409).json({ success: false, message: 'User already exists' })

  const passwordHash = await bcrypt.hash(password, 10)
  const user = { id, name: name || 'Setu User', email, phone, passwordHash }
  demoUsers.set(id, user)
  const token = signToken({ id, name: user.name })
  res.status(201).json({ success: true, data: { user: { id, name: user.name, email, phone }, token } })
}

export async function login(req, res) {
  const { email, phone, password = 'setu1234' } = req.body
  const id = email || phone
  const user = demoUsers.get(id)
  if (!user) return res.status(401).json({ success: false, message: 'User not found. Register first in demo mode.' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ success: false, message: 'Invalid password' })
  const token = signToken({ id, name: user.name })
  res.json({ success: true, data: { user: { id, name: user.name, email: user.email, phone: user.phone }, token } })
}
