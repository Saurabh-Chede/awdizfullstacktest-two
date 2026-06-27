import express from "express";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

import {
  verifyAndDecodeToken,
  isAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-project", verifyAndDecodeToken, isAdmin, createProject);
router.get("/get-projects", verifyAndDecodeToken, getProjects);
router.put("/update/:id", verifyAndDecodeToken, isAdmin, updateProject);
router.delete("/delete/:id", verifyAndDecodeToken, isAdmin, deleteProject);

export default router;