import express from 'express';
import { userAuthController } from './auth.controller';

const router = express.Router();

router.post('/register', userAuthController.register);
router.post('/login', userAuthController.login);
router.post("/forgot-password", userAuthController.forgotPassword);
router.post("/reset-password/:token", userAuthController.resetPassword);


export const authRoutes= router
