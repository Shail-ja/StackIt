import { Question, Answer, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '2',
    username: 'jane_smith',
    email: 'jane@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '3',
    username: 'dev_mike',
    email: 'mike@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  }
];

export const mockAnswers: Answer[] = [
  {
    id: '1',
    content: '<p>You can join 2 columns in a data set to make a separate column in SQL using the <strong>CONCAT</strong> function or the <code>||</code> operator.</p><p>Here are two approaches:</p><ol><li><strong>Using CONCAT function:</strong><br><code>SELECT CONCAT(first_name, \' \', last_name) AS full_name FROM users;</code></li><li><strong>Using || operator (PostgreSQL, SQLite):</strong><br><code>SELECT first_name || \' \' || last_name AS full_name FROM users;</code></li></ol>',
    author: mockUsers[1],
    createdAt: new Date('2024-01-15T10:30:00'),
    votes: 5,
    isAccepted: true,
    questionId: '1'
  },
  {
    id: '2',
    content: '<p>Another approach is using <strong>CASE statements</strong> for more complex concatenations:</p><pre><code>SELECT \n  CASE \n    WHEN middle_name IS NOT NULL \n    THEN first_name || \' \' || middle_name || \' \' || last_name\n    ELSE first_name || \' \' || last_name\n  END AS full_name\nFROM users;</code></pre>',
    author: mockUsers[2],
    createdAt: new Date('2024-01-15T11:15:00'),
    votes: 2,
    isAccepted: false,
    questionId: '1'
  }
];

export const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'How to join 2 columns in a data set to make a separate column in SQL',
    description: '<p>I have a dataset with <strong>first_name</strong> and <strong>last_name</strong> columns. I want to create a new column called <strong>full_name</strong> that combines both.</p><p>What\'s the best approach to do this in SQL?</p>',
    tags: ['SQL', 'Database', 'Concatenation'],
    author: mockUsers[0],
    createdAt: new Date('2024-01-15T09:00:00'),
    votes: 3,
    answers: mockAnswers.filter(a => a.questionId === '1'),
    views: 124
  },
  {
    id: '2',
    title: 'React Hook useEffect dependency array best practices',
    description: '<p>I\'m working with React hooks and I\'m confused about when to include variables in the useEffect dependency array.</p><p>Could someone explain the best practices?</p>',
    tags: ['React', 'Hooks', 'JavaScript'],
    author: mockUsers[1],
    createdAt: new Date('2024-01-14T15:30:00'),
    votes: 8,
    answers: [],
    views: 89
  },
  {
    id: '3',
    title: 'JWT token authentication implementation in Node.js',
    description: '<p>I need to implement JWT authentication in my Node.js application. What are the security considerations I should keep in mind?</p>',
    tags: ['JWT', 'Node.js', 'Authentication', 'Security'],
    author: mockUsers[2],
    createdAt: new Date('2024-01-13T11:20:00'),
    votes: 12,
    answers: [],
    views: 256
  },
  {
    id: '4',
    title: 'CSS Grid vs Flexbox: When to use which?',
    description: '<p>I\'m often confused about when to use CSS Grid versus Flexbox for layouts. Can someone clarify the use cases for each?</p>',
    tags: ['CSS', 'Grid', 'Flexbox', 'Layout'],
    author: mockUsers[0],
    createdAt: new Date('2024-01-12T14:45:00'),
    votes: 6,
    answers: [],
    views: 178
  }
];