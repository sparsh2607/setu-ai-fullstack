import Scheme from '../models/Scheme.js'
import { schemes as localSchemes } from '../data/schemes.js'

let mongoEnabled = false

export function setMongoEnabled(value) {
  mongoEnabled = Boolean(value)
}

export function isMongoEnabled() {
  return mongoEnabled
}

function normalizeScheme(scheme) {
  if (!scheme) return null
  const obj = typeof scheme.toObject === 'function' ? scheme.toObject() : scheme
  return {
    id: obj.id || obj._id?.toString(),
    ...obj,
    _id: undefined,
    __v: undefined,
  }
}

export async function listSchemes(filters = {}) {
  const { state, category, q } = filters

  if (mongoEnabled) {
    const query = {}
    if (state) query.$or = [{ states: 'ALL' }, { states: state.toUpperCase() }]
    if (category) query.category = new RegExp(category, 'i')
    if (q) query.$text = { $search: q }
    const rows = await Scheme.find(query).limit(100).lean()
    return rows.map(normalizeScheme)
  }

  return localSchemes.filter((scheme) => {
    const matchesState = !state || scheme.states.includes('ALL') || scheme.states.includes(state.toUpperCase())
    const matchesCategory = !category || scheme.category.toLowerCase().includes(category.toLowerCase())
    const haystack = `${scheme.name} ${scheme.category} ${scheme.summary} ${scheme.tags.join(' ')}`.toLowerCase()
    const matchesQuery = !q || haystack.includes(q.toLowerCase())
    return matchesState && matchesCategory && matchesQuery
  })
}

export async function getSchemeById(id) {
  if (mongoEnabled) {
    const scheme = await Scheme.findOne({ id }).lean()
    return normalizeScheme(scheme)
  }
  return localSchemes.find((scheme) => scheme.id === id) || null
}

export async function upsertSchemes(schemes) {
  if (!mongoEnabled) return { inserted: 0, skipped: schemes.length, mode: 'local' }
  let inserted = 0
  for (const scheme of schemes) {
    await Scheme.updateOne({ id: scheme.id }, { $set: scheme }, { upsert: true })
    inserted += 1
  }
  return { inserted, skipped: 0, mode: 'mongo' }
}
