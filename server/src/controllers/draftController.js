import { getSchemeById } from '../services/schemeStore.js'
import { buildApplicationDraft } from '../services/matchingService.js'
import { ApiError } from '../utils/ApiError.js'

export async function createDraft(req, res, next) {
  try {
    const { schemeId, profile = {} } = req.body
    if (!schemeId) throw new ApiError(400, 'schemeId is required')

    const scheme = await getSchemeById(schemeId)
    if (!scheme) throw new ApiError(404, 'Scheme not found')

    const draft = buildApplicationDraft(scheme, profile)
    res.json({ success: true, data: { scheme, draft } })
  } catch (error) {
    next(error)
  }
}
