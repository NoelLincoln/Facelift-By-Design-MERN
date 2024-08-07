import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './api/routes/productRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const test;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/v1/products', productRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
