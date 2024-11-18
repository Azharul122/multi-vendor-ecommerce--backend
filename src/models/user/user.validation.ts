import { z } from 'zod';
import { genderType, RoleType } from './user.constance';

const userRegistrationZodValidation = z.object({
  name: z.string().min(5, 'Name is required'),
  password: z.string().min(8, 'Password at least 8 character'),
  email: z.string().email('Invalid email'),
  role: z.nativeEnum(RoleType).default(RoleType.user),
  gender: z.nativeEnum(genderType).optional(),
  phone: z.string().optional(),
  photo: z.string().optional(),
  isDelated: z.boolean().default(false),
  isBlocked: z.boolean().default(false),
  craetedAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const userValidation = {
  userRegistrationZodValidation,
};
