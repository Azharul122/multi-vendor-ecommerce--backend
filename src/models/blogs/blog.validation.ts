import { z } from 'zod';

const blogValidationSchema = z.object({
  _id: z.string().optional(),
  name: z
    .string()
    .min(20, { message: 'Product title must be a 40 characters' }),
  sortDescription: z
    .string()
    .min(70, { message: 'Sort description must be a 70 characters' }),
  description: z.string().optional(),
  category: z.string().min(1, { message: 'Category is required' }),
  tags: z.array(z.string()).optional(),
  cardImage: z.string().min(1, { message: 'Card image is required' }),
  coverImages: z.string().optional(),
  images: z.array(z.string()).optional(),
  isDeleted: z.boolean().default(false),
  isDisabled: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export { blogValidationSchema };
