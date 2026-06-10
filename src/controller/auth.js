import { ONE_DAY } from "../constants/index.js";
import {
  loginService,
  logoutService,
  refreshService,
  registerService,
} from "../service/auth.js";

export const registerController = async (req, res) => {
  const user = await registerService(req.body);

  res.status(201).json({
    message: "Registration was successful",
    data: user,
  });
};
export const loginController = async (req, res) => {
  const session = await loginService(req.body);

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.status(200).json({
    message: "The login was successful",
    data: {
      token: session.accessToken,
    },
  });
};
export const logoutController = async (req, res) => {
  if (req.cookies) {
    await logoutService(req.cookies.sessionId);
  }
  res.clearCookie("sessionId");
  res.clearCookie("refreshToken");

  res.status(204).send();
};
export const refreshController = async (req, res) => {
  const session = await refreshService({
    refreshToken: req.cookies.refreshToken,
    sessionId: req.cookies.sessionId,
  });

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.status(201).json({
    message: "The refresh was successfully applied",
    data: {
      token: session.accessToken,
    },
  });
};
