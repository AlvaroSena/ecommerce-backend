import {VariantOptionValue} from "../models/VariantOptionValueModel";

export interface IVariantOptionValueRepository {
  findById(id: string): Promise<VariantOptionValue | null>;
  findAll(): Promise<VariantOptionValue[] | []>;
  create(variantOptionValue: VariantOptionValue): Promise<VariantOptionValue>;
  update(id: string, productVariant: VariantOptionValue): Promise<VariantOptionValue>;
  delete(id: string): Promise<void>;
}
