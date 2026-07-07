import { Router } from 'express'
import { match } from '../controllers/matchController.js'

const router = Router()
router.post('/', match)
export default router
