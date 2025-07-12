import express from 'express';
import Item from '../models/Item.js';
import { protect, adminOnly } from '../authMiddleware.js';

const router = express.Router();

router.get('/pending', protect, adminOnly, async (req, res) => {
  const items = await Item.find({ approved: false });
  res.json(items);
});

router.patch('/approve/:id', protect, adminOnly, async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
  res.json(item);
});



export default router;
