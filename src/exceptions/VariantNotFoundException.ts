import { Exception } from "./Exception";

export class VariantNotFoundException extends Exception {
  constructor() {
    super("Variant not found", 404);
  }
}
