
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLogin } from './auth.interface';
import bcryptjs from 'bcryptjs';
import { isPasswordMatched } from './auth.utils';
import jwt from 'jsonwebtoken';
import config from '../../app/config';

const register = async (payload: IUser) => {

  const isUserExistInDB = await User.findOne({ email: payload.email });

  if (isUserExistInDB) {
    // return {messge:"user already exist"}
    throw new Error('User already exist');
  }

  const newUser = await User.create(payload);
  return newUser;
};

const login = async (payload: TLogin) => {
  const isUserExistInDB = await User.findOne({ email: payload.email });

  if (!isUserExistInDB) {
    throw new Error('User not exist');
  }

  if (isUserExistInDB.isBlocked) {
    throw new Error('You can access this account try onother one');
  }

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

export const userAUthService = {
  register,
  login,
};
