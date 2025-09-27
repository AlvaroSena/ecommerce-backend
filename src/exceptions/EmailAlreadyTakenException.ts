import { Exception } from "./Exception";

export class EmailAlreadyTakenException extends Exception {
  constructor() {
    super("Email already taken.", 409);
  }
}
