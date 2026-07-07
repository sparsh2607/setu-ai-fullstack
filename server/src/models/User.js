import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, sparse: true },
    passwordHash: String,
    consentAccepted: { type: Boolean, default: false },
    profile: {
      age: Number,
      gender: String,
      state: String,
      district: String,
      annualIncome: Number,
      occupation: String,
      education: String,
      disability: Boolean,
      language: String,
      freeText: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model('User', UserSchema)
