import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/admin', adminRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log('✅ Server running on http://localhost:5000');
    });
  })
  .catch((err) => console.error('❌ MongoDB connection failed:', err));
