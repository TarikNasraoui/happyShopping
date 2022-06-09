import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  reason = "Error connecting to databases";
  statusCode = 500;
  constructor() {
    super("Data base error");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serialize() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
