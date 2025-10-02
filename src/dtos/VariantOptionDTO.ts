export interface CreateVariantOptionDTO {
  name: string;
  productVariantId: string;
}

export interface UpdateVariantOptionDTO {
  id: string;
  name: string;
}

export interface VariantOptionResponseDTO {
  id?: string;
  name: string;
  productVariantId: string;
}
