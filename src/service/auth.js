import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../db/models/user.js";
import Session from "../db/models/session.js";
import { env } from "../utils/env.js";

export const registerService = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, "There is already an email like that");
  }
  const hashPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await User.create({ ...payload, password: hashPassword });

  return newUser;
};
export const loginService = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(404, "There is no such email");
  }
  const isCorrect = await bcrypt.compare(payload.password, user.password);

  if (!isCorrect) {
    throw createHttpError(401, "Password is incorrect");
  }

  await Session.deleteOne({ userId: user._id });

  const accessToken = jwt.sign(
    {
      sub: user._id,
      email: payload.email,
    },
    env("JWT_SECRET"),
    {
      expiresIn: "15m",
    },
  );
  const refreshToken = jwt.sign(
    {
      sub: user._id,
      email: payload.email,
    },
    env("JWT_SECRET"),
    {
      expiresIn: "1d",
    },
  );
  const session = await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
  });
  return session;
};
export const logoutService = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};
export const refreshService = async ({ refreshToken, sessionId }) => {
  const session = await Session.findOne({ refreshToken, _id: sessionId });
  const user = await User.findById(session.userId);

  if (!session) {
    throw createHttpError(404, "Session not found");
  }
  try {
    jwt.verify(session.refreshToken, env("JWT_SECRET"));

    const accessToken = jwt.sign(
      {
        sub: session.userId,
        email: user.email,
      },
      env("JWT_SECRET"),
      {
        expiresIn: "15m",
      },
    );
    const newRefreshToken = jwt.sign(
      {
        sub: session.userId,
        email: user.email,
      },
      env("JWT_SECRET"),
      {
        expiresIn: "1d",
      },
    );
    await Session.deleteOne({ _id: sessionId, refreshToken });

    return await Session.create({
      userId: session.userId,
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    throw createHttpError(401, "Session refresh token expired");
  }
};
