import { Router } from "express";
import { statisticsController } from "../controllers/statisticsController.js";

const router = Router();

router.get("/", statisticsController);

export default router;
