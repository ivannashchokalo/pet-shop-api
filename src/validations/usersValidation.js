import { Joi, Segments } from "celebrate";
import { objectIdValidator } from "./objectIdValidator.js";

export const RequestIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    reqId: Joi.string().custom(objectIdValidator).required().messages({
      "string.base": "Request ID must be a string",
      "any.required": "Request ID is required",
    }),
  }),
};

export const favoriteBodySchema = {
  [Segments.BODY]: Joi.object({
    animalId: Joi.string().custom(objectIdValidator).required().messages({
      "string.base": "Animal ID must be a string",
      "any.required": "Animal ID is required",
    }),
  }),
};

export const favoriteAnimalsQuerySchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).default(10),
  }),
};

export const changePasswordSchema = {
  [Segments.BODY]: Joi.object({
    oldPassword: Joi.string().required().messages({
      "string.base": "Old password must be a string",
      "any.required": "Old password is required",
    }),

    newPassword: Joi.string().min(8).required().messages({
      "string.base": "New password must be a string",
      "string.min": "New password must be at least 6 characters long",
      "any.required": "New password is required",
    }),
  }),
};

export const changeNameSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(2).required().messages({
      "string.base": "Name must be a string",
      "string.min": "Name must be at least 2 characters long",
      "any.required": "Name is required",
    }),
  }),
};
