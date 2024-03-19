import { Router } from 'express';
import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const decoded = jwt.verify(token, 'ushmita');
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };

export default Router;