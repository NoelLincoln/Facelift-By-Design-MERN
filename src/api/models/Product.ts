import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
