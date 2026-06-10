import Joi from "joi";

export const postTaskSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});
export const updateTaskSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
});
