import { Router } from "express";
import admin from "./admin";
import user from "./user";
import notice from "./notice";
import book from "./book";

const router: Router = Router();

router.use("/admin", admin);
router.use("/user", user);
router.use("/notice", notice);
router.use("/book", book);

export default router;
