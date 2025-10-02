import { Router } from "express";
import { userRoutes } from "./user.routes";
import { productRoutes } from "./product.routes";
import { authRoutes } from "./auth.routes";
import { productVariantRoutes } from "./product-variants.routes";
import {variantOptionRoutes} from "./variant-option.routes";

export const routes = Router();
routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/products", productRoutes);
routes.use("/variants", productVariantRoutes);
routes.use("/variants/options", variantOptionRoutes);

