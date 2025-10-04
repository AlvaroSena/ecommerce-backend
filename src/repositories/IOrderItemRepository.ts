import { OrderItem } from "../models/OrderItem";

export interface IOrderItemRepository {
  findById(id: string): Promise<OrderItem | null>;
  findAllByOrderId(orderId: string): Promise<OrderItem[] | []>;
  create(orderItem: OrderItem): Promise<OrderItem>;
  update(id: string, orderItem: OrderItem): Promise<OrderItem>;
  delete(id: string): Promise<void>;
}
