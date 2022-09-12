"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.cardSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    cardNumber: joi_1.default.string().pattern(new RegExp('^[0-9]{16}$')).required(),
    cardHolderName: joi_1.default.string().required(),
    securityCode: joi_1.default.string().pattern(new RegExp('^[0-9]{3,4}$')).required(),
    expirationDate: joi_1.default.string().pattern(new RegExp('^(0[1-9]|1[0-2])\/?([0-9]{2})$')).required(),
    password: joi_1.default.string().required(),
    isVirtual: joi_1.default.bool().required(),
    type: joi_1.default.string().valid('Credit', 'Debit', 'Credit/Debit').required()
});
