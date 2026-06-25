import { Schema, model } from "mongoose";
import { CONTACT_METHOD, REQUEST_STATUS } from "../constants/requests.js";

const requestSchema = new Schema(
  {
    animalId: {
      type: Schema.Types.ObjectId,
      ref: "Animal",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: REQUEST_STATUS,
      default: "new",
    },
    message: {
      type: String,
    },
    contactMethod: {
      type: String,
      enum: CONTACT_METHOD,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Request = model("Request", requestSchema);
