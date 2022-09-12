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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCard = exports.getCardById = exports.getCards = exports.createCard = void 0;
const cardService = __importStar(require("../services/cardService"));
function createCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = res.locals.tokenData;
        const data = req.body;
        yield cardService.createCard(userId, data);
        res.sendStatus(201);
    });
}
exports.createCard = createCard;
;
function getCards(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = res.locals.tokenData;
        const cards = yield cardService.getCards(userId);
        res.status(200).send(cards);
    });
}
exports.getCards = getCards;
;
function getCardById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = res.locals.tokenData;
        const id = req.params.id;
        if (isNaN(Number(id)))
            return res.sendStatus(422);
        const card = yield cardService.getCardById(Number(id), userId);
        res.status(200).send(card);
    });
}
exports.getCardById = getCardById;
;
function deleteCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = res.locals.tokenData;
        const id = req.params.id;
        if (isNaN(Number(id)))
            return res.sendStatus(422);
        yield cardService.deleteCard(Number(id), userId);
        res.sendStatus(204);
    });
}
exports.deleteCard = deleteCard;
;
