import {
  CreateVariantOptionDTO,
  UpdateVariantOptionDTO,
  VariantOptionResponseDTO,
} from "../dtos/VariantOptionDTO";
import { IVariantOptionRepository } from "../repositories/IVariantOptionRepository";
import { IProductVariantRepository } from "../repositories/IProductVariantRepository";
import { VariantOption } from "../models/VariantOptionModel";
import { ResourceNotFoundException } from "../exceptions/ResourceNotFoundException";

export class VariantOptionService {
  constructor(
    private repository: IVariantOptionRepository,
    private variantRepository: IProductVariantRepository,
  ) {}

  async createVariantOption(
    dto: CreateVariantOptionDTO,
  ): Promise<VariantOptionResponseDTO> {
    const variant = await this.variantRepository.findById(dto.productVariantId);

    if (!variant) {
      throw new ResourceNotFoundException("Variant not found.");
    }

    const variantOption = new VariantOption(dto.name, dto.productVariantId);

    const createdVariantOption = await this.repository.create(variantOption);

    return {
      id: createdVariantOption.getId(),
      name: createdVariantOption.getName(),
      productVariantId: createdVariantOption.getProductVariantId(),
    };
  }

  async getVariantOptionById(id: string): Promise<VariantOptionResponseDTO> {
    const variantOption = await this.repository.findById(id);

    if (!variantOption) {
      throw new ResourceNotFoundException("Variant not found.");
    }

    return {
      id: variantOption.getId(),
      name: variantOption.getName(),
      productVariantId: variantOption.getProductVariantId(),
    };
  }

  async getAllVariantOptions(): Promise<VariantOptionResponseDTO[]> {
    const variantOptions = await this.repository.findAll();

    return variantOptions.map((option) => ({
      id: option.getId(),
      name: option.getName(),
      productVariantId: option.getProductVariantId(),
    }));
  }

  async updateVariantOption(
    dto: UpdateVariantOptionDTO,
  ): Promise<VariantOptionResponseDTO> {
    const variantOptionExists = await this.repository.findById(dto.id);

    if (!variantOptionExists) {
      throw new ResourceNotFoundException("Variant not found.");
    }

    const variantOption = new VariantOption(
      dto.name,
      variantOptionExists.getProductVariantId(),
    );

    const updatedVariantOption = await this.repository.update(
      dto.id,
      variantOption,
    );

    return {
      id: updatedVariantOption.getId(),
      name: updatedVariantOption.getName(),
      productVariantId: updatedVariantOption.getProductVariantId(),
    };
  }

  async removeVariantOption(id: string): Promise<void> {
    const variantOptionExists = await this.repository.findById(id);

    if (!variantOptionExists) {
      throw new ResourceNotFoundException("Variant not found.");
    }

    await this.repository.delete(id);
  }
}
