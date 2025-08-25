import express from 'express';
import { protect } from '../authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/notifications', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.notifications.reverse());
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

router.patch('/notifications/read', protect, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $set: { 'notifications.$[].read': true }
    });
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark as read' });
  }
});

export default router;
