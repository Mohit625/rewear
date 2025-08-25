import mongoose from 'mongoose';

const swapSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fromItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  toItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  status: { type: String, default: 'pending' }
},{ timestamps: true });

export default mongoose.model('Swap', swapSchema);

