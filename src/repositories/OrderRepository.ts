import { eq } from "drizzle-orm";
import { db } from "../database";
import { orders } from "../database/schema";
import { Order } from "../models/OrderModel";
import { IOrderRepository } from "./IOrderRepository";

export class OrderRepository implements IOrderRepository {
  async findById(id: string): Promise<Order | null> {
    const result = await db.select().from(orders).where(eq(orders.id, id));

    if (result.length >= 1) {
      return new Order(
        result[0].userId,
        result[0].status,
        result[0].totalInCents,
        result[0].shippingAddress,
        result[0].id,
      );
    }

    return null;
  }

  async findAll(): Promise<Order[] | []> {
    const result = await db.select().from(orders);

    return result.map((order) => {
      return new Order(
        order.userId,
        order.status,
        order.totalInCents,
        order.shippingAddress,
        order.id,
      );
    });
  }

  async create(order: Order): Promise<Order> {
    const result = await db
      .insert(orders)
      .values({
        userId: order.getUserId(),
        status: order.getStatus(),
        totalInCents: order.getTotalInCents(),
        shippingAddress: order.getShippingAddress(),
      })
      .returning();

    return new Order(
      result[0].userId,
      result[0].status,
      result[0].totalInCents,
      result[0].shippingAddress,
      result[0].id,
    );
  }

  async update(id: string, order: Order): Promise<Order> {
    const result = await db
      .update(orders)
      .set({
        userId: order.getUserId(),
        status: order.getStatus(),
        totalInCents: order.getTotalInCents(),
        shippingAddress: order.getShippingAddress(),
      })
      .where(eq(orders.id, id))
      .returning();

    return new Order(
      result[0].userId,
      result[0].status,
      result[0].totalInCents,
      result[0].shippingAddress,
      result[0].id,
    );
  }

  async delete(id: string): Promise<void> {
    await db.delete(orders).where(eq(orders.id, id));
  }
}
