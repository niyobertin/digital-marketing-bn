import { compareSync } from 'bcryptjs';
export const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return await compareSync(plainPassword, hashedPassword);
};