import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { borrowBook, getBook, searchBook } from "../controllers/book";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/", tryCatchMiddleware.Error(searchBook));
router.get("/:id", tryCatchMiddleware.Error(getBook));

router.post("/loan", authMiddleware, tryCatchMiddleware.Error(borrowBook));

export default router;
