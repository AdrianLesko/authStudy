import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  items: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  }], 
  passwordHash: {type: String, required: true}
})

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString(),
    delete ret._id
    delete ret.__v
    delete ret.passwordHash
    void doc
  }
})

export default mongoose.model('User', UserSchema)