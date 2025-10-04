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

      if (body.isSoldOut === null) {
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
    const optionId = request.params.optionId;

    try {
      if (!optionId) {
        return response.status(400).json({ error: "Missing option id." });
      }

      const optionValues =
        await this.service.getAllVariantOptionValues(optionId);

      return response.json(optionValues);
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

      const optionValue = await this.service.getVariantOptionValueById(id);

      return response.json(optionValue);
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

      if (body.isSoldOut === null) {
        return response.status(400).json({ error: "Missing is sold out." });
      }

      if (!id) {
        return response.status(400).json({ error: "Missing id." });
      }

      const updatedOptionValue = await this.service.updateVariantOptionValue(
        id,
        body,
      );

      return response.json(updatedOptionValue);
    } catch (err) {
      next(err);
    }
  }

  async patchVariantOptionValue(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const id: string = request.params.id;
    const body: { isSoldOut: boolean } = request.body;

    try {
      if (body.isSoldOut === null) {
        return response.status(400).json({ error: "Missing is sold out." });
      }

      await this.service.updateVariantOptionValueIsSoldOut(id, body.isSoldOut);

      return response.status(204).send();
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
      await this.service.removeVariantOptionValue(id);

      return response.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
