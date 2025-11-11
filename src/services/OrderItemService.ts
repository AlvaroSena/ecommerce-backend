import {
  CreateOrderItemDTO,
  OrderItemResponseDTO,
  UpdateOrderItemDTO,
} from "../dtos/OrderItemDTO";
import { ResourceNotFoundException } from "../exceptions/ResourceNotFoundException";
import { OrderItem } from "../models/OrderItemModel";
import { IOrderItemRepository } from "../repositories/IOrderItemRepository";
import { IOrderRepository } from "../repositories/IOrderRepository";

export class OrderItemService {
  constructor(
    private repository: IOrderItemRepository,
    private orderRepository: IOrderRepository,
  ) {}

  async createOrderItem(
    dto: CreateOrderItemDTO,
  ): Promise<OrderItemResponseDTO> {
    const order = await this.orderRepository.findById(dto.orderId);

    if (!order) {
      throw new ResourceNotFoundException("Order not found.");
    }

    const unitPriceInCents = dto.unitPrice * 100;

    const orderItem = new OrderItem(
      dto.orderId,
      dto.quantity,
      unitPriceInCents,
    );

    const createdOrderItem = await this.repository.create(orderItem);

    return {
      id: createdOrderItem.getId(),
      orderId: createdOrderItem.getOrderId(),
      quantity: createdOrderItem.getQuantity(),
      unitPriceInCents: createdOrderItem.getUnitPriceInCents(),
    };
  }

  async getOrderItemById(id: string): Promise<OrderItemResponseDTO> {
    const orderItem = await this.repository.findById(id);

    if (!orderItem) {
      throw new ResourceNotFoundException("Order not found.");
    }

    return {
      id: orderItem.getId(),
      orderId: orderItem.getOrderId(),
      quantity: orderItem.getQuantity(),
      unitPriceInCents: orderItem.getUnitPriceInCents(),
    };
  }

  async getAllOrderItemsByOrderId(
    orderId: string,
  ): Promise<OrderItemResponseDTO[]> {
    const orderItems = await this.repository.findAllByOrderId(orderId);

    return orderItems.map((orderItem) => ({
      id: orderItem.getId(),
      orderId: orderItem.getOrderId(),
      quantity: orderItem.getQuantity(),
      unitPriceInCents: orderItem.getUnitPriceInCents(),
    }));
  }

  async updateOrderItem(
    id: string,
    dto: UpdateOrderItemDTO,
  ): Promise<OrderItemResponseDTO> {
    const orderItemExists = await this.repository.findById(id);

    if (!orderItemExists) {
      throw new ResourceNotFoundException("Order item not found.");
    }

    const unitPriceInCents = dto.unitPrice * 100;

    const orderItem = new OrderItem(
      orderItemExists.getOrderId(),
      dto.quantity,
      unitPriceInCents,
    );

    const updatedOrderItem = await this.repository.update(id, orderItem);

    return {
      id: updatedOrderItem.getId(),
      orderId: updatedOrderItem.getOrderId(),
      quantity: updatedOrderItem.getQuantity(),
      unitPriceInCents: updatedOrderItem.getUnitPriceInCents(),
    };
  }

  async removeOrderItem(id: string): Promise<void> {
    const orderItemExists = await this.repository.findById(id);

    if (!orderItemExists) {
      throw new ResourceNotFoundException("Order item not found.");
    }

    await this.repository.delete(id);
  }
}
