import { CustomError } from "./custom-error";

export default class NotAuthorized extends CustomError {
  statusCode = 401;
  reason = "Not authorized";
  constructor() {
    super("Not authorized");
    Object.setPrototypeOf(this, NotAuthorized.prototype);
  }
  serialize() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
