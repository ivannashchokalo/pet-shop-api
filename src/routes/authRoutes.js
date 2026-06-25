import { Router } from "express";
import {
  getMe,
  loginAdmin,
  loginUser,
  logout,
  refreshUserSession,
  registerUser,
  requestResetEmail,
  resetPassword,
} from "../controllers/authController.js";
import { celebrate } from "celebrate";
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from "../validations/authValidation.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

//=========== admin ===================
router.post("/admin/login", celebrate(loginUserSchema), loginAdmin);

//============ animals market =========
router.post("/register", celebrate(registerUserSchema), registerUser);
router.post("/login", celebrate(loginUserSchema), loginUser);
router.post(
  "/request-reset-email",
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);
router.post("/reset-password", celebrate(resetPasswordSchema), resetPassword);

//============ both ===================
router.post("/logout", authenticate, logout);
router.post("/refresh", refreshUserSession);
router.get("/me", authenticate, getMe);

export default router;
