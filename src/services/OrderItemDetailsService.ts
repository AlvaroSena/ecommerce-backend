import {
  CreateOrderItemDetailsDTO,
  OrderItemDetailsResponseDTO,
} from "../dtos/OrderItemDetailsDTO";
import { UpdateOrderItemDTO } from "../dtos/OrderItemDTO";
import { ResourceNotFoundException } from "../exceptions/ResourceNotFoundException";
import { OrderItem } from "../models/OrderItemModel";
import { IOrderItemRepository } from "../repositories/IOrderItemRepository";

export class OrderItemDetailsService {
  constructor(private repository: IOrderItemRepository) {}

  async createOrderItem(
    dto: CreateOrderItemDetailsDTO,
  ): Promise<OrderItemDetailsResponseDTO> {}

  async getOrderItemById(id: string): Promise<OrderItemDetailsResponseDTO> {}

  async getAllOrderItemsByOrderId(
    orderId: string,
  ): Promise<OrderItemDetailsResponseDTO[]> {}

  async updateOrderItem(
    id: string,
    dto: UpdateOrderItemDTO,
  ): Promise<OrderItemDetailsResponseDTO> {}

  async removeOrderItem(id: string): Promise<void> {}
}
