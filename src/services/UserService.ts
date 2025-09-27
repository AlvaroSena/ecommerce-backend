import { hash } from "bcryptjs";
import { User } from "../models/UserModel";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import { EmailAlreadyTakenException } from "../exceptions/EmailAlreadyTakenException";
import type { IUserRepository } from "../repositories/IUserRepository";
import type { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from "../dtos/UserDTO";

export class UserService {
  constructor(private repository: IUserRepository) {}

  async createUser(dto: CreateUserDTO): Promise<UserResponseDTO> {
    const userAlreadyExists = await this.repository.findByEmail(dto.email);

    if (userAlreadyExists) {
      throw new EmailAlreadyTakenException();
    }

    const user = new User(dto.name, dto.email, await hash(dto.password, 6));
    const createdUser = await this.repository.create(user);

    return {
      id: createdUser.getId(),
      name: createdUser.getName(),
      email: createdUser.getEmail(),
    };
  }

  async getUserById(id: string): Promise<UserResponseDTO> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
    };
  }

  async getAllUsers(): Promise<UserResponseDTO[]> {
    const users = await this.repository.findAll();

    return users.map((user) => ({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
    }));
  }

  async updateUser(id: string, dto: UpdateUserDTO): Promise<UserResponseDTO> {
    const userFound = await this.repository.findById(id);

    if (!userFound) {
      throw new UserNotFoundException();
    }

    const user = new User(dto.name, dto.email, userFound.getPassword());

    const updatedUser = await this.repository.update(id, user);

    return {
      id: updatedUser.getId(),
      name: updatedUser.getName(),
      email: updatedUser.getEmail(),
    };
  }

  async removeUser(id: string): Promise<void> {
    const userFound = await this.repository.findById(id);

    if (!userFound) {
      throw new UserNotFoundException();
    }

    await this.repository.delete(id);
  }
}
