import mongoose from "mongoose";
import { env } from "../utils/env.js";

export const connectMongoDB = async () => {
  const username = env("DB_USERNAME");
  const password = env("DB_PASSWORD");
  const url = env("DB_URL");
  const database = env("DB_DATABASE");

  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@${url}/${database}`,
    );
    console.log("Mongo db success");
  } catch (error) {
    console.log("Mongo db failed");
  }
};
