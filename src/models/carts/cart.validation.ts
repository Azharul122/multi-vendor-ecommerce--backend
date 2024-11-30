import { z } from 'zod';

const productValidationSchema = z.object({
  name: z
    .string()
    .min(30, { message: 'Product title must be a 30 characters' }),
  sortDescription: z
    .string()
    .min(50, { message: 'Sort description must be a 50 characters' }),
  description: z.string().optional(),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  discountPercentage: z
    .number()
    .min(0)
    .max(100, { message: 'Discount percentage must be between 0 and 100' })
    .default(0),
  stock: z
    .number()
    .min(0, { message: 'Stock must be a non-negative number' })
    .default(11),
  category: z.string().min(1, { message: 'Category is required' }),
  tags: z.array(z.string()).optional(),
  stokStatus: z.string().optional(),
  cardImage: z.string().min(1, { message: 'Card image is required' }),
  coverImages: z.string().optional(),
  images: z.array(z.string()).optional(),
  voucher: z.string().optional(),
  isDeleted: z.boolean().default(false),
  isDisabled: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  isPopular: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export { productValidationSchema };
