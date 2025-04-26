import { Request, Response, NextFunction } from 'express';

/**
 * Admin middleware
 * Ensures the user has admin role
 */
export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if user exists and has admin role
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};