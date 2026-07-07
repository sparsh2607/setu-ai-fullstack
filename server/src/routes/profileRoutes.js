import { Router } from 'express'
import { getProfile, saveProfile } from '../controllers/profileController.js'

const router = Router()
router.post('/', saveProfile)
router.get('/:id', getProfile)
export default router
