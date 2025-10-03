import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { InvalidCredentialsException } from "../exceptions/InvalidCredentialsException";
import type { IUserRepository } from "../repositories/IUserRepository";

export class AuthService {
  constructor(private repository: IUserRepository) {}

  async login(email: string, password: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const passwordMatch = await compare(password, user.getPassword());

    if (!passwordMatch) {
      throw new InvalidCredentialsException();
    }

    const accessToken = sign({ sub: user.getId(), email: user.getEmail() }, process.env.AUTH_SECRET!, {
      expiresIn: "1h",
    });

    return {
      accessToken,
    };
  }
}
