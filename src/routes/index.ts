import { Router } from "express";
import userRoutes from "./users.routes";
import productsRoutes from "./products.routes";
const appRoutes = Router();

appRoutes.use('/users',userRoutes);
appRoutes.use('/products',productsRoutes);

export default appRoutes;