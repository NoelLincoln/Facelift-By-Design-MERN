import express from 'express';
import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import winston from 'winston';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './api/routes/productRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5003;

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
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => logger.info('MongoDB connected'))
  .catch((err) => logger.error(err));

// Routes
app.use('/api/v1/products', productRoutes);

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
