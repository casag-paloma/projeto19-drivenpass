"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoute_1 = __importDefault(require("./authRoute"));
const cardRoute_1 = __importDefault(require("./cardRoute"));
const credentialRoute_1 = __importDefault(require("./credentialRoute"));
const secureNoteRoute_1 = __importDefault(require("./secureNoteRoute"));
const wifiRoute_1 = __importDefault(require("./wifiRoute"));
const router = (0, express_1.Router)();
router.use(authRoute_1.default);
router.use(credentialRoute_1.default);
router.use(secureNoteRoute_1.default);
router.use(wifiRoute_1.default);
router.use(cardRoute_1.default);
exports.default = router;
