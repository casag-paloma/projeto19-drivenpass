"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const credentialController_1 = require("../controllers/credentialController");
const joiValidationMiddleware_1 = __importDefault(require("../middlewares/joiValidationMiddleware"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const credentialSchema_1 = require("../schemas/credentialSchema");
const credentialRouter = (0, express_1.Router)();
credentialRouter.post('/credential', authMiddleware_1.authUser, (0, joiValidationMiddleware_1.default)(credentialSchema_1.credentialSchema), credentialController_1.createCredential);
credentialRouter.get('/credential', authMiddleware_1.authUser, credentialController_1.getCredential);
credentialRouter.get('/credential/:id', authMiddleware_1.authUser, credentialController_1.getCredentialById);
credentialRouter.delete('/credential/:id', authMiddleware_1.authUser, credentialController_1.deleteCredential);
exports.default = credentialRouter;
