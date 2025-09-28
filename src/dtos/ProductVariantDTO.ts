export interface CreateProductVariantDTO {
  title: string;
  imagesUrls: string[];
  price: number;
  productId: string;
}

export interface UpdateProductVariantDTO {
  title: string;
  price: number;
}

export interface UploadProductVariantImagesDTO {
  files: Express.Multer.File[];
}

export interface ProductVariantResponseDTO {
  id?: string;
  title: string;
  imagesUrls: string[];
  slug: string;
  priceInCents: number;
  productId: string;
}
