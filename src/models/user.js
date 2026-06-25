import { model, Schema } from "mongoose";
import { USER_ROLE } from "../constants/users.js";
import { type } from "node:os";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: USER_ROLE,
      default: "user",
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Animal",
      },
    ],
    requests: [
      {
        type: Schema.Types.ObjectId,
        ref: "Request",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre("save", function () {
  if (!this.username) {
    this.username = this.email;
  }
});

userSchema.methods.toJson = function () {
  const obj = this.obj;
  delete obj.password;
  return obj;
};

export const User = model("User", userSchema);
