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

      const { accessToken, refreshToken } = await this.service.login(body.email, body.password);

      response.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // 🔥 set true in production with HTTPS
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
      });

      return response.status(201).json({
        accessToken,
      });
    } catch (err) {
      next(err);
    }
  }

  async postLogout(request: Request, response: Response, next: NextFunction) {
    response.clearCookie("refreshToken");
    response.json({ message: "Logged out" });
  }

  async postRefresh(request: Request, response: Response, next: NextFunction) {
    const token = request.cookies.refreshToken;

    if (!token) return response.sendStatus(401);

    try {
      const { refreshToken, accessToken } = await this.service.refresh(token);

      response.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
      });

      return response.status(201).json({ accessToken });
    } catch (err) {
      next(err);
    }
  }
}
