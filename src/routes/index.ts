import { Router } from "express";
import admin from "./admin";
import user from "./user";
import notice from "./notice";

const router: Router = Router();

router.use("/admin", admin);
router.use("/user", user);
router.use("/notice", notice);

export default router;
