import mongoose from "mongoose";
import { Schema, model} from 'mongoose';

interface IUser{
    firstName:string;
    secondName:String;
    gender:string;
    dob:Date;
    email:string;
    role:string;
    password:string;
}

const userSchema = new Schema(
    {
     firstName: {
        type: String,
        required: true,
     },
     secondName: {
        type: String,
        required: false,
     },
     gender: {
        type: String,
        required: true,
     },
     dob:{
        type:Date,
        required:true
     },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      role: {
        type: String,
        default: 'user',
      },
      password: {
        type: String,
        required: true,
      }
    }
  )
  
  
  
  const User = model<IUser>('User', userSchema)
  
  export { User}