import { matchSchemes } from './matchingService.js'
import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromNumber = process.env.TWILIO_WHATSAPP_FROM

const twilioClient = accountSid && authToken ? twilio(accountSid, authToken) : null

function normalizeWhatsAppNumber(to) {
  if (!to) return ''

  if (to.startsWith('whatsapp:')) {
    return to
  }

  if (to.startsWith('+')) {
    return `whatsapp:${to}`
  }

  return `whatsapp:+${to}`
}

export async function sendWhatsAppText(to, message) {
  if (!twilioClient || !fromNumber) {
    console.log('[twilio] Missing Twilio env variables')
    console.log('[twilio] Reply preview:', message)
    return null
  }

  const result = await twilioClient.messages.create({
    from: fromNumber,
    to: normalizeWhatsAppNumber(to),
    body: message,
  })

  console.log('[twilio] Message sent:', result.sid)
  return result
}

const sessions = new Map()

function getSession(phone) {
  if (!sessions.has(phone)) {
    sessions.set(phone, {
      step: 'START',
      profile: {},
      matches: [],
      selectedScheme: null,
    })
  }

  return sessions.get(phone)
}

function saveSession(phone, session) {
  sessions.set(phone, session)
}

function resetSession(phone) {
  sessions.delete(phone)
}

function cleanText(text = '') {
  return String(text).trim()
}

function yesNo(text) {
  const value = cleanText(text).toLowerCase()

  if (['yes', 'y', 'haan', 'ha', 'true'].includes(value)) return true
  if (['no', 'n', 'nahi', 'false'].includes(value)) return false

  return null
}

function formatMatches(matches = []) {
  if (!matches.length) {
    return `No strong matches found yet.

Reply RESTART to try again.`
  }

  return matches
    .slice(0, 5)
    .map((match, index) => {
      const scheme = match.scheme || match

      return `${index + 1}. ${scheme.name}
Match: ${match.score || 0}%
Category: ${scheme.category || 'General'}`
    })
    .join('\n\n')
}

function formatSchemeDetails(match) {
  const scheme = match?.scheme || match

  if (!scheme) {
    return 'Scheme not found. Reply with a valid number.'
  }

  return `${scheme.name}

Category: ${scheme.category || 'General'}

Summary:
${scheme.summary || scheme.plainLanguage || 'Details available in demo data.'}

Documents:
${(scheme.documents || ['Identity proof', 'Income proof', 'Address proof']).join('\n')}

Apply link:
${scheme.applicationUrl || 'Official link not available in demo data'}

Reply LIST to see all matches.
Reply RESTART to start again.`
}

export async function handleWhatsAppMessage(phone, incomingText) {
  const text = cleanText(incomingText)
  const lower = text.toLowerCase()
  const session = getSession(phone)

  if (!text) {
    return ['Please send a text message.']
  }

  if (['restart', 'reset', 'start over'].includes(lower)) {
    resetSession(phone)

    const fresh = getSession(phone)
    fresh.step = 'ASK_NAME'
    saveSession(phone, fresh)

    return [
      `Welcome to Setu AI 👋

Let's create your eligibility profile.

What is your full name?`,
    ]
  }

  if (['hi', 'hello', 'start'].includes(lower) || session.step === 'START') {
    session.step = 'ASK_NAME'
    saveSession(phone, session)

    return [
      `Welcome to Setu AI 👋

I can help you find government schemes based on your eligibility.

What is your full name?`,
    ]
  }

  if (lower === 'list') {
    return [formatMatches(session.matches)]
  }

  if (/^\d+$/.test(lower) && session.matches.length) {
    const selected = session.matches[Number(lower) - 1]
    session.selectedScheme = selected
    saveSession(phone, session)

    return [formatSchemeDetails(selected)]
  }

  switch (session.step) {
    case 'ASK_NAME': {
      session.profile.name = text
      session.step = 'ASK_AGE'
      saveSession(phone, session)

      return [`Thanks ${text.split(' ')[0]}! What is your age?`]
    }

    case 'ASK_AGE': {
      const age = Number(text)

      if (!age || age < 1 || age > 120) {
        return ['Please enter a valid age. Example: 20']
      }

      session.profile.age = age
      session.step = 'ASK_STATE'
      saveSession(phone, session)

      return ['Which state do you live in? Example: Uttar Pradesh']
    }

    case 'ASK_STATE': {
      session.profile.state = text.toUpperCase()
      session.step = 'ASK_DISTRICT'
      saveSession(phone, session)

      return ['Which district do you live in? Example: Ghaziabad']
    }

    case 'ASK_DISTRICT': {
      session.profile.district = text
      session.step = 'ASK_INCOME'
      saveSession(phone, session)

      return ['What is your annual family income? Example: 120000']
    }

    case 'ASK_INCOME': {
      const income = Number(text)

      if (Number.isNaN(income) || income < 0) {
        return ['Please enter a valid income. Example: 120000']
      }

      session.profile.annualIncome = income
      session.step = 'ASK_OCCUPATION'
      saveSession(phone, session)

      return ['What is your occupation? Example: student, farmer, worker, self-employed']
    }

    case 'ASK_OCCUPATION': {
      session.profile.occupation = text.toLowerCase()
      session.step = 'ASK_EDUCATION'
      saveSession(phone, session)

      return ['What is your education status? Example: school, college, graduate, none']
    }

    case 'ASK_EDUCATION': {
      session.profile.education = text.toLowerCase()
      session.step = 'ASK_CATEGORY'
      saveSession(phone, session)

      return ['What is your category? Example: General, OBC, SC, ST, Minority']
    }

    case 'ASK_CATEGORY': {
      session.profile.category = text
      session.step = 'ASK_AREA'
      saveSession(phone, session)

      return ['Do you live in Urban or Rural area?']
    }

    case 'ASK_AREA': {
      session.profile.area = text.toLowerCase()
      session.step = 'ASK_DISABILITY'
      saveSession(phone, session)

      return ['Do you have disability status applicable? Reply Yes or No.']
    }

    case 'ASK_DISABILITY': {
      const value = yesNo(text)

      if (value === null) {
        return ['Please reply Yes or No.']
      }

      session.profile.disability = value
      session.step = 'ASK_NEED'
      saveSession(phone, session)

      return [
        `Tell me your need or life situation.

Example:
I need scholarship and education support.`,
      ]
    }

    case 'ASK_NEED': {
      session.profile.freeText = text
      session.profile.language = 'english'

      const matches = await matchSchemes(session.profile)

      session.matches = Array.isArray(matches) ? matches : matches?.data || []
      session.step = 'SHOW_RESULTS'
      saveSession(phone, session)

      return [
        `Great. Your profile is complete ✅

Here are your scheme matches:

${formatMatches(session.matches)}

Reply with 1, 2, 3... for details.`,
      ]
    }

    case 'SHOW_RESULTS': {
      return [
        `Reply with a scheme number for details.

Example: 1

Or reply LIST to see matches again.
Reply RESTART to start again.`,
      ]
    }

    default: {
      session.step = 'START'
      saveSession(phone, session)

      return ['Please type START to begin.']
    }
  }
}