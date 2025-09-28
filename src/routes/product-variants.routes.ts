import { Router, Request, Response, NextFunction } from "express";
import { restVerifyToken } from "../middlewares/restVerifyToken";
import { ProductVariantController } from "../controllers/ProductVariantController";
import { ProductVariantService } from "../services/ProductVariantService";
import { ProductVariantRepository } from "../repositories/ProductVariantRepository";
import { ProductRepository } from "../repositories/ProductRepository";

export const productVariantRoutes = Router();

const productRepository = new ProductRepository();
const productVariantRepository = new ProductVariantRepository();
const productVariantService = new ProductVariantService(productVariantRepository, productRepository);
const productVariantController = new ProductVariantController(productVariantService);

productVariantRoutes.post("/", restVerifyToken, (request: Request, response: Response, next: NextFunction) =>
  productVariantController.postProductVariant(request, response, next),
);

productVariantRoutes.get("/", (request: Request, response: Response, next: NextFunction) =>
  productVariantController.getProductVariants(request, response, next),
);

productVariantRoutes.get("/:id", (request: Request, response: Response, next: NextFunction) =>
  productVariantController.getProductVariant(request, response, next),
);

productVariantRoutes.get("/slug/:slug", (request: Request, response: Response, next: NextFunction) =>
  productVariantController.getProductVariantBySlug(request, response, next),
);

productVariantRoutes.put("/update/:id", restVerifyToken, (request: Request, response: Response, next: NextFunction) =>
  productVariantController.putProductVariant(request, response, next),
);

productVariantRoutes.delete(
  "/delete/:id",
  restVerifyToken,
  (request: Request, response: Response, next: NextFunction) =>
    productVariantController.deleteProductVariant(request, response, next),
);
