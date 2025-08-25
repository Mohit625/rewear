import express from 'express';
import User from '../models/User.js';
import Item from '../models/Item.js';
import { protect } from '../authMiddleware.js';

const router = express.Router();
router.post('/:itemId', protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    req.user.wishlist.push(item._id);
    await req.user.save();
    res.json({ message: 'Added to wishlist' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add to wishlist' });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    await req.user.populate('wishlist');
    res.json(req.user.wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch wishlist' });
  }
});

export default router;
