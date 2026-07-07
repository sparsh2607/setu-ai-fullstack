import '../src/config/env.js'
import { connectDb } from '../src/config/db.js'
import { setMongoEnabled, upsertSchemes } from '../src/services/schemeStore.js'
import { schemes } from '../src/data/schemes.js'
import Scheme from '../src/models/Scheme.js'

const connected = await connectDb()
setMongoEnabled(connected)
if (connected) {
  await Scheme.deleteMany({})
}
const result = await upsertSchemes(schemes)
console.log({ ...result, reset: connected, totalSchemes: schemes.length })
process.exit(0)
