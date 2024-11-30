import mongoose, { model } from 'mongoose';
import { blogInterface } from './blog.interface';

const blogSchema = new mongoose.Schema<blogInterface>(
  {
    name: { type: String, required: true },
    sortDescription: { type: String, required: true },
    description: String,
    category: { type: String },
    tags: [String],
    cardImage: { type: String, required: true },
    coverImages: String,
    images: [String],
    isDeleted: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Blog = model<blogInterface>('Blog', blogSchema);
