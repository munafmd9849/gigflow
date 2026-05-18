import { Router } from "express";
import { getDashboardStats } from "../controllers/stats.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

router.use(authenticate);
router.get("/", asyncHandler(getDashboardStats));

export default router;
