export class Exception extends Error {
  public readonly statusCode: number;

  constructor(message: string, code: number = 404) {
    super(message);
    this.statusCode = code;
  }
}
