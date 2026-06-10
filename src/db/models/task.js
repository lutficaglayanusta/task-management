import { model, Schema } from "mongoose";

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});
const Task = model("Task", taskSchema);

export default Task;
