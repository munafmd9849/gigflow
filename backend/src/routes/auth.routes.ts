import { Router } from "express";
import { login, me, register } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validate.middleware";
import { asyncHandler } from "../utils/async-handler";
import { loginSchema, registerSchema } from "../validators/auth.validator";

const router = Router();

router.post("/register", validateRequest(registerSchema), asyncHandler(register));
router.post("/login", validateRequest(loginSchema), asyncHandler(login));
router.get("/me", authenticate, asyncHandler(me));

export default router;
