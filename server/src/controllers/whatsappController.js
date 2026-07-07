import { matchSchemes } from '../services/matchingService.js'

function extractProfileFromMessage(text = '') {
  const lower = text.toLowerCase()
  const stateMatch = lower.match(/\b(up|uttar pradesh|bihar|delhi|rajasthan|mp|madhya pradesh|maharashtra|punjab|haryana)\b/)
  const ageMatch = lower.match(/(\d{1,2})\s*(saal|years|yr|age)?/)
  let occupation = 'self-employed'
  if (/kisan|farmer|farm|agri|fasal/.test(lower)) occupation = 'farmer'
  if (/student|college|school|padh/.test(lower)) occupation = 'student'
  if (/mazdoor|worker|labour|daily/.test(lower)) occupation = 'daily-wage'
  if (/vendor|thela|street/.test(lower)) occupation = 'street-vendor'

  const stateAliases = {
    up: 'UTTAR PRADESH',
    'uttar pradesh': 'UTTAR PRADESH',
    bihar: 'BIHAR',
    delhi: 'DELHI',
    rajasthan: 'RAJASTHAN',
    mp: 'MADHYA PRADESH',
    'madhya pradesh': 'MADHYA PRADESH',
    maharashtra: 'MAHARASHTRA',
    punjab: 'PUNJAB',
    haryana: 'HARYANA',
  }

  return {
    name: 'WhatsApp User',
    age: ageMatch ? Number(ageMatch[1]) : 35,
    state: stateMatch ? stateAliases[stateMatch[1]] : 'BIHAR',
    annualIncome: 200000,
    occupation,
    freeText: text,
    language: 'hinglish',
  }
}

export async function whatsappWebhook(req, res, next) {
  try {
    const incoming = req.body.Body || req.body.message || ''
    const profile = extractProfileFromMessage(incoming)
    const matches = await matchSchemes(profile)
    const top = matches.slice(0, 3)
    const lines = top.map((m, i) => `${i + 1}. ${m.scheme.name} (${m.score}%): ${m.explanation.headline}`)
    const reply = top.length
      ? `Setu AI ne ${top.length} matches find kiye:\n${lines.join('\n')}\n\nDraft ke liye web app open karein.`
      : 'Abhi strong match nahi mila. Kripya age, state, occupation aur income detail bhejein.'

    res.type('text/xml').send(`<Response><Message>${reply}</Message></Response>`)
  } catch (error) {
    next(error)
  }
}
