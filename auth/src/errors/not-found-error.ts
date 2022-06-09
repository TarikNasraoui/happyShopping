import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Data base error");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serialize() {
    return [{ message: "Route not found" }];
  }
}
