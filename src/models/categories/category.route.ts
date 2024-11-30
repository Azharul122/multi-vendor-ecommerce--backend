import express from 'express';
import { categoryControllers } from './category.controller';

const router = express.Router();

router.post('/create-category', categoryControllers.createCategory);
router.get('/categories', categoryControllers.categories);

export const categoryRoutes = router;
