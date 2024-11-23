import { Request, Response } from 'express';
import { userServices } from './user.service';
import catchError from '../../utils/catchError';

const createUser = catchError(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await userServices.createUserIntoDB(user);

  res.status(201).json({
    success: true,
    message: 'User created',
    data: result,
  });
});

const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getAllUser();

    res.status(201).json({
      success: true,
      message: 'Data fatched',
      data: users,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: 'Internal Error',
      data: error,
    });
  }
};

const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await userServices.getUserDetails(userId);

    res.status(201).json({
      success: true,
      message: 'Data fatched',
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const userController = {
  createUser,
  getAllUser,
  getUserDetails,
};
