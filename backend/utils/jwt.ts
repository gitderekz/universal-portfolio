// utils/jwt.ts
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
  const secret: Secret =
    process.env.JWT_SECRET || 'default_secret';

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn']
  };

  return jwt.sign(
    { id: userId },
    secret,
    options
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET || 'default_secret'
  );
};