import { Joi, Segments } from "celebrate";

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(50).messages({
      "string.base": "Name must be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name must be at most 50 characters",
    }),
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(8).required().messages({
      "string.base": "Password must be a string",
      "any.required": "Password is required",
      "string.min": "Password must be at least 8 characters",
    }),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),

    password: Joi.string().required().messages({
      "string.base": "Password must be a string",
      "any.required": "Password is required",
    }),
  }),
};

export const requestResetEmailSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
  }),
};

export const resetPasswordSchema = {
  [Segments.BODY]: Joi.object({
    password: Joi.string().min(8).required(),
    token: Joi.string().required(),
  }),
};
