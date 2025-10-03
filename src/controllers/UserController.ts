import { Request, Response, NextFunction } from "express";
import type { UserService } from "../services/UserService";
import type { CreateUserDTO, UpdateUserDTO } from "../dtos/UserDTO";

export class UserController {
  constructor(private service: UserService) {}

  async postUser(request: Request, response: Response, next: NextFunction) {
    const body: CreateUserDTO = request.body;

    try {
      if (body.name.length < 3) {
        return response.status(400).json({ error: "Name must have a least 6 characters" });
      }

      if (!body.email.includes("@")) {
        return response.status(400).json({ error: "Invalid email." });
      }

      if (body.password.length < 6) {
        return response.status(400).json({ error: "Password must have a least 6 characters" });
      }

      const user = await this.service.createUser(body);

      return response.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async getUsers(request: Request, response: Response, next: NextFunction) {
    try {
      const users = await this.service.getAllUsers();

      return response.json(users);
    } catch (err) {
      next(err);
    }
  }

  async getUser(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;

    try {
      const user = await this.service.getUserById(id);

      return response.json(user);
    } catch (err) {
      next(err);
    }
  }

  async getUserProfile(request: Request, response: Response, next: NextFunction) {
    const { sub } = request.user as { sub: string };

    try {
      const user = await this.service.getUserProfile(sub);

      return response.json({
        user: user.name,
      });
    } catch (err) {
      next(err);
    }
  }

  async putUser(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;
    const body: UpdateUserDTO = request.body;

    try {
      if (body.name.length < 3) {
        return response.status(400).json({ error: "Name must have a least 6 characters" });
      }

      if (!body.email.includes("@")) {
        return response.status(400).json({ error: "Invalid email." });
      }

      const user = await this.service.updateUser(id, body);

      return response.json(user);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;

    try {
      await this.service.removeUser(id);

      return response.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
