import { genderType, RoleType } from './user.constance';

export interface IUser extends Document {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: keyof typeof RoleType;
  gender?: keyof typeof genderType;
  isDeleted?: boolean;
  isBlocked?: boolean;
  isVerified:boolean;
  photo?: string;
  verificationToken?:string;
  verificationTokenExpiresAt?:Date
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;
  createdAt?: string;
  updatedAt?: string;
}
