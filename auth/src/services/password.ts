import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
const asyncscrypt = promisify(scrypt);
export class Password {
  static async toHsash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await asyncscrypt(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  }
  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await asyncscrypt(suppliedPassword, salt, 64)) as Buffer;
    return buf.toString("hex") === hashedPassword;
  }
}
