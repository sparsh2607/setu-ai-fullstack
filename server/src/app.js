import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import { env } from './config/env.js'
import apiRoutes from './routes/index.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

const app = express()

app.use(helmet())
app.use(cors({ origin: [env.CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'], credentials: true }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 250 }))
app.use(morgan('dev'))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.json({ success: true, message: 'Setu AI backend is running', docs: '/api/health' }))
app.use('/api', apiRoutes)
app.use(notFound)
app.use(errorHandler)

export default app
