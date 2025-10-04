import { Router, Request, Response, NextFunction } from "express";
import { restVerifyToken } from "../middlewares/restVerifyToken";
import { VariantOptionValueController } from "../controllers/VariantOptionValueController";
import { VariantOptionValueService } from "../services/VariantOptionValeuService";
import { VariantOptionValueRepository } from "../repositories/VariantOptionValueRepository";
import { VariantOptionRepository } from "../repositories/VariantOptionRepository";

export const variantOptionValueRoutes = Router();

const variantOptionRepository = new VariantOptionRepository();
const variantOptionValueRepository = new VariantOptionValueRepository();
const variantOptionValueService = new VariantOptionValueService(
  variantOptionValueRepository,
  variantOptionRepository,
);
const variantOptionValueController = new VariantOptionValueController(
  variantOptionValueService,
);

variantOptionValueRoutes.post(
  "/",
  restVerifyToken,
  (request: Request, response: Response, next: NextFunction) =>
    variantOptionValueController.postVariantValueOption(
      request,
      response,
      next,
    ),
);

variantOptionValueRoutes.get(
  "/",
  (request: Request, response: Response, next: NextFunction) =>
    variantOptionValueController.getVariantOptionValues(
      request,
      response,
      next,
    ),
);

variantOptionValueRoutes.get(
  "/:id",
  (request: Request, response: Response, next: NextFunction) =>
    variantOptionValueController.getVariantOptionValue(request, response, next),
);

variantOptionValueRoutes.put(
  "/update/:id",
  restVerifyToken,
  (request: Request, response: Response, next: NextFunction) =>
    variantOptionValueController.putVariantOptionValue(request, response, next),
);

variantOptionValueRoutes.delete(
  "/delete/:id",
  restVerifyToken,
  (request: Request, response: Response, next: NextFunction) =>
    variantOptionValueController.deleteVariantOptionValue(
      request,
      response,
      next,
    ),
);
