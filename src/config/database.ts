import mongoose from 'mongoose';
import { logger } from '../interfaces/middlewares/logger';
import dotenv from 'dotenv';

dotenv.config();

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/prueba_backend';
    
    await mongoose.connect(mongoUri);
    
    logger.info('MongoDB conectado exitosamente');
    
    mongoose.connection.on('error', (error) => {
      logger.error('Error en conexión MongoDB:', error);
    });
  } catch (error) {
    logger.error('Error al conectar MongoDB:', error);
    throw error;
  }
};