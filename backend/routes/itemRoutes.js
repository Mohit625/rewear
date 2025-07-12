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

router.patch('/:id/swap', protect, async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item || !item.available) return res.status(400).json({ error: 'Item unavailable' });
  
    item.available = false;
    await item.save();
  
    // Optionally: track swap history per user
  
    res.json({ message: 'Swap request accepted', item });
  });
  
  // PATCH /api/items/:id/redeem
  router.patch('/:id/redeem', protect, async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item || !item.available) return res.status(400).json({ error: 'Item unavailable' });
  
    const user = await User.findById(req.user.id);
    if (user.points < item.points) return res.status(400).json({ error: 'Insufficient points' });
  
    user.points -= item.points;
    item.available = false;
  
    await Promise.all([user.save(), item.save()]);
  
    res.json({ message: 'Redeemed with points', item });
  });

export default router;
