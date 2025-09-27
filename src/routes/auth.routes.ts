import { Router, Request, Response, NextFunction } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthService } from "../services/AuthService";
import { UserRepository } from "../repositories/UserRepository";

export const authRoutes = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRoutes.post("/login", (request: Request, response: Response, next: NextFunction) =>
  authController.postLogin(request, response, next),
);
