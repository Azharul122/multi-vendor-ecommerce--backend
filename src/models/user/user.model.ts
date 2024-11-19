import mongoose, { model } from 'mongoose';
import { IUser } from './user.interface';
import { genderType, RoleType } from './user.constance';
import bcryptjs from 'bcryptjs';
import config from '../../app/config';

const userSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: Object.keys(RoleType),
      default: RoleType.user,
    },
    phone: String,
    gender: {
      enum: Object.keys(genderType),
      type: String,
      default: RoleType.user,
      required: false,
    },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    photo: String,
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcryptjs.hash(user.password, Number(config.salt_round));
  next();
});
userSchema.post('save', async function (doc, next) {
  doc.password = '';

  // user.password = await bcryptjs.hash(user.password, Number(config.salt_round));
  next();
});

export const User = model<IUser>('User', userSchema);
