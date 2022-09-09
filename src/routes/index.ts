import { Router } from "express";
import authRouter from "./authenticationRoute";

const router = Router();

router.use(authRouter)

export default router;