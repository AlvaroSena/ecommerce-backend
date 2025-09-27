import { Exception } from "./Exception";

export class InvalidCredentialsException extends Exception {
  constructor() {
    super("Email or password is incorrect.", 401);
  }
}
