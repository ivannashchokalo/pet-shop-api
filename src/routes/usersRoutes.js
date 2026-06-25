import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  addToFavorites,
  changeName,
  changePassword,
  clearFavorites,
  getFavoriteAnimals,
  getFavorites,
  getUserRequests,
  removeFromFavorites,
  removeUserRequest,
} from "../controllers/usersController.js";
import { celebrate } from "celebrate";
import {
  changeNameSchema,
  changePasswordSchema,
  favoriteBodySchema,
  RequestIdParamSchema,
} from "../validations/usersValidation.js";

const router = Router();

router.get("/favorites", authenticate, getFavorites);
router.patch(
  "/favorites",
  celebrate(favoriteBodySchema),
  authenticate,
  addToFavorites,
);
router.delete(
  "/favorites",
  celebrate(favoriteBodySchema),
  authenticate,
  removeFromFavorites,
);
router.get("/favorites/animals", authenticate, getFavoriteAnimals);
router.delete("/favorites/animals", authenticate, clearFavorites);
router.get("/requests", authenticate, getUserRequests);
router.delete(
  "/requests/:reqId",
  celebrate(RequestIdParamSchema),
  authenticate,
  removeUserRequest,
);

router.patch(
  "/change-password",
  authenticate,
  celebrate(changePasswordSchema),
  changePassword,
);

router.patch(
  "/change-name",
  authenticate,
  celebrate(changeNameSchema),
  changeName,
);

export default router;
