import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/user";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";
import { valiateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 3, max: 10 })
      .withMessage("Password must be between 4 and 20 characteres"),
  ],
  valiateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      throw new BadRequestError("Email in use");
      // res.status(400).send({ message: "Email already exist" });
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate token
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
    // store it in the session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
