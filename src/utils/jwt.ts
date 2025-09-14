import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export function signJwt(payload: any): string {
  const JWT_EXPIRES_IN='1d';
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwt<T = any>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}
