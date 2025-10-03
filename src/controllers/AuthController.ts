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

      const { accessToken: token } = await this.service.login(body.email, body.password);

      response.cookie("token", token, {
        httpOnly: true,
        secure: false, // 🔥 set true in production with HTTPS
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
      });

      return response.status(201).json({
        token,
      });
    } catch (err) {
      next(err);
    }
  }

  async postLogout(request: Request, response: Response, next: NextFunction) {
    response.clearCookie("token");
    response.json({ message: "Logged out" });
  }
}
