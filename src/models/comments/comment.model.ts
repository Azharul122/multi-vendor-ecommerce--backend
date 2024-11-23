import mongoose, { model, Schema } from 'mongoose';

const commentSchema = new Schema({
  productId: String,
  messgae: { type: String, reqired: true },
  reting: { type: Number, default: 0 },
  avarageRating: Number,
});

export const Comment = model('Comment', commentSchema);
