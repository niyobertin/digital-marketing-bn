import { Request,Response } from "express";
import { IUser } from "../../type";
import { userRegister,getAllUsers } from "../services/users.service";

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
  