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
import { validateBody } from "../middleware/validateBody.js";
import { postTaskSchema, updateTaskSchema } from "../validation/task.js";
import { isValidId } from "../middleware/isValidId.js";

const router = Router();

router.use(authenticate);

router.post("/", validateBody(postTaskSchema), ctrlWrapper(addTaskController));
router.get("/", ctrlWrapper(fetchTaskController));
router.get("/:id", isValidId, ctrlWrapper(fetchOneTaskController));
router.delete("/:id", isValidId, ctrlWrapper(deleteTaskController));
router.put(
  "/:id",
  isValidId,
  validateBody(updateTaskSchema),
  ctrlWrapper(updateTaskController),
);

export default router;
