import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { CHALLENGE_TTL_SECONDS } from '../config';

export function generateChallengeNonce(): string {
  return crypto.randomBytes(16).toString('hex');
}

export function generateChallengeId(): string {
  return uuidv4();
}

export function getChallengeExpiry(): Date {
  return new Date(Date.now() + CHALLENGE_TTL_SECONDS * 1000);
}
