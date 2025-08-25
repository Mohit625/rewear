import express from 'express';
import User from '../models/User.js';
import Item from '../models/Item.js';
import { notifyUser } from '../utils/notify.js';
import { protect, adminOnly } from '../authMiddleware.js';

const router = express.Router();
router.use(protect);

// User management
router.get('/users', adminOnly, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Item deletion
router.delete('/items/:id', adminOnly, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    await Item.findByIdAndDelete(req.params.id);
    await notifyUser(item.uploader, `Your item "${item.title}" was removed by admin`);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Item approval
router.get('/pending', adminOnly, async (req, res) => {
  try {
    const items = await Item.find({ approved: false });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending items' });
  }
});

router.patch('/approve/:id', adminOnly, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    await notifyUser(item.uploader, `Your item "${item.title}" has been approved`);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
