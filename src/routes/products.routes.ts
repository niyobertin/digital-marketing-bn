import { Router } from "express";
import { getAllProducts,getSingleProduct,addProducts,
    updateProduct,removeProducts
 } from "../controllers/products.controller";
import { upload } from "../utils/uploadImage";
import { validateSchema } from "../middlewares/validator";
import { productDataSchema,updateProductSchema } from "../schema/productSchema";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { isAseller } from "../middlewares/adminSeller";


const productsRoutes = Router();
productsRoutes.get('/',getAllProducts);
productsRoutes.get('/:id',getSingleProduct);
productsRoutes.post("/", isLoggedIn, isAseller, upload.array("images"), validateSchema(productDataSchema), addProducts);
productsRoutes.patch("/:id", isLoggedIn, isAseller, upload.array("images"), validateSchema(updateProductSchema), updateProduct);
productsRoutes.delete("/:id", isLoggedIn, isAseller, removeProducts);
export default productsRoutes;
