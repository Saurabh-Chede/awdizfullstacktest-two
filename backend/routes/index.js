import {Router} from "express";
import authRouter from '../routes/auth.route.js'
import employeeRouter from "../routes/employee.route.js"
import projectRouter from '../routes/project.route.js'

const router = Router();

router.use("/auth",authRouter);
router.use('/employee',employeeRouter)
router.use('/project',projectRouter)

export default router;