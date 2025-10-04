export interface CreateOrderItemDetailsDTO {
  orderItemId: string;
  productVariantId: string;
  variantOptionId: string;
  variantOptionValueId: string;
}

export interface UpdateOrderItemDetailsDTO {
  productVariantId: string;
  variantOptionId: string;
  variantOptionValueId: string;
}

export interface OrderItemDetailsResponseDTO {
  id?: string;
}
