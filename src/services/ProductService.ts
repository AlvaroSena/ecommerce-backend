import { Product } from "../models/ProductModel";
import { slugify } from "../utils/slugify";
import { ProductNotFoundException } from "../exceptions/ProductNotFoundException";
import type { IProductRepository } from "../repositories/IProductRepository";
import type {
  CreateProductDTO,
  UpdateProductDTO,
  ProductResponseDTO,
} from "../dtos/ProductDTO";

export class ProductService {
  constructor(private repository: IProductRepository) {}

  async createProduct(
    userId: string,
    dto: CreateProductDTO,
  ): Promise<ProductResponseDTO> {
    const product = new Product(
      dto.title,
      dto.description,
      slugify(dto.title),
      userId,
    );

    const createdProduct = await this.repository.create(product);

    return {
      id: createdProduct.getId(),
      title: createdProduct.getTitle(),
      description: createdProduct.getDescription(),
      slug: createdProduct.getSlug(),
      userId: createdProduct.getUserId(),
    };
  }

  async getProductById(id: string): Promise<ProductResponseDTO> {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new ProductNotFoundException();
    }

    return {
      id: product.getId(),
      title: product.getTitle(),
      description: product.getDescription(),
      slug: product.getSlug(),
      userId: product.getUserId(),
    };
  }

  async getProductBySlug(slug: string): Promise<ProductResponseDTO> {
    const product = await this.repository.findBySlug(slug);

    if (!product) {
      throw new ProductNotFoundException();
    }

    return {
      id: product.getId(),
      title: product.getTitle(),
      description: product.getDescription(),
      slug: product.getSlug(),
      userId: product.getUserId(),
    };
  }

  async getAllProducts(): Promise<ProductResponseDTO[]> {
    const products = await this.repository.findAll();

    return products.map((product) => ({
      id: product.getId(),
      title: product.getTitle(),
      description: product.getDescription(),
      slug: product.getSlug(),
      userId: product.getUserId(),
    }));
  }

  async updateProduct(
    userId: string,
    id: string,
    dto: UpdateProductDTO,
  ): Promise<ProductResponseDTO> {
    const productExists = await this.repository.findById(id);

    if (!productExists) {
      throw new ProductNotFoundException();
    }

    const product = new Product(
      dto.title,
      dto.description,
      slugify(dto.title),
      userId,
    );

    const updatedProduct = await this.repository.update(id, product);

    return {
      id: updatedProduct.getId(),
      title: updatedProduct.getTitle(),
      description: updatedProduct.getDescription(),
      slug: updatedProduct.getSlug(),
      userId: updatedProduct.getUserId(),
    };
  }

  async removeProduct(id: string): Promise<void> {
    const productExists = await this.repository.findById(id);

    if (!productExists) {
      throw new ProductNotFoundException();
    }

    await this.repository.delete(id);
  }
}
