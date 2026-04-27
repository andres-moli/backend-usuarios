import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import usuarioRoutes from './interfaces/routes/usuarioRoutes';
import { errorHandler } from './interfaces/middlewares/errorHandler';
import { logger } from './interfaces/middlewares/logger';
import { swaggerSpec, swaggerUi } from './interfaces/swagger/swaggerConfig';
import { time } from 'console';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Servidor operativo',
    statusCode: 200,
    timestamp: new Date().toISOString(),
  });
});
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      logger.info(`Servidor corriendo en puerto ${PORT}`);
      logger.info(`Swagger disponible en http://localhost:${PORT}/docs`);
      logger.info(`Health disponible en http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    logger.error('Error al iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();