import { Request, Response, NextFunction } from 'express';
import { DomainException } from '../../domain/exceptions/DomainException';
import { formatError } from '../../shared/utils/responseFormatter';
import { logger } from './logger';
import mongoose from 'mongoose';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error('Error:', {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });
  
  if (error instanceof DomainException) {
    formatError(res, error.message, error.statusCode);
    return;
  }
  
  if (error instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(error.errors).map(err => err.message);
    formatError(res, 'Error de validación', 400, errors);
    return;
  }
  
  if (error instanceof mongoose.Error.CastError) {
    formatError(res, 'ID inválido', 400);
    return;
  }
  
  if ((error as any).code === 11000) {
    formatError(res, 'El email ya está registrado', 409);
    return;
  }
  
  formatError(
    res,
    process.env.NODE_ENV === 'production' ? 'Error interno del servidor' : error.message,
    500
  );
};