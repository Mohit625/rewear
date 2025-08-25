import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  points: { type: Number, default: 0 },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  role: { type: String, default: 'user' },
  notifications: [
    {
      message: String,
      date: { type: Date, default: Date.now },
      read: { type: Boolean, default: false }
    }
  ]
},{ timestamps: true });

export default mongoose.model('User', userSchema);
