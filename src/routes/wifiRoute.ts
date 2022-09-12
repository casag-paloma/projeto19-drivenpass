import { Router } from "express";
import joiValidation from "../middlewares/joiValidationMiddleware";
import { authUser } from "../middlewares/authMiddleware";
import { wifiSchema } from "../schemas/wifiSchema";
import { createWifi, deleteWifi, getWifi, getWifiById } from "../controllers/wifiController";

const wifiRouter = Router();

wifiRouter.post('/wifi', authUser, joiValidation(wifiSchema), createWifi);

wifiRouter.get('/wifi', authUser, getWifi);
wifiRouter.get('/wifi/:id', authUser, getWifiById);

wifiRouter.delete('/wifi/:id', authUser, deleteWifi);

export default wifiRouter;