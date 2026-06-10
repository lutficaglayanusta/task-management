import {
  addTaskService,
  deleteTaskService,
  fetchOneTaskService,
  fetchTaskService,
  updateTaskService,
} from "../service/task.js";

export const addTaskController = async (req, res) => {
  const id = req.user._id;

  const task = await addTaskService(req.body, id);

  res.status(201).json({
    message: "Successfully created task",
    data: task,
  });
};
export const fetchTaskController = async (req, res) => {

    const id = req.user._id;

  const tasks = await fetchTaskService(id);

  res.status(200).json({
    message: "Başarılı bir şekilde veriler geldi",
    data: tasks,
  });
};
export const fetchOneTaskController = async (req, res) => {
    const { id } = req.params;
    
    const userId = req.user._id

  const task = await fetchOneTaskService(id, userId);

  res.status(200).json({
    message: "Task geldi",
    data: task,
  });
};

export const deleteTaskController = async (req, res) => {
    const { id } = req.params;
    
    const userId = req.user._id;

  await deleteTaskService(id, userId);

  res.status(204).send();
};
export const updateTaskController = async (req, res) => {
    const { id } = req.params;
    
    const userId = req.user._id;

  const task = await updateTaskService(userId,req.body, id, {
    upsert: true,
  });
  const status = task.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a student!`,
    data: task.task,
  });
};
