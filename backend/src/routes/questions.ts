import express from 'express';
import { Question } from '../models/Question';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const question = new Question({
      title,
      description,
      tags,
      author: req.user?.id
    });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post question' });
  }
});

router.get('/', async (_req, res) => {
  const questions = await Question.find().populate('author', 'username').sort({ createdAt: -1 });
  res.json(questions);
});

router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('author', 'username')
      .populate({
        path: 'answers',
        populate: { path: 'author', select: 'username' }
      });
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
  } catch {
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});

export default router;
