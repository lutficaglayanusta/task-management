import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  addTaskController,
  deleteTaskController,
  fetchOneTaskController,
  fetchTaskController,
  updateTaskController,
} from "../controller/task.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.use(authenticate);

router.post("/", ctrlWrapper(addTaskController));
router.get("/", ctrlWrapper(fetchTaskController));
router.get("/:id", ctrlWrapper(fetchOneTaskController));
router.delete("/:id", ctrlWrapper(deleteTaskController));
router.put("/:id", ctrlWrapper(updateTaskController));

export default router;
