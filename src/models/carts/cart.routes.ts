import express from 'express';
import { productControllers } from './carts.controller';

const router = express.Router();

router.post('/create-product', productControllers.createProduct);
router.get('/all-products', productControllers.products);
router.get('/product-details/:productId', productControllers.productDetails);


export const productRouter=router