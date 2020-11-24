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
router.delete(
  "/notice/:id",
  authMiddleware,
  tryCatchMiddleware.Error(AdminController.deleteNotice)
);
router.put(
  "/notice/:id",
  authMiddleware,
  tryCatchMiddleware.Error(AdminController.updateNotice)
);

export default router;
