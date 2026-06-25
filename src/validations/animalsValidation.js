import { Joi, Segments } from "celebrate";
import {
  ANIMAL_SEX,
  ANIMAL_STATUS,
  ANIMAL_TYPES,
} from "../constants/animals.js";
import { objectIdValidator } from "./objectIdValidator.js";

export const getAnimalsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      "number.base": "Page must be a number",
      "number.integer": "Page must be an integer",
      "number.min": "Page must be greater than or equal to 1",
    }),
    perPage: Joi.number().integer().min(5).default(10).messages({
      "number.base": "perPage must be a number",
      "number.integer": "perPage must be an integer",
      "number.min": "perPage must be at least 5",
    }),

    type: Joi.string()
      .valid(...ANIMAL_TYPES)
      .messages({
        "string.base": "Type must be a string",
        "any.only": "Type must be one of: dog or cat",
      }),
    status: Joi.string()
      .valid(...ANIMAL_STATUS)
      .messages({
        "string.base": "Status must be a string",
        "any.only": "Status must be one of: available, reserved, sold",
      }),
    breed: Joi.string().allow("").messages({
      "string.base": "Breed must be a string",
    }),
    sex: Joi.string()
      .valid(...ANIMAL_SEX)
      .messages({
        "string.base": "Sex must be a string",
        "any.only": "Sex must be one of: male or female",
      }),
    sortBy: Joi.string().valid("price", "birthDate", "createdAt"),
    sortOrder: Joi.string().valid("asc", "desc"),
    minPrice: Joi.number().integer().positive(),
    maxPrice: Joi.number().integer().positive(),
    search: Joi.string().trim().allow("").messages({
      "string.base": "Search must be a string",
    }),
  }),
};

export const createAnimalsSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).required().messages({
      "string.base": "Name must be a string",
      "string.min": "Name should have at least 2 characters",
      "any.required": "Name is required",
    }),

    type: Joi.string()
      .valid(...ANIMAL_TYPES)
      .required()
      .messages({
        "string.base": "Type must be a string",
        "any.only": "Type must be one of: dog or cat",
        "any.required": "Type is required",
      }),

    breed: Joi.string().min(2).required().messages({
      "string.base": "Breed must be a string",
      "string.min": "Breed should have at least 2 characters",
      "any.required": "Breed is required",
    }),

    sex: Joi.string()
      .valid(...ANIMAL_SEX)
      .required()
      .messages({
        "string.base": "Sex must be a string",
        "any.only": "Sex must be one of: male or female",
        "any.required": "Sex is required",
      }),

    birthDate: Joi.date().less("now").allow("").optional().messages({
      "date.base": "Birth date must be a valid date",
      "date.less": "Birth date must be in the past",
    }),

    price: Joi.number().min(1).messages({
      "number.base": "Price must be a number",
      "number.min": "Price must be at least 1",
    }),

    status: Joi.string()
      .valid(...ANIMAL_STATUS)
      .messages({
        "string.base": "Status must be a string",
        "any.only": "Status must be one of: available, reserved, sold",
      }),

    description: Joi.string().allow("").messages({
      "string.base": "Description must be a string",
    }),
    images: Joi.any(),
  }),
};

export const animalIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    animalId: Joi.string().custom(objectIdValidator).required().messages({
      "string.base": "Animal ID must be a string",
      "any.required": "Animal ID is required",
    }),
  }),
};

export const updateAnimalSchema = {
  [Segments.PARAMS]: Joi.object({
    animalId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).messages({
      "string.base": "Name must be a string",
      "string.min": "Name should have at least 2 characters",
    }),
    type: Joi.string()
      .valid(...ANIMAL_TYPES)
      .messages({
        "string.base": "Type must be a string",
        "any.only": "Type must be one of: dog or cat",
      }),
    breed: Joi.string().min(2).messages({
      "string.base": "Breed must be a string",
      "string.min": "Breed should have at least 2 characters",
    }),
    sex: Joi.string()
      .valid(...ANIMAL_SEX)
      .messages({
        "string.base": "Sex must be a string",
        "any.only": "Sex must be one of: male or female",
      }),
    birthDate: Joi.date().less("now").allow("").messages({
      "date.base": "Birth date must be a valid date",
      "date.less": "Birth date must be in the past",
    }),
    price: Joi.number().min(1).messages({
      "number.base": "Price must be a number",
      "number.min": "Price must be at least 1",
    }),
    status: Joi.string()
      .valid(...ANIMAL_STATUS)
      .messages({
        "string.base": "Status must be a string",
        "any.only": "Status must be one of: available, reserved, sold",
      }),
    description: Joi.string().allow("").optional().messages({
      "string.base": "Description must be a string",
    }),
    images: Joi.any(), // без цього фотки не відправляюьтся
  })
    .min(1)
    .messages({
      "object.min": "At least one field must be provided for update",
    }),
};

export const getFiltersSchema = {
  [Segments.QUERY]: Joi.object({
    type: Joi.string().valid(...ANIMAL_TYPES),
  }),
};
