import { Router } from "express";
import { createUser,getUsers, usersLogin } from "../controllers/users.controller";
import { userRegisterSchema } from "../schema/register.schema";
import { emailValidation,validateSchema } from "../middlewares/validator";
import { LoginSchema } from "../schema/login.schema";

const userRoutes = Router();
userRoutes.get('/',getUsers);
userRoutes.post('/register',emailValidation,validateSchema(userRegisterSchema),createUser);
userRoutes.post('/login',emailValidation,validateSchema(LoginSchema),usersLogin);

export default userRoutes;