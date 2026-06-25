import { Router } from "express";
import {
  createRequest,
  deleteRequest,
  getRequests,
  updateRequest,
} from "../controllers/requestsController.js";
import { celebrate } from "celebrate";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  createRequestSchema,
  updateRequestSchema,
} from "../validations/requestsValidation.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.get("/", authenticate, isAdmin, getRequests);
router.patch(
  "/:reqId",
  authenticate,
  isAdmin,
  celebrate(updateRequestSchema),
  updateRequest,
);
router.delete("/:reqId", authenticate, isAdmin, deleteRequest);
router.post("/", celebrate(createRequestSchema), createRequest);

export default router;
