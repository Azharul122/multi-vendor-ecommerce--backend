import { model, Schema } from 'mongoose';
import { CategoryInterface } from './category.interface';

const categoryChema = new Schema<CategoryInterface>({
  title: { type: String, required: true },
  image: String,
},
{
    timestamps:true
}
)

export const Category = model<CategoryInterface>('Category', categoryChema);
