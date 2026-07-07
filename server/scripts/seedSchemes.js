import '../src/config/env.js'
import { connectDb } from '../src/config/db.js'
import { setMongoEnabled, upsertSchemes } from '../src/services/schemeStore.js'
import { schemes } from '../src/data/schemes.js'

const connected = await connectDb()
setMongoEnabled(connected)
const result = await upsertSchemes(schemes)
console.log(result)
process.exit(0)
