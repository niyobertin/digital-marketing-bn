import { hashSync } from 'bcryptjs'

export const hashedPassword = async (password: string) => {
    const hashpass = await hashSync(password);
    return hashpass;
}