import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { borrowBook, searchBook } from "../controllers/book";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/", tryCatchMiddleware.Error(searchBook));

router.post("/loan", authMiddleware, tryCatchMiddleware.Error(borrowBook));

export default router;
