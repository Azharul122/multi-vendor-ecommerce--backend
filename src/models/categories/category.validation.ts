import { z } from 'zod';

export const categoryValidationSchema = z.object({
  title: z
    .string()
    .min(8, 'Category title must be 5 charters')
    .max(30, "category title can't be more than 30 characters"),
    image:z.string().optional(),
    createdAt:z.date().optional(),
    updatedAt:z.date().optional()
});


