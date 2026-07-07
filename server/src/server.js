import app from './app.js'
import { connectDb } from './config/db.js'
import { env } from './config/env.js'
import { setMongoEnabled } from './services/schemeStore.js'

const mongoConnected = await connectDb()
setMongoEnabled(mongoConnected)

app.listen(env.PORT, () => {
  console.log(`[server] Setu AI API running on http://localhost:${env.PORT}`)
})
