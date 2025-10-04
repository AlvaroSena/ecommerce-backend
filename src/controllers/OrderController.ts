import { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/OrderService";
import { CreateOrderDTO, UpdateOrderDTO } from "../dtos/OrderDTO";

export class OrderController {
  constructor(private service: OrderService) {}

  async postOrder(request: Request, response: Response, next: NextFunction) {
    const body: CreateOrderDTO = request.body;
    const { sub: userId } = request.user as { sub: string };

    try {
      if (!body.shippingAddress) {
        return response
          .status(400)
          .json({ error: "Missing shipping address." });
      }

      if (!body.total) {
        return response.status(400).json({ error: "Missing total." });
      }

      const order = await this.service.createOrder(userId, body);

      return response.status(201).json(order);
    } catch (err) {
      next(err);
    }
  }

  async getOrders(request: Request, response: Response, next: NextFunction) {
    try {
      const orders = await this.service.getAllOrders();

      return response.json(orders);
    } catch (err) {
      next(err);
    }
  }

  async getOrder(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;

    try {
      if (!id) {
        return response.status(400).json({ error: "Missing order ID." });
      }

      const order = await this.service.getOrderById(id);

      return response.json(order);
    } catch (err) {
      next(err);
    }
  }

  async putOrder(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;
    const body: UpdateOrderDTO = request.body;
    const { sub: userId } = request.user as { sub: string };

    try {
      if (!body.shippingAddress) {
        return response
          .status(400)
          .json({ error: "Missing shipping address." });
      }

      if (!body.status) {
        return response.status(400).json({ error: "Missing status." });
      }

      const order = await this.service.updateOrder(id, body);

      return response.json(order);
    } catch (err) {
      next(err);
    }
  }

  async deleteOrder(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;

    try {
      if (!id) {
        return response.status(400).json({ error: "Missing order ID." });
      }

      await this.service.removeOrder(id);

      return response.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
