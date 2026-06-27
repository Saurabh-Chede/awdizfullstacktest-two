import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import {
  verifyAndDecodeToken,
  isAdmin,
} from "../middlewares/authMiddleware.js";

const router = Router();

router.get(
  "/stats",
  verifyAndDecodeToken,
  isAdmin,
  getDashboard
);

export default router;