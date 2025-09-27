export interface CreateProductDTO {
  title: string;
  description: string;
  userId: string;
}

export interface UpdateProductDTO {
  title: string;
  description: string;
}

export interface ProductResponseDTO {
  id?: string;
  title: string;
  description: string;
  slug: string;
  userId: string;
}
