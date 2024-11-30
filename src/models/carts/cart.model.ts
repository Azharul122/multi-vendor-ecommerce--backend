import mongoose, { model } from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    products: [Object],
    voucherId: String,
    totalProductsInCart: Number,
    addreess: [],
    totalPrice: Number,
    grandTotal: String,
  },
  {
    timestamps: true,
  },
);

export const Cart = model('Cart', cartSchema);
