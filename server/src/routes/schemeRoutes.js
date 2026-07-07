import { Router } from 'express'
import { getScheme, getSchemes } from '../controllers/schemeController.js'

const router = Router()
router.get('/', getSchemes)
router.get('/:id', getScheme)
export default router
