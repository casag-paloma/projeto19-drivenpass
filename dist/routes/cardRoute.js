"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const joiValidationMiddleware_1 = __importDefault(require("../middlewares/joiValidationMiddleware"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const cardSchema_1 = require("../schemas/cardSchema");
const cardController_1 = require("../controllers/cardController");
const cardRouter = (0, express_1.Router)();
cardRouter.post('/card', authMiddleware_1.authUser, (0, joiValidationMiddleware_1.default)(cardSchema_1.cardSchema), cardController_1.createCard);
cardRouter.get('/card', authMiddleware_1.authUser, cardController_1.getCards);
cardRouter.get('/card/:id', authMiddleware_1.authUser, cardController_1.getCardById);
cardRouter.delete('/card/:id', authMiddleware_1.authUser, cardController_1.deleteCard);
exports.default = cardRouter;
