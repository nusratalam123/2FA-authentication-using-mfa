// import dotenv from 'dotenv';
// dotenv.config();

// export const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

// export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/twofa-demo';

// export const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
// export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// export const CHALLENGE_TTL_SECONDS = process.env.CHALLENGE_TTL_SECONDS
//   ? Number(process.env.CHALLENGE_TTL_SECONDS)
//   : 60;

// export const NODE_ENV = process.env.NODE_ENV || 'development';

// src/config/index.ts
import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mfa-local';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';
export const CHALLENGE_TTL_SECONDS = process.env.CHALLENGE_TTL_SECONDS
  ? Number(process.env.CHALLENGE_TTL_SECONDS)
  : 60;