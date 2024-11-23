import express from 'express';
import { userAuthController } from './auth.controller';
import { userValidation } from '../user/user.validation';

const router = express.Router();

router.post('/register', userAuthController.register);
router.post('/login', userAuthController.login);
router.post('/forgot-password', userAuthController.forgotPassword);
router.post('/reset-password/:token', userAuthController.resetPassword);
router.post('/verify-email', userAuthController.verifyEmail);
router.post('/logout', userAuthController.logout);
router.put('/profile-update/:userId', userAuthController.updateProfile);
router.delete('/profile-delete/:id', userAuthController.deleteProfile);
router.patch('/block-profile/:id', userAuthController.blockProfile);



export const authRoutes = router;
