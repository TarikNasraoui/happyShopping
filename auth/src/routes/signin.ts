import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
import { valiateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  valiateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Bad Credentiel");
    }
    const matchPassword = await Password.compare(
      existingUser.password,
      password
    );

    if (!matchPassword) {
      throw new BadRequestError("Bad Credentiel");
    }

    // Generate token
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );
    // store it in the session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(existingUser);
  }
);

export { router as signinRouter };
