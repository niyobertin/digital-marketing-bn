import { Router } from "express";
import userRoutes from "./users.routes";

const appRoutes = Router();

appRoutes.use('/users',userRoutes);

export default appRoutes;