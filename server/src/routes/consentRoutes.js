import { Router } from 'express'
import { acceptConsent, deleteUserData } from '../controllers/consentController.js'

const router = Router()
router.post('/', acceptConsent)
router.delete('/:identifier', deleteUserData)
export default router
