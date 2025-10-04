import { VariantOption } from "../models/VariantOptionModel";
import { IVariantOptionRepository } from "./IVariantOptionRepository";
import { db } from "../database";
import { variantOptions } from "../database/schema";
import { eq } from "drizzle-orm";

export class VariantOptionRepository implements IVariantOptionRepository {
  async findById(id: string): Promise<VariantOption | null> {
    const result = await db
      .select()
      .from(variantOptions)
      .where(eq(variantOptions.id, id));

    if (result.length >= 1) {
      const variantOption = new VariantOption(
        result[0].name,
        result[0].productVariantId,
        result[0].id,
      );

      return variantOption;
    }

    return null;
  }

  async findAll(): Promise<VariantOption[] | []> {
    const result = await db.select().from(variantOptions);

    return result.map(
      (option) =>
        new VariantOption(option.name, option.productVariantId, option.id),
    );
  }

  async create(productVariant: VariantOption): Promise<VariantOption> {
    const result = await db
      .insert(variantOptions)
      .values({
        name: productVariant.getName(),
        productVariantId: productVariant.getProductVariantId(),
      })
      .returning();

    return new VariantOption(
      result[0].name,
      result[0].productVariantId,
      result[0].id,
    );
  }

  async update(
    id: string,
    productVariant: VariantOption,
  ): Promise<VariantOption> {
    const result = await db
      .update(variantOptions)
      .set({ name: productVariant.getName() })
      .where(eq(variantOptions.id, id))
      .returning();

    return new VariantOption(
      result[0].name,
      result[0].productVariantId,
      result[0].id,
    );
  }

  async delete(id: string): Promise<void> {
    await db.delete(variantOptions).where(eq(variantOptions.id, id));
  }
}
