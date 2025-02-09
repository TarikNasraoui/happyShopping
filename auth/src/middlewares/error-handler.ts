import { Response, Request, NextFunction } from "express";

import { CustomError } from "../errors/custom-error";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serialize() });
  }

  res.status(400).send({ errors: [{ message: "Somthing wrong" }] });
};
