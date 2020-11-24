import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { authMiddleware } from "../middlewares/auth";
import * as NoticeController from "../controllers/notice";

const router: Router = Router();

router.get(
  "/latest",
  authMiddleware,
  tryCatchMiddleware.Error(NoticeController.getLatestNotice)
);
router.get(
  "/",
  authMiddleware,
  tryCatchMiddleware.Error(NoticeController.getNoticeList)
);
router.get(
  "/:id",
  authMiddleware,
  tryCatchMiddleware.Error(NoticeController.getDetailNotice)
);

export default router;
