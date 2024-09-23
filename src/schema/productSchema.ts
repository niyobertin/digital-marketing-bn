import Joi from "joi";
export const productDataSchema = Joi.object({
  name:Joi.string()
  .min(3)
  .max(40)
  .required(),
  description: Joi.string().required(),
  images: Joi.array().min(4).max(8),
  price:Joi.number()
  .required(),
  categories:Joi.string()
  .required(),
  createdBy:Joi.string(),
  createdAt:Joi.date()
});

// Validation schema for updating product
export const updateProductSchema = Joi.object({
  name: Joi.string().optional(), 

  description: Joi.string().optional(),

  categories:Joi.string().optional(),

  price: Joi.number().optional(),

  imagesToReplace: Joi.array()
    .items(Joi.number().integer().min(0).label('Image Index'))
    .optional(), 
});

