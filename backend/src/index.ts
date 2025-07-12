import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './db';
import authRoutes from './routes/auth';
import questionRoutes from './routes/questions';
import answerRoutes from './routes/answers';
import tagRoutes from './routes/tags';
import notificationRoutes from './routes/notifications';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = process.env.CLIENT_URL;
      if (!origin || origin === allowed || origin === allowed + "/") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/notifications', notificationRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
