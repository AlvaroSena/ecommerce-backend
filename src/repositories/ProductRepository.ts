import { eq } from "drizzle-orm";
import { db } from "../database";
import { products } from "../database/schema";
import { Product } from "../models/ProductModel";
import type { IProductRepository } from "./IProductRepository";

export class ProductRepository implements IProductRepository {
  async findById(id: string): Promise<Product | null> {
    const result = await db.select().from(products).where(eq(products.id, id));

    if (result.length >= 1) {
      const product = new Product(
        result[0].title,
        result[0].description,
        result[0].slug,
        result[0].userId,
        result[0].id,
      );

      return product;
    }

    return null;
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const result = await db.select().from(products).where(eq(products.slug, slug));

    if (result.length >= 1) {
      const product = new Product(
        result[0].title,
        result[0].description,
        result[0].slug,
        result[0].userId,
        result[0].id,
      );

      return product;
    }

    return null;
  }

  async findAll(): Promise<Product[] | []> {
    const result = await db.select().from(products);

    return result.map(
      (product) => new Product(product.title, product.description, product.slug, product.userId, product.id),
    );
  }

  async create(product: Product): Promise<Product> {
    const result = await db
      .insert(products)
      .values({
        title: product.getTitle(),
        description: product.getDescription(),
        slug: product.getSlug(),
        userId: product.getUserId(),
      })
      .returning();

    return new Product(result[0].title, result[0].description, result[0].slug, result[0].userId, result[0].id);
  }

  async update(id: string, product: Product): Promise<Product> {
    const result = await db
      .update(products)
      .set({
        title: product.getTitle(),
        description: product.getDescription(),
        slug: product.getSlug(),
      })
      .where(eq(products.id, id))
      .returning();

    return new Product(result[0].title, result[0].description, result[0].slug, result[0].userId, result[0].id);
  }

  async delete(id: string): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }
}
