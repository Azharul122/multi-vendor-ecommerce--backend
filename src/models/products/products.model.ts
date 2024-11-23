import mongoose, { model } from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sortDescription: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    discountParcentage: { type: Number, default: 0 },
    stock: { type: Number, default: 11 },
    category: { type: String, required: true },
    tags: [String],
    stokStatus: String,
    cardImage: { type: String, required: true },
    coverImages: String,
    images: [],
    voucher: String,
    isDeleted: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isPopular: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Product = model('Product', productSchema);
