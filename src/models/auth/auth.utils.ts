import bcryptjs from 'bcryptjs';

export const isPasswordMatched = async (
  password: string,
  hashPassword: string,
) => {
  const passwordMatched = await bcryptjs.compare(password, hashPassword);
  return passwordMatched;
};
