import { Exception } from "./Exception";

export class ResourceNotFoundException extends Exception {
  constructor(message?: string) {
    super(message ?? "Resource not found.", 404);
  }
}
