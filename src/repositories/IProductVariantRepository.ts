import type { ProductVariant } from "../models/ProductVariantModel";

export interface IProductVariantRepository {
  findById(id: string): Promise<ProductVariant | null>;
  findBySlug(slug: string): Promise<ProductVariant | null>;
  findAll(): Promise<ProductVariant[] | []>;
  create(productVariant: ProductVariant): Promise<ProductVariant>;
  update(id: string, productVariant: ProductVariant): Promise<ProductVariant>;
  delete(id: string): Promise<void>;
  updateImages(id: string, urls: string[]): Promise<string[]>;
}
