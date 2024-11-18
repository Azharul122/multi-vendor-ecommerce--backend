import express from 'express';
import { userAuthController } from './auth.controller';

const router = express.Router();

router.post('/register', userAuthController.register);
router.post('/login', userAuthController.login);


export const authRoutes= router
