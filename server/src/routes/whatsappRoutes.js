import { Router } from 'express'
import { whatsappWebhook } from '../controllers/whatsappController.js'

const router = Router()
router.post('/webhook', whatsappWebhook)
export default router
