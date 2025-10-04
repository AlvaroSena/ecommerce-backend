import { eq } from "drizzle-orm";
import { db } from "../database";
import { orderItems } from "../database/schema";
import { OrderItem } from "../models/OrderItem";
import { IOrderItemRepository } from "./IOrderItemRepository";

export class OrderItemRepository implements IOrderItemRepository {
  async findById(id: string): Promise<OrderItem | null> {
    const result = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.id, id));

    if (result.length >= 1) {
      return new OrderItem(
        result[0].orderId,
        result[0].quantity,
        result[0].unitPriceInCents,
        result[0].id,
      );
    }

    return null;
  }

  async findAllByOrderId(orderId: string): Promise<OrderItem[] | []> {
    const result = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, orderId));

    return result.map((item) => {
      return new OrderItem(
        item.orderId,
        item.quantity,
        item.unitPriceInCents,
        item.id,
      );
    });
  }

  async create(orderItem: OrderItem): Promise<OrderItem> {
    const result = await db
      .insert(orderItems)
      .values({
        orderId: orderItem.getOrderId(),
        quantity: orderItem.getQuantity(),
        unitPriceInCents: orderItem.getUnitPriceInCents(),
      })
      .returning();

    return new OrderItem(
      result[0].orderId,
      result[0].quantity,
      result[0].unitPriceInCents,
      result[0].id,
    );
  }

  async update(id: string, orderItem: OrderItem): Promise<OrderItem> {
    const result = await db
      .update(orderItems)
      .set({
        quantity: orderItem.getQuantity(),
        unitPriceInCents: orderItem.getUnitPriceInCents(),
      })
      .where(eq(orderItems.id, id))
      .returning();

    return new OrderItem(
      result[0].orderId,
      result[0].quantity,
      result[0].unitPriceInCents,
      result[0].id,
    );
  }

  async delete(id: string): Promise<void> {
    await db.delete(orderItems).where(eq(orderItems.id, id));
  }
}
