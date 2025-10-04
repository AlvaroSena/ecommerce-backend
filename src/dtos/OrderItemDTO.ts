export interface CreateOrderItemDTO {
  orderId: string;
  quantity: number;
  unitPrice: number;
}

export interface UpdateOrderItemDTO {
  quantity: number;
  unitPrice: number;
}

export interface OrderItemResponseDTO {
  id?: string;
  orderId: string;
  quantity: number;
  unitPriceInCents: number;
}
