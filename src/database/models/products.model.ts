import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  images: string[];
  description: string;
  categories: string;
  price: number;
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  images: {
    type: [String],
    required: true,
    validate: [(val: string[]) => val.length >= 2 && val.length <= 8, 'Requires at least 2 and not more than 8 images']
  },
  description: { type: String, required: true },
  categories: { type: String, required: true },
  price: { type: Number, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true }); 

export const Product = model<IProduct>('Product', productSchema);
