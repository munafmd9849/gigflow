import { Router } from "express";
import { create, exportCsv, getById, list, remove, update } from "../controllers/lead.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import { validateRequest } from "../middlewares/validate.middleware";
import { UserRole } from "../types/user.types";
import { asyncHandler } from "../utils/async-handler";
import { createLeadSchema, leadIdParamSchema, listLeadsSchema, updateLeadSchema } from "../validators/lead.validator";

const router = Router();

router.use(authenticate);

router.get("/export/csv", authorize(UserRole.Admin), asyncHandler(exportCsv));
router.post("/", authorize(UserRole.Admin, UserRole.Sales), validateRequest(createLeadSchema), asyncHandler(create));
router.get("/", authorize(UserRole.Admin, UserRole.Sales), validateRequest(listLeadsSchema), asyncHandler(list));
router.get("/:id", authorize(UserRole.Admin, UserRole.Sales), validateRequest(leadIdParamSchema), asyncHandler(getById));
router.patch("/:id", authorize(UserRole.Admin, UserRole.Sales), validateRequest(updateLeadSchema), asyncHandler(update));
router.delete("/:id", authorize(UserRole.Admin), validateRequest(leadIdParamSchema), asyncHandler(remove));

export default router;
