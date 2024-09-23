import { Request,Response } from "express";
import { IUser } from "../../type";
import { userRegister,getAllUsers,userLogin } from "../services/users.service";
import { generateToken } from "../utils/jwtokens";
import { comparePasswords } from "../utils/comperePassword";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const usersData = await  getAllUsers();
        if(usersData){
            return res.status(200).json({
                status:200,
                count:usersData.length,
                data:usersData
            })
        }else{
            return res.status(404).json({
                status:404,
                data:'Users not found'
            })
        }
    } catch (err:any) {
        if(err){
            return res.status(500).json({ error: err });
        }
    }
}

export const createUser = async (req: Request, res: Response) => {
  
    try {
        const {firstName,secondName,gender,dob,email,role,password} = req.body
        const userData = {firstName,secondName,gender,dob,email,role,password}
      const user = await userRegister(userData);
      if (!user || user == null) {
        return res.status(409).json({
          status: 409,
          message: "User already exists",
        });
      }
      return res.status(201).json({
        status: 201,
        message: "Registration successful!"
      });
    } catch (err: any) {
      if (err.name === "UnauthorizedError" && err.message === "User already exists") {
        return res.status(409).json({ error: "User already exists" });
      }
      return res.status(500).json({ error: err });
    }
  };

  export const usersLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user:any = await userLogin(email);
    let accessToken;
    if(!user || user.length === 0){
      res.status(401).json({
        status: 401,
        message: " Invalid credentials!",
      });
    }else{
      const userInfo:any = {
        id:user[0]._id,
        firstName:user[0].firstName,
        secondName:user[0].secondName,
        role:user[0].role,
        email:user[0].email
      }
      accessToken  = await generateToken(userInfo)
      const isPasswordMatch = await comparePasswords(password,user[0].password);
      if(!isPasswordMatch){
        res.status(401).json({
          status: 401,
          message: " Invalid credentials!",
        });
      }else{
        return res.status(200).json({
          status: 200,
          message: "Logged in",
          data:userInfo,
          token: accessToken
        });
      }
    }
  } 