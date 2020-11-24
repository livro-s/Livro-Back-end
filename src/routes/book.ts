import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { searchBook } from "../controllers/book";

const router = Router();

router.get("/", tryCatchMiddleware.Error(searchBook));

export default router;
