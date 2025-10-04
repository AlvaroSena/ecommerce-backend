import { Router, Request, Response, NextFunction } from "express";

import { restVerifyCustomerToken } from "../middlewares/restVerifyCustomerToken";
import { OrderItemController } from "../controllers/OrderItemController";
import { OrderItemService } from "../services/OrderItemService";
import { OrderItemRepository } from "../repositories/OrderItemRepository";
import { OrderRepository } from "../repositories/OrderRepository";
import { restVerifyAdminToken } from "../middlewares/restVerifyAdminToken";

export const orderItemRoutes = Router();

const orderRepository = new OrderRepository();
const orderItemRepository = new OrderItemRepository();
const orderItemService = new OrderItemService(
  orderItemRepository,
  orderRepository,
);
const orderItemController = new OrderItemController(orderItemService);

orderItemRoutes.post(
  "/",
  restVerifyCustomerToken,
  restVerifyAdminToken,
  (request: Request, response: Response, next: NextFunction) =>
    orderItemController.postOrderItem(request, response, next),
);

orderItemRoutes.get(
  "/orderId/:orderId",
  restVerifyCustomerToken,
  restVerifyAdminToken,
  (request: Request, response: Response, next: NextFunction) =>
    orderItemController.getOrderItemsByOrderId(request, response, next),
);

orderItemRoutes.get(
  "/:id",
  restVerifyCustomerToken,
  restVerifyAdminToken,
  (request: Request, response: Response, next: NextFunction) =>
    orderItemController.getOrderItem(request, response, next),
);

orderItemRoutes.put(
  "/update/:id",
  restVerifyAdminToken,
  (request: Request, response: Response, next: NextFunction) =>
    orderItemController.putOrderItem(request, response, next),
);

orderItemRoutes.delete(
  "/delete/:id",
  restVerifyAdminToken,
  (request: Request, response: Response, next: NextFunction) =>
    orderItemController.deleteOrderItem(request, response, next),
);
