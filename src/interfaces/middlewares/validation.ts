import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ValidationException } from '../../domain/exceptions/ValidationException';

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
        next(new ValidationException('Error de validación', errors));
      } else {
        next(error);
      }
    }
  };
};

export const validate = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
      throw new ValidationException('Error de validación', errors);
    }
    throw error;
  }
};