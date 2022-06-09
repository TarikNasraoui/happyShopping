import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";
dotenv.config();
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connecting to auth db");
  } catch (error) {
    console.log(error);
  }
};

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

start();
