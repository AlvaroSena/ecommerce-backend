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
import { VariantNotFoundException } from "../exceptions/VariantNotFoundException";

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

  async getProductVariantById(id: string): Promise<ProductVariantResponseDTO> {
    const productVariant = await this.repository.findById(id);

    if (!productVariant) {
      throw new VariantNotFoundException();
    }

    return {
      id: productVariant.getId(),
      title: productVariant.getTitle(),
      imagesUrls: productVariant.getImagesUrls(),
      slug: productVariant.getSlug(),
      priceInCents: productVariant.getPriceInCents(),
      productId: productVariant.getProductId(),
    };
  }

  async getProductVariantBySlug(slug: string): Promise<ProductVariantResponseDTO> {
    const productVariant = await this.repository.findBySlug(slug);

    if (!productVariant) {
      throw new VariantNotFoundException();
    }

    return {
      id: productVariant.getId(),
      title: productVariant.getTitle(),
      imagesUrls: productVariant.getImagesUrls(),
      slug: productVariant.getSlug(),
      priceInCents: productVariant.getPriceInCents(),
      productId: productVariant.getProductId(),
    };
  }

  async getAllProductVariants(): Promise<ProductVariantResponseDTO[]> {
    const productVariants = await this.repository.findAll();

    return productVariants.map((variant) => ({
      id: variant.getId(),
      title: variant.getTitle(),
      imagesUrls: variant.getImagesUrls(),
      slug: variant.getSlug(),
      priceInCents: variant.getPriceInCents(),
      productId: variant.getProductId(),
    }));
  }

  async updateProductVariant(id: string, dto: UpdateProductVariantDTO): Promise<ProductVariantResponseDTO> {
    const productVariantExists = await this.repository.findById(id);

    if (!productVariantExists) {
      throw new VariantNotFoundException();
    }

    const productVariant = new ProductVariant(
      dto.title,
      productVariantExists.getImagesUrls(),
      productVariantExists.getSlug(),
      dto.price,
      productVariantExists.getProductId(),
    );

    const updatedProductVariant = await this.repository.update(id, productVariant);

    return {
      id: updatedProductVariant.getId(),
      title: updatedProductVariant.getTitle(),
      imagesUrls: updatedProductVariant.getImagesUrls(),
      slug: updatedProductVariant.getSlug(),
      priceInCents: updatedProductVariant.getPriceInCents(),
      productId: updatedProductVariant.getProductId(),
    };
  }

  async removeProductVariant(id: string): Promise<void> {
    const productVariantExists = await this.repository.findById(id);

    if (!productVariantExists) {
      throw new VariantNotFoundException();
    }

    await this.repository.delete(id);
  }
}
