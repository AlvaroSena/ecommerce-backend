import { eq } from "drizzle-orm";
import { db } from "../database";
import { productVariants } from "../database/schema";
import { ProductVariant } from "../models/ProductVariantModel";
import type { IProductVariantRepository } from "./IProductVariantRepository";

export class ProductVariantRepository implements IProductVariantRepository {
  async findById(id: string): Promise<ProductVariant | null> {
    const result = await db.select().from(productVariants).where(eq(productVariants.id, id));

    if (result.length >= 1) {
      const productVariant = new ProductVariant(
        result[0].title,
        result[0].imagesUrls ?? [],
        result[0].slug,
        result[0].priceInCents,
        result[0].productId,
        result[0].id,
      );

      return productVariant;
    }

    return null;
  }

  async findBySlug(slug: string): Promise<ProductVariant | null> {
    const result = await db.select().from(productVariants).where(eq(productVariants.slug, slug));

    if (result.length >= 1) {
      const productVariant = new ProductVariant(
        result[0].title,
        result[0].imagesUrls ?? [],
        result[0].slug,
        result[0].priceInCents,
        result[0].productId,
        result[0].id,
      );

      return productVariant;
    }

    return null;
  }

  async findAll(): Promise<ProductVariant[] | []> {
    const result = await db.select().from(productVariants);

    return result.map(
      (variant) =>
        new ProductVariant(
          variant.title,
          variant.imagesUrls ?? [],
          variant.slug,
          variant.priceInCents,
          variant.productId,
          variant.id,
        ),
    );
  }

  async create(productVariant: ProductVariant): Promise<ProductVariant> {
    const result = await db
      .insert(productVariants)
      .values({
        title: productVariant.getTitle(),
        imagesUrls: productVariant.getImagesUrls(),
        slug: productVariant.getSlug(),
        priceInCents: productVariant.getPriceInCents(),
        productId: productVariant.getProductId(),
      })
      .returning();

    return new ProductVariant(
      result[0].title,
      result[0].imagesUrls ?? [],
      result[0].slug,
      result[0].priceInCents,
      result[0].productId,
      result[0].id,
    );
  }

  async update(id: string, productVariant: ProductVariant): Promise<ProductVariant> {
    const result = await db
      .update(productVariants)
      .set({
        title: productVariant.getTitle(),
        priceInCents: productVariant.getPriceInCents(),
      })
      .where(eq(productVariants.id, id))
      .returning();

    return new ProductVariant(
      result[0].title,
      result[0].imagesUrls ?? [],
      result[0].slug,
      result[0].priceInCents,
      result[0].productId,
      result[0].id,
    );
  }

  async delete(id: string): Promise<void> {
    await db.delete(productVariants).where(eq(productVariants.id, id));
  }

  async updateImages(id: string, urls: string[]): Promise<string[]> {
    const result = await db
      .update(productVariants)
      .set({
        imagesUrls: urls,
      })
      .where(eq(productVariants.id, id))
      .returning();

    return result[0].imagesUrls ?? [];
  }
}
