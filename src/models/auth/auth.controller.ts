import { Request, Response } from 'express';
import { userAUthService } from './auth.service';
import config from '../../app/config';


const register = async (req: Request, res: Response) => {
  try {


    const data = await userAUthService.register(req.body);

    res.status(201).json({
      success: true,
      message: 'Registration done',
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// const register = async (req: Request, res: Response) => {
//     try {
//       const user = req.body;
  
//       const result = await userAUthService.register(user);
  
//       res.status(201).json({
//         success: true,
//         message: 'User created',
//         data: result,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };


const login = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { accessToken, refreshToken } = await userAUthService.login(data);

    res.cookie('rt', refreshToken, {
      httpOnly: true,
      secure: config.node_env === 'production',
    });
    res.status(201).json({
      success: true,
      message: 'Login success',
      data: accessToken,
    });
  } catch (error) {
    console.log(error);
  }
};

export const userAuthController = {
  register,
  login,
};
