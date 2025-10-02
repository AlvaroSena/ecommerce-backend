import type { VariantOption } from "../models/VariantOptionModel";

export interface IVariantOptionRepository {
  findById(id: string): Promise<VariantOption | null>;
  findAll(): Promise<VariantOption[] | []>;
  create(variantOption: VariantOption): Promise<VariantOption>;
  update(id: string, productVariant: VariantOption): Promise<VariantOption>;
  delete(id: string): Promise<void>;
}
