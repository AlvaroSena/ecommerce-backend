import { VariantOptionValue } from "../models/VariantOptionValueModel";

export interface IVariantOptionValueRepository {
  findById(id: string): Promise<VariantOptionValue | null>;
  findAllByOptionId(optionId: string): Promise<VariantOptionValue[] | []>;
  create(variantOptionValue: VariantOptionValue): Promise<VariantOptionValue>;
  update(
    id: string,
    productVariant: VariantOptionValue,
  ): Promise<VariantOptionValue>;
  updateIsSoldOut(id: string, isSoldOut: boolean): Promise<void>;
  delete(id: string): Promise<void>;
}
