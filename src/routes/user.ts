import { getUser, login, register } from "../controllers/user";
import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/", authMiddleware, tryCatchMiddleware.Error(getUser));

router.post("/", tryCatchMiddleware.Error(login));
router.post("/new", tryCatchMiddleware.Error(register));

export default router;
