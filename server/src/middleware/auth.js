import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

export function signToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' })
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return next(new ApiError(401, 'Authentication token missing'))

  try {
    req.user = jwt.verify(token, env.JWT_SECRET)
    next()
  } catch {
    next(new ApiError(401, 'Invalid or expired token'))
  }
}
