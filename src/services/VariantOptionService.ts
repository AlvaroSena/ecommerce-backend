import {CreateVariantOptionDTO, VariantOptionResponseDTO} from "../dtos/VariantOptionDTO";
import {IVariantOptionRepository} from "../repositories/IVariantOptionRepository";
import {IProductVariantRepository} from "../repositories/IProductVariantRepository";
import {VariantOption} from "../models/VariantOptionModel";
import {ResourceNotFoundException} from "../exceptions/ResourceNotFoundException";

export class VariantOptionService {
  constructor(private repository: IVariantOptionRepository, private variantRepository: IProductVariantRepository) {}

  async create(dto: CreateVariantOptionDTO): Promise<VariantOptionResponseDTO> {
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
    }

  }
}