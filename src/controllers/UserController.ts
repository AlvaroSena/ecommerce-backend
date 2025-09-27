import { Request, Response } from "express";
import type { UserService } from "../services/UserService";
import type { CreateUserDTO } from "../dtos/UserDTO";

export class UserController {
  constructor(private service: UserService) {}

  async postUser(request: Request, response: Response) {
    const body: CreateUserDTO = request.body;

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
  }

  async getUsers(request: Request, response: Response) {
    const users = await this.service.getAllUsers();

    return response.json(users);
  }

  async getUser(request: Request, response: Response) {
    const id: string = request.params.id;

    const user = await this.service.getUserById(id);

    return response.json(user);
  }
}
