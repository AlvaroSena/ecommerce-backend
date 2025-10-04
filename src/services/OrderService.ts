import {
  CreateOrderDTO,
  OrderResponseDTO,
  UpdateOrderDTO,
} from "../dtos/OrderDTO";
import { ResourceNotFoundException } from "../exceptions/ResourceNotFoundException";
import { Order } from "../models/OrderModel";
import { IOrderRepository } from "../repositories/IOrderRepository";

export class OrderService {
  constructor(private repository: IOrderRepository) {}

  async createOrder(
    userId: string,
    dto: CreateOrderDTO,
  ): Promise<OrderResponseDTO> {
    const totalInCents = dto.total * 100;

    const order = new Order(
      userId,
      "pending",
      totalInCents,
      dto.shippingAddress,
    );

    const createdOrder = await this.repository.create(order);
    return {
      id: createdOrder.getId(),
      userId: createdOrder.getUserId(),
      status: createdOrder.getStatus(),
      total: createdOrder.getTotalInCents(),
      shippingAddress: createdOrder.getShippingAddress(),
    };
  }

  async getOrderById(id: string): Promise<OrderResponseDTO> {
    const order = await this.repository.findById(id);

    if (!order) {
      throw new ResourceNotFoundException("Order not found.");
    }

    return {
      id: order.getId(),
      userId: order.getUserId(),
      status: order.getStatus(),
      total: order.getTotalInCents(),
      shippingAddress: order.getShippingAddress(),
    };
  }

  async getAllOrders(): Promise<OrderResponseDTO[]> {
    const orders = await this.repository.findAll();

    return orders.map((order) => ({
      id: order.getId(),
      userId: order.getUserId(),
      status: order.getStatus(),
      total: order.getTotalInCents(),
      shippingAddress: order.getShippingAddress(),
    }));
  }

  async updateOrder(
    id: string,
    dto: UpdateOrderDTO,
  ): Promise<OrderResponseDTO> {
    const orderExists = await this.repository.findById(id);

    if (!orderExists) {
      throw new ResourceNotFoundException("Order not found.");
    }

    const order = new Order(
      orderExists.getUserId(),
      dto.status,
      orderExists.getTotalInCents(),
      dto.shippingAddress,
    );

    const updatedOrder = await this.repository.update(id, order);

    return {
      id: updatedOrder.getId(),
      userId: updatedOrder.getUserId(),
      status: updatedOrder.getStatus(),
      total: updatedOrder.getTotalInCents(),
      shippingAddress: updatedOrder.getShippingAddress(),
    };
  }

  async removeOrder(id: string): Promise<void> {
    const orderExists = await this.repository.findById(id);

    if (!orderExists) {
      throw new ResourceNotFoundException("Order not found.");
    }

    await this.repository.delete(id);
  }
}
