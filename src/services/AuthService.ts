import { compare } from "bcryptjs";
import { verify } from "jsonwebtoken";
import { InvalidCredentialsException } from "../exceptions/InvalidCredentialsException";
import { generateTokens } from "../utils/generateTokens";
import { ResourceNotFoundException } from "../exceptions/ResourceNotFoundException";
import type { IUserRepository } from "../repositories/IUserRepository";
import type { UserPayloadDTO } from "../dtos/UserPayloadDTO";

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

    const userId = user.getId();

    if (!userId) {
      throw new ResourceNotFoundException("User not found");
    }

    const { refreshToken, accessToken } = generateTokens({
      sub: userId,
      role: user.getRole(),
    });

    return {
      refreshToken,
      accessToken,
    };
  }

  async refresh(token: string) {
    const payload = verify(token, process.env.AUTH_SECRET!) as UserPayloadDTO;
    const { refreshToken, accessToken } = generateTokens({
      sub: payload.sub,
      role: payload.role,
    });

    return {
      refreshToken,
      accessToken,
    };
  }
}
