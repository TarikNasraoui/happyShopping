import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import cookieSession from "cookie-session";

const app = express();
app.use(json());
app.set("trust proxy", true);
app.use(
  cookieSession({
    // secure: process.env.NODE_ENV !== "test",
    secure: false,
    signed: true,
    keys: ["key1"],
  })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);
app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
