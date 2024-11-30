import { z } from 'zod';
import { genderType, RoleType } from './user.constance';

const userRegistrationZodValidation = z.object({
  name: z.string().min(5, 'Name at least 5 characters'),
  password: z.string().min(8, 'Password at least 8 characters'),
  email: z.string().email('Invalid email'),
  role: z.nativeEnum(RoleType).default(RoleType.user),
  gender: z.nativeEnum(genderType).optional(),
  phone: z.string().optional(),
  photo: z.string().optional(),
  isDelated: z.boolean().default(false),
  isBlocked: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  resetPasswordToken: z.string().optional(),
  resetPasswordExpiresAt: z.date().optional(),
  verificationToken: z.string().optional(),
  verificationTokenExpiresAt: z.date().optional(),
  craetedAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const userValidation = {
  userRegistrationZodValidation,
};
