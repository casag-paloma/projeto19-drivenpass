import { Router } from "express";
import authRouter from "./authRoute";
import credentialRouter from "./credentialRoute";
import secureNoteRouter from "./secureNote";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(secureNoteRouter);

export default router;