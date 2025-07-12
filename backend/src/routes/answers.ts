import express from 'express';
import { Answer } from '../models/Answer';
import { Question } from '../models/Question';
import { verifyToken } from '../middleware/auth';
import { Notification } from '../models/Notification';

const router = express.Router();

// Post an answer
router.post('/:questionId', verifyToken, async (req, res) => {
  try {
    const { content } = req.body;
    const { questionId } = req.params;

    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    const answer = new Answer({
      question: questionId,
      content,
      author: req.user?.id
    });

    await answer.save();

    question.answers.push(answer._id);
    await question.save();

    if (question.author && question.author.toString() !== req.user?.id) {
      await new Notification({
        user: question.author,
        type: 'answer',
        message: `${req.user?.id} answered your question`
      }).save();
    }

    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post answer' });
  }
});

// Vote on an answer
router.post('/vote/:answerId', verifyToken, async (req, res) => {
  const { answerId } = req.params;
  const { direction } = req.body; // "up" or "down"

  if (!['up', 'down'].includes(direction)) {
    return res.status(400).json({ error: 'Invalid vote direction' });
  }

  try {
    const voteChange = direction === 'up' ? 1 : -1;
    const answer = await Answer.findByIdAndUpdate(
      answerId,
      { $inc: { votes: voteChange } },
      { new: true }
    );
    res.json(answer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to vote on answer' });
  }
});

// Accept an answer
router.patch('/accept/:answerId', verifyToken, async (req, res) => {
  const { answerId } = req.params;

  try {
    const answer = await Answer.findById(answerId).populate('question');
    if (!answer) return res.status(404).json({ error: 'Answer not found' });

    // Ensure the logged-in user is the question's author
    const question = await Question.findById(answer.question);
    if (!question?.author || question.author.toString() !== req.user?.id) {
      return res.status(403).json({ error: 'Only question owner can accept an answer' });
    }

    // First reset previously accepted answers
    await Answer.updateMany(
      { question: question._id, isAccepted: true },
      { $set: { isAccepted: false } }
    );

    // Mark the new one as accepted
    answer.isAccepted = true;
    await answer.save();

    res.json({ message: 'Answer marked as accepted', answer });
  } catch (err) {
    res.status(500).json({ error: 'Failed to accept answer' });
  }
});


export default router;
