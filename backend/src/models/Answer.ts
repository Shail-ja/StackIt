import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  content: { type: String, required: true }, // HTML from rich editor
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  votes: { type: Number, default: 0 },
  isAccepted: { type: Boolean, default: false }
}, { timestamps: true });

export const Answer = mongoose.model('Answer', answerSchema);
