import express from 'express';
import Item from '../models/Item.js';
import { protect } from '../authMiddleware.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const item = await Item.create({ ...req.body, uploader: req.user.id, approved: false });
  res.status(201).json(item);
});

router.get('/', async (req, res) => {
  const items = await Item.find({ approved: true }).populate('uploader', 'name');
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await Item.findById(req.params.id).populate('uploader', 'name');
  res.json(item);
});

export default router;
