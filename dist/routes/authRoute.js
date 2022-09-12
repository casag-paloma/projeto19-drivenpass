"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const joiValidationMiddleware_1 = __importDefault(require("../middlewares/joiValidationMiddleware"));
const authSchema_1 = require("../schemas/authSchema");
const authRouter = (0, express_1.Router)();
//create a new user
authRouter.post('/signup', (0, joiValidationMiddleware_1.default)(authSchema_1.authSchema), authController_1.createUser);
//signs user in 
authRouter.post('/signin', (0, joiValidationMiddleware_1.default)(authSchema_1.authSchema), authController_1.login);
exports.default = authRouter;
