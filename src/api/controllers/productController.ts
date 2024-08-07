import { Request, Response } from 'express';
import Product from '../models/Product';

// Helper function to handle errors
const handleError = (err: unknown, res: Response) => {
  if (err instanceof Error) {
    res.status(500).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'An unknown error occurred' });
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    handleError(err, res);
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  const { name, price, description, category, image } = req.body;

  const product = new Product({
    name,
    price,
    description,
    category,
    image,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    handleError(err, res);
  }
};

// Get a single product
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    handleError(err, res);
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated' });
  } catch (err) {
    handleError(err, res);
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    handleError(err, res);
  }
};
