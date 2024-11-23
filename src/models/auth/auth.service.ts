import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLogin } from './auth.interface';
import { isPasswordMatched } from './auth.utils';
import jwt from 'jsonwebtoken';
import config from '../../app/config';
import crypto from 'crypto';
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from '../../mailtrap/emails';
import { Response } from 'express';
import { userValidation } from '../user/user.validation';

// ............ Register ...........
const register = async (payload: IUser) => {
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();

  const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

  const isUserExistInDB = await User.findOne({ email: payload.email });

  if (isUserExistInDB) {
    throw new Error('User already exist');
  }

  const validateUser =
    userValidation.userRegistrationZodValidation.parse(payload);

  const newUser = await User.create({
    ...validateUser,
    verificationToken,
    verificationTokenExpiresAt,
  });

  if (payload.email == 'job.hunter.chapai@gmail.com') {
    await sendVerificationEmail(payload.email, verificationToken);
  }

  return newUser;
};

// ............ Verify Email ...........
const verifyEmail = async (code: string) => {
  const user = await User.findOne({
    verificationToken: code,
    verificationTokenExpiresAt: { $gt: Date.now() },
  });

  console.log(user);

  if (!user) {
    throw new Error('User Not found');
  }
  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;
  await user.save();

  await sendWelcomeEmail(user.email, user.name);

  return user;
};

// ................ Login ...........
const login = async (payload: TLogin) => {
  const isUserExistInDB = await User.findOne({ email: payload.email });

  if (!isUserExistInDB) {
    throw new Error('User not exist');
  }

  if (isUserExistInDB.isBlocked) {
    throw new Error('You can not access this account try onother one');
  }

  console.log('paloadPass:', payload.password);
  console.log('dbPass:', isUserExistInDB.password);

  const passwordMatched = await isPasswordMatched(
    payload.password,
    isUserExistInDB.password,
  );

  if (!passwordMatched) {
    throw new Error('Password not matched');
  }

  const jwtPayload = {
    name: isUserExistInDB.name,
    role: isUserExistInDB.role,
    email: isUserExistInDB.email,
    image: isUserExistInDB.photo,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_at_ex_in,
  });
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_rt_ex_in,
    },
  );

  return {
    accessToken,
    refreshToken,
  };
};

// ............. Forgot Password ............

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex');
  const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpiresAt = resetTokenExpiresAt;

  await user.save();

  // send email
  await sendPasswordResetEmail(
    user.email,
    `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
  );
  return {
    resetToken,
    resetTokenExpiresAt,
  };
};

// ............. Reset Password ............
export const resetPassword = async (token: string, password: string) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error('User not found');
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
  await user.save();

  await sendResetSuccessEmail(user.email);
  return {
    user,
  };
};

// ............. Logout ............

const logout = async () => {
  return { success: true };
};

// ............. Profile Update ............
const updateProfile = async (id: string, payload: IUser) => {
  const updatedUser = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedUser;
};

// ............. Delete ............
const deleteProfile = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    return;
  }

  if (user.isDeleted == true) {
    throw new Error('User already deleted');
  }

  if (user.role === 'admin') {
    const user = await User.findByIdAndDelete(id);
    return user;
  }

  user.isDeleted = true;

  await user?.save();
  return user;
};

// ............. Block user ............
const blockUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user || user.isBlocked == true) {
    throw new Error("You can't block this user");
  }

  user.isBlocked = true;

  await user.save();

  return user;
};

// ............. Change Password ............

export const userAUthService = {
  register,
  login,
  resetPassword,
  forgotPassword,
  verifyEmail,
  logout,
  updateProfile,
  deleteProfile,
  blockUser,
};
