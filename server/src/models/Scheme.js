import mongoose from 'mongoose'

const SchemeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, text: true },
    category: { type: String, required: true, index: true },
    summary: { type: String, required: true, text: true },
    plainLanguage: { type: String },
    states: [{ type: String, index: true }],
    age: { min: Number, max: Number },
    incomeMax: { type: Number, default: null },
    gender: { type: String, default: null },
    occupations: [{ type: String, index: true }],
    tags: [{ type: String, text: true }],
    benefits: [String],
    documents: [String],
    applicationUrl: String,
    lastVerifiedDate: String,
    source: String,
    embedding: { type: [Number], default: undefined },
  },
  { timestamps: true }
)

SchemeSchema.index({ name: 'text', summary: 'text', tags: 'text', category: 'text' })

export default mongoose.model('Scheme', SchemeSchema)
