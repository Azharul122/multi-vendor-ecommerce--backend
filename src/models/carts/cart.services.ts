// import mongoose from 'mongoose';
// import { productInterface } from './cart.interface';
// import { productValidationSchema } from './cart.validation';
// import { Cart, Product } from './cart.model';

// // create product
// const craeteCart = async (payload: productInterface) => {
//   const isCartExistInDB = Cart.length == 0 && payload;

//   let cartData
//   if (isCartExistInDB) { 
//     cartData=Cart.create(payload);
//     return cartData
//   }


// };

// // Featch All Products
// const fetachAllProducts = async () => {
//   const products = await Product.find({});
//   return products;
// };

// // const idT=new mongoose.Types.ObjectId
// // interface idType{
// //     id: typeof idT
// // }

// // fetch product details
// const productDetails = async (id: string) => {
//   const product = await Product.findOne({ _id: id });
//   return product;
// };

// export const productsServices = {
//   craeteProduct,
//   fetachAllProducts,
//   productDetails,
// };
