export interface CreateVariantOptionValueDTO {
  value: string;
  isSoldOut: boolean;
  variantOptionId: string;
}

export interface UpdateVariantOptionValueDTO {
  id: string;
  value: string;
  isSoldOut: boolean;
}

export interface VariantOptionValueResponseDTO {
  id?: string;
  value: string;
  isSoldOut: boolean;
  variantOptionId: string;
}
