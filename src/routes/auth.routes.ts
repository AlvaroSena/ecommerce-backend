import { Router, Request, Response, NextFunction } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthService } from "../services/AuthService";
import { UserRepository } from "../repositories/UserRepository";
import { verify } from "jsonwebtoken";

export const authRoutes = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRoutes.post("/login", (request: Request, response: Response, next: NextFunction) =>
  authController.postLogin(request, response, next),
);

authRoutes.post("/logout", (request: Request, response: Response, next: NextFunction) =>
  authController.postLogout(request, response, next),
);

authRoutes.get("/me", (request: Request, response: Response, next: NextFunction) => {
  const token = request.cookies.token;

  if (!token) return response.sendStatus(401);

  try {
    const decoded = verify(token, process.env.AUTH_SECRET!);
    response.json({ user: decoded });
  } catch {
    response.sendStatus(403);
  }
});
