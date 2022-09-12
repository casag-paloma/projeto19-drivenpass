"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCard = exports.getCardById = exports.getCards = exports.createCard = void 0;
const cardRepository = __importStar(require("../repositories/cardRepository"));
const cryptr_1 = __importDefault(require("cryptr"));
const CRYPTR_SECRET_KEY = (_a = process.env.CRYPTR_SECRET_KEY_CARD) !== null && _a !== void 0 ? _a : ' ';
const cryptr = new cryptr_1.default(CRYPTR_SECRET_KEY);
function returnBoolean(string) {
    if (string === 'true')
        return true;
    else
        return false;
}
function createCard(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield cardRepository.getCardByTitle(userId, data.title);
        if (card)
            throw { type: 'conflict' };
        const encryptSecurityCode = cryptr.encrypt(data.securityCode);
        const encryptPassword = cryptr.encrypt(data.password);
        if (typeof (data.isVirtual) === 'string') {
            data.isVirtual = returnBoolean(data.isVirtual);
        }
        const cardData = {
            userId,
            title: data.title,
            cardNumber: data.cardNumber,
            cardHolderName: data.cardHolderName,
            securityCode: encryptSecurityCode,
            expirationDate: data.expirationDate,
            password: encryptPassword,
            isVirtual: data.isVirtual,
            type: data.type
        };
        yield cardRepository.createCard(cardData);
    });
}
exports.createCard = createCard;
;
function decryptSecurityCodeAndPassword(data) {
    const decryptedSecurityCode = cryptr.decrypt(data.securityCode);
    const decryptedPassword = cryptr.decrypt(data.password);
    return {
        id: data.id,
        title: data.title,
        cardNumber: data.cardNumber,
        cardHolderName: data.cardHolderName,
        securityCode: decryptedSecurityCode,
        expirationDate: data.expirationDate,
        password: decryptedPassword,
        isVirtual: data.isVirtual,
        type: data.type
    };
}
function getCards(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield cardRepository.getCardsByUserId(userId);
        const cards = result.map((data) => decryptSecurityCodeAndPassword(data));
        return cards;
    });
}
exports.getCards = getCards;
;
function getCardById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cardId = yield cardRepository.getCardById(id);
        if (!cardId)
            throw { type: "not_found" };
        const card = yield cardRepository.getCardByIdAndUserId(id, userId);
        if (!card)
            throw { type: "unauthorized" };
        const result = decryptSecurityCodeAndPassword(card);
        return result;
    });
}
exports.getCardById = getCardById;
;
function deleteCard(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cardId = yield cardRepository.getCardById(id);
        if (!cardId)
            throw { type: "not_found" };
        const card = yield cardRepository.getCardByIdAndUserId(id, userId);
        if (!card)
            throw { type: "unauthorized" };
        yield cardRepository.deleteCard(id);
    });
}
exports.deleteCard = deleteCard;
;
