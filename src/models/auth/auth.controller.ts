import { NextFunction, Request, Response } from 'express';
import { userAUthService } from './auth.service';
import config from '../../app/config';
import catchError from '../../utils/catchError';

// ................ Register ...........
const register = catchError(async (req: Request, res: Response) => {
  const data = await userAUthService.register(req.body);

  res.status(201).json({
    success: true,
    message: 'Registration done',
    data: data,
  });
});

// ................ Verify Email ...........
export const verifyEmail = catchError(async (req: Request, res: Response) => {
  const { code } = req.body;

  const result = await userAUthService.verifyEmail(code);
  res.status(200).json({
    success: true,
    message: 'Email verified successfully',
    user: result,
  });
});

// ................ Login ...........
const login = catchError(async (req: Request, res: Response) => {
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
});

// ................ Forgot Password ...........
export const forgotPassword = catchError(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const result = await userAUthService.forgotPassword(email);

    res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email',
      data: result,
    });
  },
);
// ................ Reset Password ...........
export const resetPassword = catchError(async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  const result = await userAUthService.resetPassword(token, password);

  res.status(200).json({
    success: true,
    message: 'Password reset successful',
    data: result,
  });
});

// ................ Log out ...........
const logout = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userAUthService.logout();

      res.clearCookie('rt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      res.status(200).json({
        success: true,
        message: 'Logout',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

// ................ Update profile ...........
const updateProfile = catchError(
  async (
    req: Request,
    res: Response,
  ) => {
   
      const { userId } = req.params;
      const data = req.body;
      const result = await userAUthService.updateProfile(userId, data);
  
      res.status(200).json({
        success: true,
        message: 'Profile updated',
        data: result,
      });
   
  }
)

// ................ Delete profile ...........
const deleteProfile = catchError(
  async (req: Request, res: Response) => {

    const id = req.params.id;
    const result = await userAUthService.deleteProfile(id);

    res.status(200).json({
      success: true,
      message: 'Delted',
      data: result,
    });
  
}
)

// ................ Block profile ...........
const blockProfile = catchError(
  async (req: Request, res: Response) => {
  
    const id = req.params.id;
    const result = await userAUthService.blockUser(id);

    res.status(200).json({
      success: true,
      message: 'Blocked',
      data: result,
    });
  } 
)


export const userAuthController = {
  register,
  login,
  resetPassword,
  forgotPassword,
  verifyEmail,
  logout,
  updateProfile,
  deleteProfile,
  blockProfile,
};
