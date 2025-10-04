import { Router, Request, Response, NextFunction } from "express";
import { VariantOptionController } from "../controllers/VariantOptionController";
import { VariantOptionService } from "../services/VariantOptionService";
import { VariantOptionRepository } from "../repositories/VariantOptionRepository";
import { ProductVariantRepository } from "../repositories/ProductVariantRepository";
import { restVerifyToken } from "../middlewares/restVerifyToken";

export const variantOptionRoutes = Router();

const productVariantRepository = new ProductVariantRepository();
const variantOptionRepository = new VariantOptionRepository();
const variantOptionService = new VariantOptionService(
  variantOptionRepository,
  productVariantRepository,
);
const variantOptionController = new VariantOptionController(
  variantOptionService,
);

variantOptionRoutes.post(
  "/",
  restVerifyToken,
  (request: Request, response: Response, next: NextFunction) =>
    variantOptionController.postVariantOption(request, response, next),
);

variantOptionRoutes.get(
  "/",
  (request: Request, response: Response, next: NextFunction) =>
    variantOptionController.getVariantOptions(request, response, next),
);

variantOptionRoutes.get(
  "/:id",
  (request: Request, response: Response, next: NextFunction) =>
    variantOptionController.getVariantOption(request, response, next),
);

variantOptionRoutes.put(
  "/update/:id",
  restVerifyToken,
  (request: Request, response: Response, next: NextFunction) =>
    variantOptionController.putVariantOption(request, response, next),
);

variantOptionRoutes.delete(
  "/delete/:id",
  restVerifyToken,
  (request: Request, response: Response, next: NextFunction) =>
    variantOptionController.deleteVariantOption(request, response, next),
);
