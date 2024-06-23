import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token';

export default class UserMiddleware {
  static async validateUser(req: Request, res: Response, next: NextFunction) {
    const { username, role, email, password } = req.body;
    if (!username || !role || !email || !password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    next();
  }

  static async validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const emailRegex = (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) return res.status(401).send({ message: 'Token not found' });
      const token = authorization.split(' ')[1];

      if (!token) return res.status(401).send({ message: 'Token must be a valid token' });

      const decoded = verifyToken(token);
      if (!decoded) {
        return res.status(401).send({ message: 'Token must be a valid token' });
      }
      return next();
    } catch (err) {
      const customError = err as Error;
      return res.status(500).json(customError.message);
    }
  }
}
