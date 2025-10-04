import { Request, Response, NextFunction } from "express";
import { OrderItemService } from "../services/OrderItemService";
import { CreateOrderItemDTO, UpdateOrderItemDTO } from "../dtos/OrderItemDTO";

export class OrderItemController {
  constructor(private service: OrderItemService) {}

  async postOrderItem(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const body: CreateOrderItemDTO = request.body;
    const { sub: userId } = request.user as { sub: string };

    try {
      if (!body.quantity || body.quantity <= 0) {
        return response.status(400).json({ error: "Missing quantity." });
      }

      if (!body.unitPrice || body.unitPrice <= 0) {
        return response.status(400).json({ error: "Missing unit price." });
      }

      if (!body.orderId) {
        return response.status(400).json({ error: "Missing order ID." });
      }

      const orderItem = await this.service.createOrderItem(body);
      return response.status(201).json(orderItem);
    } catch (err) {
      next(err);
    }
  }

  async getOrderItemsByOrderId(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const orderId = request.params.orderId;

      if (!orderId) {
        return response.status(400).json({ error: "Missing order ID." });
      }

      const orderItems = await this.service.getAllOrderItemsByOrderId(orderId);
      return response.status(200).json(orderItems);
    } catch (err) {
      next(err);
    }
  }

  async getOrderItem(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;

    try {
      if (!id) {
        return response.status(400).json({ error: "Missing order ID." });
      }

      const orderItem = await this.service.getOrderItemById(id);
      return response.status(200).json(orderItem);
    } catch (err) {
      next(err);
    }
  }

  async putOrderItem(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;
    const body: UpdateOrderItemDTO = request.body;
    const { sub: userId } = request.user as { sub: string };

    try {
      if (!body.quantity || body.quantity <= 0) {
        return response.status(400).json({ error: "Missing quantity." });
      }

      if (!body.unitPrice || body.unitPrice <= 0) {
        return response.status(400).json({ error: "Missing unit price." });
      }

      const updatedOrderItem = await this.service.updateOrderItem(id, body);
      return response.status(200).json(updatedOrderItem);
    } catch (err) {
      next(err);
    }
  }

  async deleteOrderItem(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const id: string = request.params.id;

    try {
      if (!id) {
        return response.status(400).json({ error: "Missing order ID." });
      }

      const deletedOrderItem = await this.service.removeOrderItem(id);
      return response.status(204).json(deletedOrderItem);
    } catch (err) {
      next(err);
    }
  }
}
