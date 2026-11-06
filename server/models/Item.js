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
    required: false,
  }, 
  createdAt: {
    type: String,
    default: () => new Date().toISOString()
  }
})

export default mongoose.model('Item', itemSchema)