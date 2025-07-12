import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // HTML from rich editor
  tags: [{ type: String, required: true }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }]
}, { timestamps: true });

export const Question = mongoose.model('Question', questionSchema);
