import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectDb() {
  if (!env.USE_MONGO) {
    console.log('[db] USE_MONGO=false, running with local in-memory data')
    return false
  }
  if (!env.MONGO_URI) {
    console.warn('[db] USE_MONGO=true but MONGO_URI missing; using local data')
    return false
  }

  try {
    await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
      dbName: 'setu-ai',
    })
    console.log('[db] MongoDB connected')
    return true
  } catch (error) {
    console.error('[db] MongoDB connection failed:', error.message)
    console.warn('[db] continuing with local data so frontend can still run')
    return false
  }
}
