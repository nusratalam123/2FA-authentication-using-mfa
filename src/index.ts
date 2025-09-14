import express from 'express';
import mongoose from 'mongoose';
import { MONGO_URI, NODE_ENV, PORT } from './config';
import authRoutes from './routes/auth.routes';
import mfaRoutes from './routes/mfa.routes';
import { rateLimiterMiddleware } from './middlewares/rateLimiter.middleware';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

// --- Middlewares ---
app.use(express.json());
app.use(rateLimiterMiddleware);

// --- Routes ---
app.use('/auth', authRoutes);
app.use('/mfa', mfaRoutes);

// --- Health Check ---
app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: NODE_ENV });
});

// --- Error Handler ---
app.use(errorHandler);

// --- Connect to MongoDB and start server ---
async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`✅ MongoDB connected at ${MONGO_URI}`);

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
}

startServer();
