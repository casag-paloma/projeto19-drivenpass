"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const joiValidationMiddleware_1 = __importDefault(require("../middlewares/joiValidationMiddleware"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const wifiSchema_1 = require("../schemas/wifiSchema");
const wifiController_1 = require("../controllers/wifiController");
const wifiRouter = (0, express_1.Router)();
wifiRouter.post('/wifi', authMiddleware_1.authUser, (0, joiValidationMiddleware_1.default)(wifiSchema_1.wifiSchema), wifiController_1.createWifi);
wifiRouter.get('/wifi', authMiddleware_1.authUser, wifiController_1.getWifi);
wifiRouter.get('/wifi/:id', authMiddleware_1.authUser, wifiController_1.getWifiById);
wifiRouter.delete('/wifi/:id', authMiddleware_1.authUser, wifiController_1.deleteWifi);
exports.default = wifiRouter;
