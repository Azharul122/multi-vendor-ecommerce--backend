import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLogin } from './auth.interface';
import bcryptjs from 'bcryptjs';
import { isPasswordMatched } from './auth.utils';
import jwt from 'jsonwebtoken';
import config from '../../app/config';
import crypto from 'crypto';

// ............Register ...........
const register = async (payload: IUser) => {
  const isUserExistInDB = await User.findOne({ email: payload.email });

  if (isUserExistInDB) {
    throw new Error('User already exist');
  }

  const newUser = await User.create(payload);
  return newUser;
};

// ................Login ...........
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
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();
    return {
      resetToken,
      resetTokenExpiresAt,
    };
  } catch (error) {
    console.log('Error in forgotPassword ', error);
  }
};

// ............. Reset Password ............

export const resetPassword = async (token: string, password: string) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return;
    }

    // update password
    // const hashedPassword = await bcryptjs.hash(
    //   password,
    //   Number(config.salt_round),
    // );

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    // await sendResetSuccessEmail(user.email);
    return {
      user,
    };
  } catch (error) {
    console.log('Error in resetPassword ', error);
  }
};

export const userAUthService = {
  register,
  login,
  resetPassword,
  forgotPassword,
};
