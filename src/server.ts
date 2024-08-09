import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import winston from 'winston';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import productRoutes from './api/routes/productRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Configure winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'server.log' }),
  ],
});

// Middleware
const corsOptions = {
  origin: ['http://localhost:8001', 'http://18.183.120.7:8000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Routes
app.use('/api/v1/products', productRoutes);

app.use(cors(corsOptions));

app.use(express.json());

// Connect to MongoDB
const start = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => logger.info(`Server running on port ${port}`));
  } catch (error) {
    logger.error(error);
  }
};

start();
