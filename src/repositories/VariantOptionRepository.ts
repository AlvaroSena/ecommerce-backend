import { VariantOption } from "../models/VariantOptionModel";
import {IVariantOptionRepository} from "./IVariantOptionRepository";
import {db} from "../database";
import {variantOptions} from "../database/schema";
import {eq} from "drizzle-orm";

export class VariantOptionRepository implements IVariantOptionRepository {
  async findById(id: string): Promise<VariantOption | null> {
    const result = await db.select().from(variantOptions).where(eq(variantOptions.id, id));

    if (result.length >= 1) {
      const variantOption = new VariantOption(result[0].name, result[1].productVariantId, result[2].id);

      return variantOption;
    }

    return null;
  }

  async findAll(): Promise<VariantOption[] | []> {
    // const result = await db.select().from(variantOptions);
    //
    // return result;
  }

  create(productVariant: VariantOption): Promise<VariantOption> {
      throw new Error("Method not implemented.");
  }

  update(id: string, productVariant: VariantOption): Promise<VariantOption> {
      throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
      throw new Error("Method not implemented.");
  }
}