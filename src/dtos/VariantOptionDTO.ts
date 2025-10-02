export interface CreateVariantOptionDTO {
  name: string;
  productVariantId: string;
}

export interface UpdateVariantOptionDTO {
  name: string;
}

export interface VariantOptionResponseDTO {
  id?: string;
  name: string;
  productVariantId: string;
}
