import { Router } from "express";
import * as AdminController from "../controllers/admin";
import { tryCatchMiddleware } from "../middlewares/tryCatch";

const router: Router = Router();

router.post("/auth", tryCatchMiddleware.Error(AdminController.adminAuth));

export default router;
