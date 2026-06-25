import { Router } from "express";
import {
  createAnimal,
  deleteAnimal,
  getAnimalById,
  getAnimals,
  getFiltersController,
  updateAnimal,
} from "../controllers/animalsController.js";
import { celebrate } from "celebrate";
import {
  animalIdParamSchema,
  createAnimalsSchema,
  getAnimalsSchema,
  getFiltersSchema,
  updateAnimalSchema,
} from "../validations/animalsValidation.js";
import { uploadPetPhotos } from "../middleware/multer.js";
import { authenticate } from "../middleware/authenticate.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();

router.get("/", celebrate(getAnimalsSchema), getAnimals);
router.get("/filters", celebrate(getFiltersSchema), getFiltersController);
router.get("/:animalId", celebrate(animalIdParamSchema), getAnimalById);
router.post(
  "/",
  authenticate,
  isAdmin,
  uploadPetPhotos.array("images", 5),
  celebrate(createAnimalsSchema),
  createAnimal,
);
router.delete(
  "/:animalId",
  authenticate,
  isAdmin,
  celebrate(animalIdParamSchema),
  deleteAnimal,
);
router.patch(
  "/:animalId",
  authenticate,
  isAdmin,
  uploadPetPhotos.array("images", 5),
  celebrate(updateAnimalSchema),
  updateAnimal,
);

export default router;
