import express from "express";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeUsers,
} from "../controllers/employee.controller.js";

import {
  verifyAndDecodeToken,
  isAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-employee", verifyAndDecodeToken, isAdmin, createEmployee);
router.put("/update/:id", verifyAndDecodeToken, isAdmin, updateEmployee);
router.delete("/delete/:id", verifyAndDecodeToken, isAdmin, deleteEmployee);
router.get('/employees',verifyAndDecodeToken, getEmployees)
router.get("/users",verifyAndDecodeToken,isAdmin, getEmployeeUsers);

export default router;