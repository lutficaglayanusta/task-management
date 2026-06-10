import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
} from "../controller/auth.js";

const router = Router();

router.post("/register", ctrlWrapper(registerController));
router.post("/login", ctrlWrapper(loginController));
router.get("/logout", ctrlWrapper(logoutController));
router.get("/refresh", ctrlWrapper(refreshController));

export default router;
