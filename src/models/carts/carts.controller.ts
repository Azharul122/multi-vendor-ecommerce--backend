import { Request, Response } from 'express';
import catchError from '../../utils/catchError';
import { productsServices } from './cart.services';

const createProduct = catchError(async (req: Request, res: Response) => {
  const product = req.body;
  const data = await productsServices.craeteProduct(product);

  res.status(201).json({
    success: true,
    message: 'Created Success',
    data,
  });
});


// fetch all products
const products=catchError(
    async (req:Request,res:Response)=>{
        const products=await productsServices.fetachAllProducts()
        res.status(201).json({
            success:true,
            message:"Data fathed",
            data:products
        })
    }
)

// fetch product details
const productDetails=catchError(
    async (req:Request,res:Response)=>{
        const {productId}=req.params
        const result=await productsServices.productDetails(productId)
        res.status(201).json({
            success:true,
            message:"Data fathed",
            data:result
        })
    }
)

// exports
export const productControllers={
    createProduct,
    products,
    productDetails
}
