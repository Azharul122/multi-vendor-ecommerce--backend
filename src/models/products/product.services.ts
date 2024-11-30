import mongoose from 'mongoose';
import { productInterface } from './product.interface';
import { productValidationSchema } from './product.validation';
import { Product } from './products.model';


// create product
const craeteProduct = async (payload: productInterface) => {
  const validateProducts = productValidationSchema.parse(payload);
  const products = await Product.create(validateProducts);
  return products
};

// Featch All Products 
const fetachAllProducts=async()=>{
    const products=await Product.find({})
    return products
}

// const idT=new mongoose.Types.ObjectId 
// interface idType{
//     id: typeof idT 
// }

// fetch product details
const productDetails=async(id:string)=>{
    const product=await Product.findOne({_id:id})
    return product
}

export const productsServices={
    craeteProduct,
    fetachAllProducts,
    productDetails
}



