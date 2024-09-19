import { Router } from "express";
import { createUser,getUsers } from "../controllers/users.controller";
import { userRegisterSchema } from "../schema/register.schema";
import { emailValidation,validateSchema } from "../middlewares/validator";

const userRoutes = Router();
userRoutes.get('/',getUsers);
userRoutes.post('/register',emailValidation,validateSchema(userRegisterSchema),createUser);

export default userRoutes;