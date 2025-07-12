export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface Question {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  author: User;
  createdAt: Date;
  votes: number;
  answers: Answer[];
  views: number;
}

export interface Answer {
  _id: string;
  content: string;
  author: User;
  createdAt: Date;
  votes: number;
  isAccepted: boolean;
  questionId: string;
}

export interface Notification {
  id: string;
  type: 'answer' | 'comment' | 'mention';
  message: string;
  isRead: boolean;
  createdAt: Date;
  questionId?: string;
  answerId?: string;
}

export type FilterType = 'newest' | 'unanswered' | 'answered' | 'active';