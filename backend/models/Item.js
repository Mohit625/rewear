import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  type: String,
  size: String,
  condition: String,
  tags: [String],
  imageUrls: [String],
  points: Number,
  approved: { type: Boolean, default: false },
  available: { type: Boolean, default: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);
