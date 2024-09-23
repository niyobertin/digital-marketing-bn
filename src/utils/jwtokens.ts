import { sign, verify } from "jsonwebtoken";
import { IUser } from "../../type";

export const generateToken = async (user: IUser) => {
  const accessToken = sign(
    {
      name:user.secondName,
      email: user.email
    },
    `${process.env.JWT_SCRET}`,
    { expiresIn: "72h" },
  );
  return accessToken;
};