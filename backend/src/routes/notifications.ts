import express from 'express';
import { Notification } from '../models/Notification';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

// Get unread notifications
router.get('/', verifyToken, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user?.id })
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Mark all as read
router.post('/mark-read', verifyToken, async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user?.id, isRead: false },
      { $set: { isRead: true } }
    );
    res.json({ message: 'All notifications marked as read' });
  } catch {
    res.status(500).json({ error: 'Failed to update notifications' });
  }
});

export default router;
