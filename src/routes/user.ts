import { login, register, getUserInfo, getLoanList } from "../controllers/user";
import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/", tryCatchMiddleware.Error(login));
router.post("/new", tryCatchMiddleware.Error(register));
router.get("/loans", authMiddleware, tryCatchMiddleware.Error(getLoanList));
router.get("/:id", authMiddleware, tryCatchMiddleware.Error(getUserInfo));

export default router;
