import mongoose from 'mongoose';
import { IUser } from './user.interface';
import { User } from './user.model';
import { userValidation } from './user.validation';

const createUserIntoDB = async (user: IUser) => {
  const validatedUser =
    userValidation.userRegistrationZodValidation.parse(user);
  const result = await User.create(validatedUser);

    // const validateData=userValidation.userRegistrationZodValidation(result)

  return result;
};

const getAllUser = async () => {
  const data = await User.find({});

  return data;
};

const getUserDetails = async (id: string) => {
  const objectId = new mongoose.Types.ObjectId(id);

  const data = await User.findOne({ _id: objectId });
  return data;
};

export const userServices = {
  createUserIntoDB,
  getAllUser,
  getUserDetails,
};
