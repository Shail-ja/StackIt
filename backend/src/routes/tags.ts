import express from 'express';
import { Question } from '../models/Question';

const router = express.Router();

// GET /api/tags — get all unique tags from questions
router.get('/', async (_req, res) => {
  try {
    const tags = await Question.distinct('tags');
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

export default router;
