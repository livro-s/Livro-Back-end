import { Router } from "express";
import * as AdminController from "../controllers/admin";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { authMiddleware } from "../middlewares/auth";

const router: Router = Router();

router.post("/auth", tryCatchMiddleware.Error(AdminController.adminAuth));
router.post(
  "/notice",
  authMiddleware,
  tryCatchMiddleware.Error(AdminController.writeNotice)
);

export default router;
