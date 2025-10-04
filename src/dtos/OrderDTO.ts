import { OrderStatus } from "../models/OrderModel";

export interface CreateOrderDTO {
  total: number;
  shippingAddress: string;
}

export interface UpdateOrderDTO {
  status: OrderStatus;
  shippingAddress: string;
}

export interface OrderResponseDTO {
  id?: string;
  userId: string;
  status: OrderStatus;
  total: number;
  shippingAddress: string;
}
