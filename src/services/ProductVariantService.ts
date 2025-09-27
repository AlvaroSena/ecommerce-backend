import { ProductNotFoundException } from "../exceptions/ProductNotFoundException";
import { ProductVariant } from "../models/ProductVariantModel";
import { slugify } from "../utils/slugify";
import type {
  CreateProductVariantDTO,
  ProductVariantResponseDTO,
  UpdateProductVariantDTO,
} from "../dtos/ProductVariantDTO";
import type { IProductRepository } from "../repositories/IProductRepository";
import type { IProductVariantRepository } from "../repositories/IProductVariantRepository";

export class ProductVariantService {
  constructor(private repository: IProductVariantRepository, private productRepository: IProductRepository) {}

  async createProductVariant(dto: CreateProductVariantDTO): Promise<ProductVariantResponseDTO> {
    const productExists = await this.productRepository.findById(dto.productId);

    if (!productExists) {
      throw new ProductNotFoundException();
    }

    const productVariant = new ProductVariant(
      dto.title,
      dto.imagesUrls,
      slugify(dto.title),
      dto.price * 100,
      dto.productId,
    );

    const createdProductVariant = await this.repository.create(productVariant);

    return {
      id: createdProductVariant.getId(),
      title: createdProductVariant.getTitle(),
      imagesUrls: createdProductVariant.getImagesUrls(),
      slug: createdProductVariant.getSlug(),
      priceInCents: createdProductVariant.getPriceInCents(),
      productId: createdProductVariant.getProductId(),
    };
  }

  async getProductVariantById(id: string): Promise<ProductVariantResponseDTO> {}

  async getProductVariantBySlug(slug: string): Promise<ProductVariantResponseDTO> {}

  async getAllProductVariants(): Promise<ProductVariantResponseDTO[]> {}

  async updateProductVariant(
    userId: string,
    id: string,
    dto: UpdateProductVariantDTO,
  ): Promise<ProductVariantResponseDTO> {}

  async removeProductVariant(id: string): Promise<void> {}
}
