import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { z } from 'zod';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

// Schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const mfaToggleSchema = z.object({
  userId: z.string(),
});

// Routes
router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.post('/enable-mfa', validate(mfaToggleSchema), AuthController.enableMfa);
router.post('/disable-mfa', validate(mfaToggleSchema), AuthController.disableMfa);

export default router;
