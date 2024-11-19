import { Request, Response } from 'express';
import { userAUthService } from './auth.service';
import config from '../../app/config';


// ................ Register ...........
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
// ................ Login ...........
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

// ................ Forgot Password ...........
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const result = await userAUthService.forgotPassword(email);

    res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// ................ Reset Password ...........
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const result = await userAUthService.resetPassword(token, password);

    res.status(200).json({
      success: true,
      message: 'Password reset successful',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
};

export const userAuthController = {
  register,
  login,
  resetPassword,
  forgotPassword,
};
