import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface currentUserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: currentUserPayload;
    }
  }
}
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    next();
  }

  try {
    const user = jwt.verify(
      req.session?.jwt,
      process.env.JWT_KEY!
    ) as currentUserPayload;

    req.currentUser = user;
  } catch (error) {}
  next();
};
