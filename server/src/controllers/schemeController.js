import { getSchemeById, listSchemes } from '../services/schemeStore.js'
import { ApiError } from '../utils/ApiError.js'

export async function getSchemes(req, res, next) {
  try {
    const schemes = await listSchemes(req.query)
    res.json({ success: true, count: schemes.length, data: schemes })
  } catch (error) {
    next(error)
  }
}

export async function getScheme(req, res, next) {
  try {
    const scheme = await getSchemeById(req.params.id)
    if (!scheme) throw new ApiError(404, 'Scheme not found')
    res.json({ success: true, data: scheme })
  } catch (error) {
    next(error)
  }
}
