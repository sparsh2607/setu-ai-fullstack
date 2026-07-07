import { Router } from 'express'
import { createDraft } from '../controllers/draftController.js'

const router = Router()
router.post('/', createDraft)
export default router
