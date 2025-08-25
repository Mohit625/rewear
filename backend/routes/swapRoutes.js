import express from 'express';
import Swap from '../models/Swap.js';
import { protect }  from '../authMiddleware.js';
const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const swap = new Swap({ ...req.body, fromUser: req.user._id });
    await swap.save();
    res.status(201).json(swap);
  } catch (err) {
    res.status(500).json({ message: 'Failed to initiate swap' });
  }
});

router.put('/:id/accept', protect, async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);
    if (!swap) return res.status(404).json({ message: 'Swap not found' });

    swap.status = 'accepted';
    await swap.save();
    res.json(swap);
  } catch (err) {
    res.status(500).json({ message: 'Failed to accept swap' });
  }
});

export default router;
