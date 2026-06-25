import { Joi, Segments } from "celebrate";
import { objectIdValidator } from "./objectIdValidator.js";
import { CONTACT_METHOD } from "../constants/requests.js";

export const createRequestSchema = {
  [Segments.BODY]: Joi.object({
    animalId: Joi.string().required().messages({
      "string.base": "animalId must be a string",
      "string.empty": "animalId is required",
      "any.required": "animalId is required",
    }),

    customerName: Joi.string().min(2).max(50).required().messages({
      "string.base": "Name must be a string",
      "string.empty": "Full name is required",
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must be less than 50 characters",
      "any.required": "Full name is required",
    }),

    phone: Joi.string().min(8).required().messages({
      "string.base": "Phone number must be a string",
      "string.empty": "Phone number is required",
      "string.min": "Phone number must be at least 8 characters long",
      "any.required": "Phone number is required",
    }),

    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),

    message: Joi.string().max(300).allow("").messages({
      "string.base": "Message must be a string",
      "string.max": "Message must be less than 300 characters",
    }),
    status: Joi.string().valid("new", "contacted", "closed").messages({
      "any.only": "Invalid status value",
    }),
    contactMethod: Joi.string()
      .valid(...CONTACT_METHOD)
      .required()
      .messages({
        "any.only": "Contact method must be phone or email",
        "any.required": "Contact method is required",
      }),
  }),
};

export const updateRequestSchema = {
  [Segments.PARAMS]: Joi.object({
    reqId: Joi.string().custom(objectIdValidator).required(),
  }),

  [Segments.BODY]: Joi.object({
    animalId: Joi.string().messages({
      "string.base": "animalId must be a string",
      "string.empty": "animalId is required",
    }),

    name: Joi.string().min(2).max(50).messages({
      "string.base": "Name must be a string",
      "string.empty": "Full name is required",
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must be less than 50 characters",
    }),

    phone: Joi.string().min(8).messages({
      "string.base": "Phone number must be a string",
      "string.empty": "Phone number is required",
      "string.min": "Phone number must be at least 8 characters long",
    }),

    email: Joi.string().email().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),

    message: Joi.string().max(300).allow("").messages({
      "string.base": "Message must be a string",
      "string.max": "Message must be less than 300 characters",
    }),
    status: Joi.string().valid("new", "contacted", "closed").messages({
      "any.only": "Invalid status value",
    }),
    contactMethod: Joi.string()
      .valid(...CONTACT_METHOD)
      .messages({
        "any.only": "Contact method must be phone or email",
      }),
  })
    .min(1)
    .messages({
      "object.min": "At least one field must be provided for update",
    }),
};
