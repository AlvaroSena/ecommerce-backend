import { Request, Response, NextFunction } from "express";

import {
  CreateVariantOptionValueDTO,
  UpdateVariantOptionValueDTO,
} from "../dtos/VariantOptionValueDTO";
import { VariantOptionValueService } from "../services/VariantOptionValeuService";

export class VariantOptionValueController {
  constructor(private service: VariantOptionValueService) {}

  async postVariantValueOption(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const body: CreateVariantOptionValueDTO = request.body;

    try {
      if (!body.value) {
        return response.status(400).json({ error: "Missing option value" });
      }

      if (!body.isSoldOut) {
        return response.status(400).json({ error: "Missing is sold out." });
      }

      if (!body.variantOptionId) {
        return response
          .status(400)
          .json({ error: "Missing variant option id" });
      }

      const optionValue = await this.service.createVariantValueOption(body);

      return response.status(201).json(optionValue);
    } catch (err) {
      next(err);
    }
  }

  async getVariantOptionValues(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async getVariantOptionValue(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const id: string = request.params.id;

    try {
      if (!id) {
        return response.status(400).json({ error: "Missing id." });
      }
    } catch (err) {
      next(err);
    }
  }

  async putVariantOptionValue(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const id: string = request.params.id;
    const body: UpdateVariantOptionValueDTO = request.body;

    try {
      if (!body.value) {
        return response.status(400).json({ error: "Missing option value" });
      }

      if (!body.isSoldOut) {
        return response.status(400).json({ error: "Missing is sold out." });
      }

      if (!id) {
        return response.status(400).json({ error: "Missing id." });
      }
    } catch (err) {
      next(err);
    }
  }

  async deleteVariantOptionValue(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const id: string = request.params.id;

    try {
    } catch (err) {
      next(err);
    }
  }
}
