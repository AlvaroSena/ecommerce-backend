import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";

export const userRoutes = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.post("/", (request: Request, response: Response) => userController.postUser(request, response));
userRoutes.get("/", (request: Request, response: Response) => userController.getUsers(request, response));
userRoutes.get("/:id", (request: Request, response: Response) => userController.getUser(request, response));
userRoutes.put("/update/:id", (request: Request, response: Response) => userController.putUser(request, response));
userRoutes.delete("/delete/:id", (request: Request, response: Response) =>
  userController.deleteUser(request, response),
);
