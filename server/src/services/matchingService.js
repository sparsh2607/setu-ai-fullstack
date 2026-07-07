import { listSchemes } from './schemeStore.js'

const normalize = (value) => String(value || '').trim().toLowerCase()

function tokenize(text) {
  return normalize(text)
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

function ageMatches(scheme, age) {
  if (age === undefined || age === null || age === '') return true
  const n = Number(age)
  return n >= (scheme.age?.min ?? 0) && n <= (scheme.age?.max ?? 120)
}

function incomeMatches(scheme, annualIncome) {
  if (!scheme.incomeMax) return true
  if (annualIncome === undefined || annualIncome === null || annualIncome === '') return true
  return Number(annualIncome) <= Number(scheme.incomeMax)
}

function stateMatches(scheme, state) {
  if (!state) return true
  const normalizedState = String(state).trim().toUpperCase()
  return scheme.states.includes('ALL') || scheme.states.includes(normalizedState)
}

function genderMatches(scheme, gender) {
  if (!scheme.gender) return true
  if (!gender) return true
  return normalize(scheme.gender) === normalize(gender)
}

function occupationMatches(scheme, occupation) {
  if (!occupation || scheme.occupations.includes('ALL')) return true
  return scheme.occupations.some((item) => normalize(item) === normalize(occupation))
}

function semanticScore(scheme, profile) {
  const freeText = `${profile.freeText || ''} ${profile.occupation || ''} ${profile.education || ''} ${profile.state || ''}`
  const queryTokens = new Set(tokenize(freeText))
  const schemeTokens = new Set(tokenize(`${scheme.name} ${scheme.category} ${scheme.summary} ${scheme.plainLanguage} ${scheme.tags.join(' ')}`))

  let overlap = 0
  queryTokens.forEach((token) => {
    if (schemeTokens.has(token)) overlap += 1
  })

  const aliases = [
    ['kisan', ['farmer', 'agriculture', 'crop', 'land', 'fasal']],
    ['farmer', ['kisan', 'agriculture', 'crop', 'land', 'fasal']],
    ['mazdoor', ['worker', 'daily-wage', 'shram', 'labour']],
    ['student', ['scholarship', 'education', 'college', 'school']],
    ['women', ['female', 'girl', 'mahila']],
    ['ghar', ['housing', 'house', 'awaas']],
    ['health', ['hospital', 'insurance', 'ayushman']],
    ['loan', ['credit', 'working capital', 'svanidhi']],
  ]

  for (const [token, related] of aliases) {
    if (queryTokens.has(token) && related.some((r) => schemeTokens.has(r))) overlap += 2
  }

  return Math.min(25, overlap * 5)
}

function explainMatch(scheme, profile, checks, score) {
  const positive = []
  const pending = []

  if (checks.age) positive.push(`age ${profile.age || 'provided'} scheme range me fit ho rahi hai`)
  else pending.push('age eligibility range verify karni hogi')

  if (checks.state) positive.push(`${profile.state || 'state'} applicability satisfy ho rahi hai`)
  else pending.push('state applicability match nahi hui')

  if (checks.income) positive.push('income threshold ke andar lag raha hai')
  else pending.push('income threshold cross ho sakta hai')

  if (checks.occupation) positive.push(`occupation ${profile.occupation || ''} scheme category se related hai`)
  else pending.push('occupation/category proof check karna hoga')

  if (checks.gender) positive.push('gender-specific requirement satisfy ho rahi hai')

  const confidence = score >= 85 ? 'Strong match' : score >= 65 ? 'Good match' : 'Partial match'

  return {
    headline: confidence,
    bullets: positive.slice(0, 4),
    pending: pending.slice(0, 3),
    text: `${scheme.name} aapke profile se ${confidence.toLowerCase()} dikhta hai. ${positive.slice(0, 2).join(', ')}. Final application se pehle documents verify karna zaroori hai.`,
  }
}

export async function matchSchemes(profile) {
  const schemes = await listSchemes({ state: profile.state })

  const results = schemes.map((scheme) => {
    const checks = {
      age: ageMatches(scheme, profile.age),
      state: stateMatches(scheme, profile.state),
      income: incomeMatches(scheme, profile.annualIncome),
      occupation: occupationMatches(scheme, profile.occupation),
      gender: genderMatches(scheme, profile.gender),
    }

    const hardScore = Object.values(checks).filter(Boolean).length * 15
    const semScore = semanticScore(scheme, profile)
    const score = Math.min(98, hardScore + semScore)
    const hardFailed = !checks.age || !checks.state || !checks.income || !checks.gender

    return {
      scheme,
      score: hardFailed ? Math.min(score, 62) : score,
      status: hardFailed ? 'partial' : score >= 75 ? 'strong' : 'good',
      checks,
      explanation: explainMatch(scheme, profile, checks, hardFailed ? Math.min(score, 62) : score),
      documentChecklist: buildDocumentChecklist(scheme, profile),
    }
  })

  return results
    .filter((item) => item.score >= 45)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
}

export function buildDocumentChecklist(scheme, profile = {}) {
  const base = scheme.documents || []
  const extras = []
  if (profile.annualIncome !== undefined && profile.annualIncome !== null) extras.push('Income certificate / income self-declaration')
  if (profile.state) extras.push('Residence / domicile proof')
  if (profile.disability) extras.push('Disability certificate')
  return [...new Set([...base, ...extras])]
}

export function buildApplicationDraft(scheme, profile) {
  const name = profile.name || '[Your Name]'
  const state = profile.state || '[State]'
  const occupation = profile.occupation || '[Occupation]'
  const age = profile.age || '[Age]'

  return {
    title: `${scheme.name} Application Draft`,
    summary: `Applicant ${name}, age ${age}, resident of ${state}, occupation ${occupation}, appears to be relevant for ${scheme.name}.`,
    body: `To,\nThe Concerned Scheme Officer,\n\nSubject: Application request for ${scheme.name}\n\nRespected Sir/Madam,\n\nI, ${name}, resident of ${state}, request assistance under ${scheme.name}. My profile details are: age ${age}, occupation ${occupation}, annual income ${profile.annualIncome || '[Annual Income]'}, and preferred language ${profile.language || 'Hindi/English'}.\n\nBased on the scheme requirements, I am attaching the required documents and request you to kindly process my application as per eligibility rules.\n\nThank you.\n\nApplicant Name: ${name}\nMobile: ${profile.phone || '[Mobile Number]'}\nDate: [DD/MM/YYYY]`,
    checklist: buildDocumentChecklist(scheme, profile),
    disclaimer: 'This is a helper draft, not a final government submission. Please verify the latest rules on the official portal before applying.',
  }
}
