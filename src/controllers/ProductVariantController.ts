import { Request, Response, NextFunction } from "express";
import type { ProductVariantService } from "../services/ProductVariantService";
import type { CreateProductVariantDTO, UpdateProductVariantDTO } from "../dtos/ProductVariantDTO";

export class ProductVariantController {
  constructor(private service: ProductVariantService) {}

  async postProductVariant(request: Request, response: Response, next: NextFunction) {
    const body: CreateProductVariantDTO = request.body;

    try {
      if (body.title.length < 3) {
        return response.status(400).json({ error: "Title must have a least 3 characters" });
      }

      if (!body.price) {
        return response.status(400).json({ error: "Missing price" });
      }

      const productVariant = await this.service.createProductVariant(body);

      return response.status(201).json(productVariant);
    } catch (err) {
      next(err);
    }
  }

  async getProductVariants(request: Request, response: Response, next: NextFunction) {
    try {
      const productVariants = await this.service.getAllProductVariants();

      return response.json(productVariants);
    } catch (err) {
      next(err);
    }
  }

  async getProductVariant(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;

    try {
      const productVariant = await this.service.getProductVariantById(id);

      return response.json(productVariant);
    } catch (err) {
      next(err);
    }
  }

  async getProductVariantBySlug(request: Request, response: Response, next: NextFunction) {
    const slug: string = request.params.slug;

    try {
      const productVariant = await this.service.getProductVariantBySlug(slug);

      return response.json(productVariant);
    } catch (err) {
      next(err);
    }
  }

  async putProductVariant(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;
    const body: UpdateProductVariantDTO = request.body;

    try {
      if (body.title.length < 3) {
        return response.status(400).json({ error: "Title must have a least 3 characters" });
      }

      if (!body.price) {
        return response.status(400).json({ error: "Missing price" });
      }

      const productVariant = await this.service.updateProductVariant(id, body);

      return response.json(productVariant);
    } catch (err) {
      next(err);
    }
  }

  async deleteProductVariant(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;

    try {
      await this.service.removeProductVariant(id);

      return response.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
