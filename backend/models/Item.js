import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
category: { type: String, required: true },
  description: String,
  type: String,
  size: String,
  condition: String,
  tags: [String],
  imageUrls: [String],
  points: { type: Number, default: 1 },
  approved: { type: Boolean, default: false },
  available: { type: Boolean, default: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true  }
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);
