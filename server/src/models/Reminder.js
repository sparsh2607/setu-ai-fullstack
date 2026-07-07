import mongoose from 'mongoose'

const ReminderSchema = new mongoose.Schema(
  {
    phone: String,
    schemeId: String,
    schemeName: String,
    dueDate: String,
    channel: { type: String, enum: ['email', 'whatsapp'], default: 'whatsapp' },
    note: String,
    status: { type: String, enum: ['active', 'done'], default: 'active' },
  },
  { timestamps: true }
)

export default mongoose.model('Reminder', ReminderSchema)
