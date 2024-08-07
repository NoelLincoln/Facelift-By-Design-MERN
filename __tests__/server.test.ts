import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from '../src/api/routes/productRoutes';

// Load the correct .env file based on the NODE_ENV
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/products', productRoutes);

describe('Product API', () => {
  beforeAll(async () => {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return a list of products', async () => {
    const res = await request(app).get('/api/v1/products');
    expect(res.status).toBe(200);
    // Add more expectations based on your actual response structure
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new product', async () => {
    const newProduct = { name: 'Test Product', price: 100 };
    const res = await request(app).post('/api/v1/products').send(newProduct);
    expect(res.status).toBe(201);
    // Add more expectations based on your actual response structure
    expect(res.body.name).toBe(newProduct.name);
  });
});
