import { Router, Request, Response, NextFunction } from "express";
import { restVerifyAdminToken } from "../middlewares/restVerifyAdminToken";
import { ProductVariantController } from "../controllers/ProductVariantController";
import { ProductVariantService } from "../services/ProductVariantService";
import { ProductVariantRepository } from "../repositories/ProductVariantRepository";
import { ProductRepository } from "../repositories/ProductRepository";
import { upload } from "../config/multer";

export const productVariantRoutes = Router();

const productRepository = new ProductRepository();
const productVariantRepository = new ProductVariantRepository();
const productVariantService = new ProductVariantService(
  productVariantRepository,
  productRepository,
);
const productVariantController = new ProductVariantController(
  productVariantService,
);

productVariantRoutes.post(
  "/",
  restVerifyAdminToken,
  (request: Request, response: Response, next: NextFunction) =>
    productVariantController.postProductVariant(request, response, next),
);

productVariantRoutes.get(
  "/",
  (request: Request, response: Response, next: NextFunction) =>
    productVariantController.getProductVariants(request, response, next),
);

productVariantRoutes.get(
  "/:id",
  (request: Request, response: Response, next: NextFunction) =>
    productVariantController.getProductVariant(request, response, next),
);

productVariantRoutes.get(
  "/slug/:slug",
  (request: Request, response: Response, next: NextFunction) =>
    productVariantController.getProductVariantBySlug(request, response, next),
);

productVariantRoutes.put(
  "/update/:id",
  restVerifyAdminToken,
  (request: Request, response: Response, next: NextFunction) =>
    productVariantController.putProductVariant(request, response, next),
);

productVariantRoutes.delete(
  "/delete/:id",
  restVerifyAdminToken,
  (request: Request, response: Response, next: NextFunction) =>
    productVariantController.deleteProductVariant(request, response, next),
);

productVariantRoutes.patch(
  "/images/upload/:id",
  restVerifyAdminToken,
  upload.array("images"),
  (request: Request, response: Response, next: NextFunction) =>
    productVariantController.patchProductVariant(request, response, next),
);
