import { CategoryInterface } from './category.interface';
import { categoryValidationSchema } from './category.validation';
import { Category } from './category.model';


// create product
const craeteCategory = async (payload: CategoryInterface) => {
  const validateCategory = categoryValidationSchema.parse(payload);
  const products = await Category.create(validateCategory);
  return products
};

// Featch All Products 
const fetachAllCategory=async()=>{
    const categories=await Category.find({})
    return categories
}


export const categoryServices={
    craeteCategory,
    fetachAllCategory,
}



