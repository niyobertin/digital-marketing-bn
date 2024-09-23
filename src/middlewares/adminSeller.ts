import {  Request,Response, NextFunction} from "express";
import { isLoggedIn } from "./isLoggedIn";
import { User } from "../database/models/users.model";
export const isAseller  = async(req:Request,res:Response,next:NextFunction) => {
  try {
    await isLoggedIn(req,res,() => {});
    //@ts-ignore
    const email  = req.user.email;
    const user: any = await User.findOne({email:email});
    if(user?.role === 'seller' || user?.role === 'admin'){
      next();
    }else{
      res.status(403).json({message:"Forbidden"});
    }
  } catch (error:any) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }    
}