import { VariantOptionValue } from "../models/VariantOptionValueModel";
import {IVariantOptionValueRepository} from "./IVariantOptionValueRepository";
import {db} from "../database";
import {variantOptionsValues} from "../database/schema";
import {eq} from "drizzle-orm";

export class VariantOptionValueRepository implements IVariantOptionValueRepository {
  async findById(id: string): Promise<VariantOptionValue | null> {
    const result = await db.select().from(variantOptionsValues).where(eq(variantOptionsValues.id, id));

    if (result.length >= 1) {
      return new VariantOptionValue(result[0].value, result[0].isSoldOut, result[0].variantOptionId, result[0].id);
    }

    return null;
  }

  async findAll(): Promise<VariantOptionValue[] | []> {
    const result = await db.select().from(variantOptionsValues);

    return result.map((item) => new VariantOptionValue(item.value, item.isSoldOut, item.variantOptionId, item.id));
  }

  async create(variantOptionValue: VariantOptionValue): Promise<VariantOptionValue> {
    const result = await db.insert(variantOptionsValues).values({ value: variantOptionValue.getValue(), isSoldOut: variantOptionValue.getIsSoldOut(), variantOptionId: variantOptionValue.getVariantOptionId() }).returning();

    return new VariantOptionValue(result[0].value, result[0].isSoldOut, result[0].variantOptionId, result[0].id);
  }

  async update(id: string, productVariant: VariantOptionValue): Promise<VariantOptionValue> {
    const result = await db.update(variantOptionsValues).set({ value: productVariant.getValue(), isSoldOut: productVariant.getIsSoldOut() }).where(eq(variantOptionsValues.id, id)).returning();

    return new VariantOptionValue(result[0].value, result[0].isSoldOut, result[0].variantOptionId, result[0].id);
  }

  async delete(id: string): Promise<void> {
    await db.delete(variantOptionsValues).where(eq(variantOptionsValues.id, id));
  }

}