import { Order } from "../models/OrderModel";

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>;
  findAll(): Promise<Order[] | []>;
  create(order: Order): Promise<Order>;
  update(id: string, order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
}
