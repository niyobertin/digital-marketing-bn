import { IUser } from "../../type";
import { User } from "../database/models/users.model";
import { hashedPassword } from "../utils/hashPassword";

export const getAllUsers = async() =>{
    const users = await User.find();
   return users;
} 

export const userRegister = async(user:IUser) => {
    const isUserExist = await User.findOne({email:user.email});
    if(isUserExist){
        return null
    }
    const hashPassword = await hashedPassword(user.password);
    let users:IUser;

    users = await User.create({
            firstName:user.firstName,
            secondName:user.secondName,
            gender:user.gender,
            dob:user.dob,
            email:user.email,
            role:user.role,
            password:hashPassword
    });
    return users;
}