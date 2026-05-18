import { Router } from "express";
import authRoutes from "./auth.routes";
import leadRoutes from "./lead.routes";
import statsRoutes from "./stats.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/leads", leadRoutes);
router.use("/stats", statsRoutes);

export default router;
