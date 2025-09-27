import { Request, Response, NextFunction } from "express";
import type { ProductService } from "../services/ProductService";
import type { CreateProductDTO, UpdateProductDTO } from "../dtos/ProductDTO";

export class ProductController {
  constructor(private service: ProductService) {}

  async postProduct(request: Request, response: Response, next: NextFunction) {
    const body: CreateProductDTO = request.body;

    try {
      if (body.title.length < 3) {
        return response.status(400).json({ error: "Title must have a least 3 characters" });
      }

      if (body.description.length < 6) {
        return response.status(400).json({ error: "Description must have a least 6 characters" });
      }

      const product = await this.service.createProduct(body);

      return response.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }

  async getProducts(request: Request, response: Response, next: NextFunction) {
    try {
      const products = await this.service.getAllProducts();

      return response.json(products);
    } catch (err) {
      next(err);
    }
  }

  async getProduct(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;

    try {
      const product = await this.service.getProductById(id);

      return response.json(product);
    } catch (err) {
      next(err);
    }
  }

  async getProductBySlug(request: Request, response: Response, next: NextFunction) {
    const slug: string = request.params.slug;

    try {
      const product = await this.service.getProductBySlug(slug);

      return response.json(product);
    } catch (err) {
      next(err);
    }
  }

  async putProduct(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;
    const body: UpdateProductDTO = request.body;

    try {
      if (body.title.length < 3) {
        return response.status(400).json({ error: "Title must have a least 3 characters" });
      }

      if (body.description.length < 6) {
        return response.status(400).json({ error: "Description must have a least 6 characters" });
      }

      const product = await this.service.updateProduct(id, body);

      return response.json(product);
    } catch (err) {
      next(err);
    }
  }

  async deleteProduct(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;

    try {
      await this.service.removeProduct(id);

      return response.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
