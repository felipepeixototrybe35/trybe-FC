import jwt = require('jsonwebtoken');
import IToken from '../Interfaces/IToken';

export const createToken = ({ id, email, role }: IToken): string => {
  const secret = process.env.JWT_SECRET || 'secret';

  const token = jwt.sign({ id, email, role }, secret, { expiresIn: '10h' });

  return token;
};

export const verifyToken = (token: string): IToken => {
  const secret = process.env.JWT_SECRET || 'secret';
  const payload = jwt.verify(token, secret);

  return payload as IToken;
};
