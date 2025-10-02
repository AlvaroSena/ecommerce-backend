import { Request, Response, NextFunction } from "express";
import {CreateVariantOptionDTO, UpdateVariantOptionDTO} from "../dtos/VariantOptionDTO";
import {VariantOptionService} from "../services/VariantOptionService";

export class VariantOptionController {
  constructor(private service: VariantOptionService) {}

  async postVariantOption(request: Request, response: Response, next: NextFunction) {
    const body: CreateVariantOptionDTO = request.body;

    try {
      if (body.name.length < 3) {
        return response.status(400).json({ error: "Name must have a least 3 characters." });
      }

      if (!body.productVariantId) {
        return response.status(400).json({ error: "Missing product variant id." });
      }

      const productVariant = await this.service.createVariantOption(body)

      return response.status(201).json(productVariant);
    } catch (err) {
      next(err);
    }
  }

  async getVariantOptions(request: Request, response: Response, next: NextFunction) {
    try {
      const variantOptions = await this.service.getAllVariantOptions();

      return response.json(variantOptions);
    } catch (err) {
      next(err);
    }
  }

  async getVariantOption(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;

    try {
      if (!id) {
        return response.status(400).json({ error: "Missing id." });
      }

      const variantOption = await this.service.getVariantOptionById(id);

      return response.json(variantOption);
    } catch (err) {
      next(err);
    }
  }


  async putVariantOption(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;
    const body: UpdateVariantOptionDTO = request.body;

    try {
      if (body.name.length < 3) {
        return response.status(400).json({ error: "Name must have a least 3 characters" });
      }

      if (!id) {
        return response.status(400).json({ error: "Missing id." });
      }

      const updatedVariantOption = await this.service.updateVariantOption({ id, name: body.name });

      return response.status(201).json(updatedVariantOption);
    } catch (err) {
      next(err);
    }
  }

  async deleteVariantOption(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;

    try {
      if (!id) {
        return response.status(400).json({ error: "Missing id." });
      }

      await this.service.removeVariantOption(id);
    } catch (err) {
      next(err);
    }
  }
}
