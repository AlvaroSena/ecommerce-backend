import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import { restVerifyAdminToken } from "../middlewares/restVerifyAdminToken";

export const userRoutes = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.post(
  "/",
  (request: Request, response: Response, next: NextFunction) =>
    userController.postUser(request, response, next),
);
userRoutes.get(
  "/",
  (request: Request, response: Response, next: NextFunction) =>
    userController.getUsers(request, response, next),
);
userRoutes.get(
  "/:id",
  (request: Request, response: Response, next: NextFunction) =>
    userController.getUser(request, response, next),
);
userRoutes.put(
  "/update/:id",
  (request: Request, response: Response, next: NextFunction) =>
    userController.putUser(request, response, next),
);
userRoutes.delete(
  "/delete/:id",
  (request: Request, response: Response, next: NextFunction) =>
    userController.deleteUser(request, response, next),
);
userRoutes.get(
  "/profile/me",
  restVerifyAdminToken,
  (request: Request, response: Response, next: NextFunction) =>
    userController.getUserProfile(request, response, next),
);
