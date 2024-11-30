import { Request, Response } from 'express';
import catchError from '../../utils/catchError';
import { categoryServices } from './category.services';


const createCategory = catchError(async (req: Request, res: Response) => {
  const category = req.body;
  const data = await categoryServices.craeteCategory(category);

  res.status(201).json({
    success: true,
    message: 'Created Success',
    data,
  });
});


// fetch all Categoruy
const categories=catchError(
    async (req:Request,res:Response)=>{
        const categories=await categoryServices.fetachAllCategory()
        res.status(201).json({
            success:true,
            message:"Data fathed",
            data:categories
        })
    }
)


// exports
export const categoryControllers={
    createCategory,
    categories
}
