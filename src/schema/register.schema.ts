import * as Joi from "joi";

export const userRegisterSchema = Joi.object({
    firstName:Joi.string().min(3).required(),
    secondName:Joi.string().optional(),
    gender:Joi.string().required(),
    dob:Joi.date(),
    email:Joi.string().email(),
    role: Joi.string().optional(),
    password: Joi.string().min(6).max(20).required()
});