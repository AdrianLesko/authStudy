import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  }, 
  description: String,
  isPublic: {
    type: Boolean,
    default: () => false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, 
  createdAt: {
    type: String,
    default: () => new Date().toISOString()
  }
})

itemSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

export default mongoose.model('Item', itemSchema)