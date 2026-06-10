import Task from "../db/models/task.js";

export const addTaskService = async (payload, id) => {
  const task = await Task.create({ ...payload, userId: id });

  return task;
};
export const fetchTaskService = async (id) => {
  const tasks = await Task.find({ userId: id });

  return tasks;
};
export const fetchOneTaskService = async (id, userId) => {
  const task = await Task.findOne({ _id: id, userId });

  return task;
};

export const deleteTaskService = async (id, userId) => {
  await Task.deleteOne({ _id: id, userId });
};
export const updateTaskService = async (userId, payload, id, options = {}) => {
  const task = await Task.findOneAndUpdate({ userId, _id: id }, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  if (!task.value || !task) {
    return null;
  }
  return {
    task: task.value,
    isNew: Boolean(task?.lastErrorObject?.upserted),
  };
};
