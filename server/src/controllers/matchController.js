import { matchSchemes } from '../services/matchingService.js'

export async function match(req, res, next) {
  try {
    const profile = req.body.profile || req.body
    const matches = await matchSchemes(profile)
    res.json({
      success: true,
      profile,
      count: matches.length,
      data: matches,
      engine: {
        hardFilters: ['age', 'state', 'income', 'gender'],
        semanticLayer: 'local keyword similarity demo; replace with embeddings later',
        explanation: 'grounded template explanation; replace with LLM later',
      },
    })
  } catch (error) {
    next(error)
  }
}
