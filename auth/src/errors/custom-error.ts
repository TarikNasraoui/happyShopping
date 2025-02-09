export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super();
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serialize(): { message: string; field?: string }[];
}
