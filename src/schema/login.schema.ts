import * as Joi from "joi";

export const LoginSchema = Joi.object({
    email:Joi.string().email(),
    password: Joi.string().min(6).max(20).required()
});