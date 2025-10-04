import type {
  CreateVariantOptionValueDTO,
  UpdateVariantOptionValueDTO,
  VariantOptionValueResponseDTO,
} from "../dtos/VariantOptionValueDTO";
import type { IVariantOptionValueRepository } from "../repositories/IVariantOptionValueRepository";
import { ResourceNotFoundException } from "../exceptions/ResourceNotFoundException";
import { VariantOptionValue } from "../models/VariantOptionValueModel";
import { IVariantOptionRepository } from "../repositories/IVariantOptionRepository";

export class VariantOptionValueService {
  constructor(
    private repository: IVariantOptionValueRepository,
    private variantOptionRepository: IVariantOptionRepository,
  ) {}

  async createVariantValueOption(
    dto: CreateVariantOptionValueDTO,
  ): Promise<VariantOptionValueResponseDTO> {
    const option = await this.variantOptionRepository.findById(
      dto.variantOptionId,
    );

    if (!option) {
      throw new ResourceNotFoundException("Option not found.");
    }

    const optionValue = new VariantOptionValue(
      dto.value,
      dto.isSoldOut,
      dto.variantOptionId,
    );
    const createdOptionValue = await this.repository.create(optionValue);

    return {
      id: createdOptionValue.getId(),
      value: createdOptionValue.getValue(),
      isSoldOut: createdOptionValue.getIsSoldOut(),
      variantOptionId: createdOptionValue.getVariantOptionId(),
    };
  }

  async getVariantOptionValueById(
    id: string,
  ): Promise<VariantOptionValueResponseDTO> {
    const optionValue = await this.repository.findById(id);

    if (!optionValue) {
      throw new ResourceNotFoundException("Option value not found");
    }

    return {
      id: optionValue.getId(),
      value: optionValue.getValue(),
      isSoldOut: optionValue.getIsSoldOut(),
      variantOptionId: optionValue.getVariantOptionId(),
    };
  }

  async getAllVariantOptionValues(
    optionId: string,
  ): Promise<VariantOptionValueResponseDTO[]> {
    const optionExists = await this.variantOptionRepository.findById(optionId);

    if (!optionExists) {
      throw new ResourceNotFoundException("Option not found.");
    }

    const optionValues = await this.repository.findAllByOptionId(optionId);

    return optionValues.map((value) => ({
      id: value.getId(),
      value: value.getValue(),
      isSoldOut: value.getIsSoldOut(),
      variantOptionId: value.getVariantOptionId(),
    }));
  }

  async updateVariantOptionValue(
    id: string,
    dto: UpdateVariantOptionValueDTO,
  ): Promise<VariantOptionValueResponseDTO> {
    const optionValueExists = await this.repository.findById(id);

    if (!optionValueExists) {
      throw new ResourceNotFoundException("Option value not found");
    }

    const optionValue = new VariantOptionValue(
      dto.value,
      dto.isSoldOut,
      optionValueExists.getVariantOptionId(),
    );

    const updatedOptionValue = await this.repository.update(id, optionValue);

    return {
      id: updatedOptionValue.getId(),
      value: updatedOptionValue.getValue(),
      isSoldOut: updatedOptionValue.getIsSoldOut(),
      variantOptionId: updatedOptionValue.getVariantOptionId(),
    };
  }

  async updateVariantOptionValueIsSoldOut(
    id: string,
    isSoldOut: boolean,
  ): Promise<void> {
    const optionValueExists = await this.repository.findById(id);

    if (!optionValueExists) {
      throw new ResourceNotFoundException("Option value not found");
    }

    await this.repository.updateIsSoldOut(id, isSoldOut);
  }

  async removeVariantOptionValue(id: string): Promise<void> {
    const optionValueExists = await this.repository.findById(id);

    if (!optionValueExists) {
      throw new ResourceNotFoundException("Option value not found");
    }

    await this.repository.delete(id);
  }
}
