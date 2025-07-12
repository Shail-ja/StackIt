// import express from 'express';
// import { User } from '../models/User';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const router = express.Router();
// const JWT_SECRET = 'your-secret'; // replace with env var later

// // Register
// router.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const existing = await User.findOne({ $or: [{ username }, { email }] });
//     if (existing) return res.status(400).json({ error: 'User already exists' });

//     const hashed = await bcrypt.hash(password, 10);
//     const user = new User({ username, email, password: hashed });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Registration failed' });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ error: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ error: 'Login failed' });
//   }
// });

// export default router;



// routes/auth.js
// routes/auth.ts
import express from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET not defined in environment');
}

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        username: user.username
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;