import { Router } from 'express'
import authRoutes from './authRoutes.js'
import consentRoutes from './consentRoutes.js'
import draftRoutes from './draftRoutes.js'
import matchRoutes from './matchRoutes.js'
import profileRoutes from './profileRoutes.js'
import reminderRoutes from './reminderRoutes.js'
import schemeRoutes from './schemeRoutes.js'
import whatsappRoutes from './whatsappRoutes.js'

const router = Router()

router.get('/health', (req, res) => {
  res.json({ success: true, service: 'Setu AI API', status: 'ok', time: new Date().toISOString() })
})

router.use('/auth', authRoutes)
router.use('/consent', consentRoutes)
router.use('/draft', draftRoutes)
router.use('/match', matchRoutes)
router.use('/profile', profileRoutes)
router.use('/reminders', reminderRoutes)
router.use('/schemes', schemeRoutes)
router.use('/whatsapp', whatsappRoutes)

export default router
