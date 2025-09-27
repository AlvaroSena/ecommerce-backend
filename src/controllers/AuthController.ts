import { Request, Response, NextFunction } from "express";
import type { AuthService } from "../services/AuthService";

export class AuthController {
  constructor(private service: AuthService) {}

  async postLogin(request: Request, response: Response, next: NextFunction) {
    const body: { email: string; password: string } = request.body;

    try {
      if (!body.email.includes("@")) {
        response.status(400).json({ message: "Invalid email." });
      }

      if (body.password.length < 6) {
        response.status(400).json({ message: "Password is too short" });
      }

      const token = await this.service.login(body.email, body.password);

      return response.status(201).json(token);
    } catch (err) {
      next(err);
    }
  }
}
