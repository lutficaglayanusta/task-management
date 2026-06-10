import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { env } from "../utils/env.js";
import Session from "../db/models/session.js";
import User from "../db/models/user.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    next(createHttpError(401, "Please provide authorization header"));
    return;
  }
  const bearer = authHeader.split(" ")[0];
  const token = authHeader.split(" ")[1];

  if (!token || bearer !== "Bearer") {
    next(createHttpError(401, "Auth header should be of type Bearer"));
    return;
  }

  const session = await Session.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, "Session not found"));
    return;
  }

  try {
    jwt.verify(token, env("JWT_SECRET"));

    const user = await User.findById(session.userId);

    if (!user) {
      next(createHttpError(401, "User not found"));
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    next(createHttpError(401, "Access token expired"));
  }
};
