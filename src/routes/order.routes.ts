import { Router, Request, Response, NextFunction } from "express";

import { restVerifyCustomerToken } from "../middlewares/restVerifyCustomerToken";
import { OrderService } from "../services/OrderService";
import { OrderRepository } from "../repositories/OrderRepository";
import { OrderController } from "../controllers/OrderController";

export const orderRoutes = Router();

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

orderRoutes.post(
  "/",
  restVerifyCustomerToken,
  (request: Request, response: Response, next: NextFunction) =>
    orderController.postOrder(request, response, next),
);

orderRoutes.get(
  "/",
  (request: Request, response: Response, next: NextFunction) =>
    orderController.getOrders(request, response, next),
);

orderRoutes.get(
  "/:id",
  (request: Request, response: Response, next: NextFunction) =>
    orderController.getOrder(request, response, next),
);

orderRoutes.put(
  "/update/:id",
  restVerifyCustomerToken,
  (request: Request, response: Response, next: NextFunction) =>
    orderController.putOrder(request, response, next),
);

orderRoutes.delete(
  "/delete/:id",
  restVerifyCustomerToken,
  (request: Request, response: Response, next: NextFunction) =>
    orderController.deleteOrder(request, response, next),
);
