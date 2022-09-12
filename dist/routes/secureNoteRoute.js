"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const joiValidationMiddleware_1 = __importDefault(require("../middlewares/joiValidationMiddleware"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const secureNoteSchema_1 = require("../schemas/secureNoteSchema");
const secureNoteController_1 = require("../controllers/secureNoteController");
const secureNoteRouter = (0, express_1.Router)();
secureNoteRouter.post('/securenote', authMiddleware_1.authUser, (0, joiValidationMiddleware_1.default)(secureNoteSchema_1.secureNoteSchema), secureNoteController_1.createSecureNote);
secureNoteRouter.get('/securenote', authMiddleware_1.authUser, secureNoteController_1.getSecureNote);
secureNoteRouter.get('/securenote/:id', authMiddleware_1.authUser, secureNoteController_1.getSecureNoteById);
secureNoteRouter.delete('/securenote/:id', authMiddleware_1.authUser, secureNoteController_1.deleteSecureNote);
exports.default = secureNoteRouter;
