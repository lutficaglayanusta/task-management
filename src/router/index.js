import { Router } from "express";
import taskRoute from "./task.js";
import authRoute from "./auth.js";

const router = Router();

router.use("/task", taskRoute);
router.use("/auth", authRoute);

export default router;
