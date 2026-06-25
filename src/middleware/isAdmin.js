import createHttpError from "http-errors";
import { USER_ROLE } from "../constants/users.js";

export const isAdmin = (req, res, next) => {
  if (!req.user) {
    throw createHttpError(401, "Unauthorized");
  }

  if (req.user.role !== USER_ROLE.ADMIN) {
    throw createHttpError(403, "Admin access only");
  }

  next();
};
