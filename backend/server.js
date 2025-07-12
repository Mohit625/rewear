import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
const app = express();

// ✅ STEP 1: Apply CORS FIRST
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ STEP 2: JSON body parser
app.use(express.json());

// ✅ STEP 3: Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/admin', adminRoutes);

// ✅ STEP 4: Connect MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log('✅ Server running on http://localhost:5000');
    });
  })
  .catch((err) => console.error('❌ MongoDB connection failed:', err));
