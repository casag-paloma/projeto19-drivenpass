import { Router } from "express";
import authRouter from "./authRoute";
import credentialRouter from "./credentialRoute";
import secureNoteRouter from "./secureNoteRoute";
import wifiRouter from "./wifiRoute";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(secureNoteRouter);
router.use(wifiRouter);

export default router;