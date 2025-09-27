import { Router, Request, Response, NextFunction } from "express";
import { ProductRepository } from "../repositories/ProductRepository";
import { ProductService } from "../services/ProductService";
import { ProductController } from "../controllers/ProductController";

export const productRoutes = Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

productRoutes.post("/", (request: Request, response: Response, next: NextFunction) =>
  productController.postProduct(request, response, next),
);

productRoutes.get("/", (request: Request, response: Response, next: NextFunction) =>
  productController.getProducts(request, response, next),
);

productRoutes.get("/:id", (request: Request, response: Response, next: NextFunction) =>
  productController.getProduct(request, response, next),
);

productRoutes.get("/slug/:slug", (request: Request, response: Response, next: NextFunction) =>
  productController.getProductBySlug(request, response, next),
);

productRoutes.put("/update/:id", (request: Request, response: Response, next: NextFunction) =>
  productController.putProduct(request, response, next),
);

productRoutes.delete("/delete/:id", (request: Request, response: Response, next: NextFunction) =>
  productController.deleteProduct(request, response, next),
);
