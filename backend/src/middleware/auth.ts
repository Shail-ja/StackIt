// import { Request, Response, NextFunction } from 'express';
// import jwt, {JwtPayload as DefaultJwtPayload} from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error('JWT_SECRET not defined in environment');
// }

// interface JwtPayload extends DefaultJwtPayload {
//   id: string;
//   role: string;
// }

// declare global {
//   namespace Express {
//     interface Request {
//       user?: JwtPayload;
//     }
//   }
// }

// export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// };
// middleware/auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET not defined in environment');
}

interface JwtPayload extends DefaultJwtPayload {
  id: string;
  role: string;
  username?: string; // optional if you add it in login token
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1]?.trim();
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    console.error('JWT verification error:', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
};