import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
} from "../controller/auth.js";
import { validateBody } from "../middleware/validateBody.js";
import { loginSchema, registerSchema } from "../validation/auth.js";

const router = Router();

router.post(
  "/register",
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);
router.post("/login", validateBody(loginSchema), ctrlWrapper(loginController));
router.get("/logout", ctrlWrapper(logoutController));
router.get("/refresh", ctrlWrapper(refreshController));

export default router;
