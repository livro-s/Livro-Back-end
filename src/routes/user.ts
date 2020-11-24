import { login, register, getUserInfo } from "../controllers/user";
import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";

const router = Router();

router.post("/", tryCatchMiddleware.Error(login));
router.post("/new", tryCatchMiddleware.Error(register));
router.get("/:id", tryCatchMiddleware.Error(getUserInfo));

export default router;
