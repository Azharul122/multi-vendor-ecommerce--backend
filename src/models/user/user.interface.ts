import { genderType, RoleType } from './user.constance';

export interface IUser extends Document{
  id?: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: keyof typeof RoleType;
  gender?: keyof typeof genderType;
  isDeleted?: boolean;
  isBlocked?: boolean;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
}
