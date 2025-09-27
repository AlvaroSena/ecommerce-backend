import { eq, sql } from "drizzle-orm";
import { db } from "../database";
import { users } from "../database/schema";
import { User } from "../models/User";
import type { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.id, id));

    if (result) {
      const user = new User(result[0].name, result[0].email, result[0].passwordHash, result[0].id);

      return user;
    }

    return null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.email, email));

    if (result.length >= 1) {
      const user = new User(result[0].name, result[0].email, result[0].passwordHash, result[0].id);

      return user;
    }

    return null;
  }

  async findAll(): Promise<User[] | []> {
    const result = await db.select({ id: users.id, name: users.name, email: users.email }).from(users);

    return result.map((user) => new User(user.name, user.email, "", user.id));
  }

  async create(user: User): Promise<User> {
    const result = await db
      .insert(users)
      .values({
        name: user.getName(),
        email: user.getEmail(),
        passwordHash: user.getPassword(),
      })
      .returning();

    return new User(result[0].name, result[0].email, result[0].passwordHash, result[0].id);
  }

  async update(user: User): Promise<User> {
    const result = await db
      .update(users)
      .set({
        name: user.getName(),
        email: user.getEmail(),
        updatedAt: sql`NOW()`,
      })
      .where(eq(users.id, user.getId() ?? ""))
      .returning();

    return new User(result[0].name, result[0].email, result[0].passwordHash, result[0].id);
  }

  async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }
}
