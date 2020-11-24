import { login, register } from "../controllers/user";
import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";

const router = Router();

router.post("/", tryCatchMiddleware.Error(login));
router.post("/new", tryCatchMiddleware.Error(register));

export default router;
