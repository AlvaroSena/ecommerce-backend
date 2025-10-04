import { userRoleEnum } from "../database/schema";

export type UserRole = (typeof userRoleEnum.enumValues)[number];

export class User {
  constructor(
    private name: string,
    private email: string,
    private password: string,
    private role: UserRole,
    private id?: string,
  ) {}

  public getId() {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getEmail() {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getPassword() {
    return this.password;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  public getRole() {
    return this.role;
  }

  public setRole(role: UserRole) {
    this.role = role;
  }
}
