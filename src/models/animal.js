import { model, Schema } from "mongoose";
import {
  ANIMAL_SEX,
  ANIMAL_STATUS,
  ANIMAL_TYPES,
} from "../constants/animals.js";

const animalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ANIMAL_TYPES,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      enum: ANIMAL_SEX,
      required: true,
    },
    birthDate: {
      type: Date,
    },
    price: {
      type: Number,
    },
    status: {
      type: String,
      enum: ANIMAL_STATUS,
      default: "available",
    },
    description: {
      type: String,
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

animalSchema.index({
  name: "text",
  breed: "text",
});

export const Animal = model("Animal", animalSchema);
