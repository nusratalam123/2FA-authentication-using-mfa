import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { generateTOTPSecret } from '../utils/totp';
import { hashPassword } from '../utils/hash';
import { MfaService } from '../services/mfa.service';
import { signJwt } from '../utils/jwt';

export class AuthController {
  static async register(req: Request, res: Response) {
    const { username, email, password } = req.body;

    // 1️⃣ Check if email exists
    const existing = await UserService.findByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    // 2️⃣ Hash the password
    const passwordHash = await hashPassword(password);

    // 3️⃣ Create the user
    const user = await UserService.createUser(username, email, passwordHash);

    return res.status(201).json({ message: 'User created', userId: user._id });
  }

// src/controllers/auth.controller.ts
static async login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await UserService.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isValid = await UserService.validatePassword(user, password);
    if (!isValid) throw new Error('Invalid credentials');

    // Correct MFA check
    if (user.mfa?.enabled && user.mfa?.totpSecret) {
      const challenge = await MfaService.createChallenge(user.id.toString());
      return res.json({ mfaRequired: true, challengeId: challenge.challengeId });
    }

    const token = signJwt({ id: user.id, email: user.email });
    return res.json({ mfaRequired: false, token });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
}



  static async enableMfa(req: Request, res: Response) {
    const { userId } = req.body;
    const secret = generateTOTPSecret();
    await UserService.enableMfa(userId, secret.base32);

    return res.json({
      message: 'MFA enabled',
      secret: secret.base32,
      otpauth_url: secret.otpauth_url,
    });
  }

  static async disableMfa(req: Request, res: Response) {
    const { userId } = req.body;
    await UserService.disableMfa(userId);
    return res.json({ message: 'MFA disabled' });
  }
}
