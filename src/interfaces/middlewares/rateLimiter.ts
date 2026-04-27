import rateLimit from 'express-rate-limit';
import { env } from '../../config/env';

export const rateLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMaxRequests,
  message: {
    success: false,
    error: 'Demasiadas peticiones, por favor intente más tarde',
    statusCode: 429,
  },
  standardHeaders: true,
  legacyHeaders: false,
});