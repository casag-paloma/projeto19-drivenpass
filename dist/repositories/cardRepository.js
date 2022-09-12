"use strict";
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
exports.deleteCard = exports.getCardByIdAndUserId = exports.getCardById = exports.getCardsByUserId = exports.getCardByTitle = exports.createCard = void 0;
const database_1 = require("../config/database");
function createCard(card) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.card.create({ data: card });
    });
}
exports.createCard = createCard;
;
function getCardByTitle(userId, title) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield database_1.prisma.card.findFirst({ where: {
                userId,
                title
            } });
        return card;
    });
}
exports.getCardByTitle = getCardByTitle;
;
function getCardsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cards = yield database_1.prisma.card.findMany({ where: { userId } });
        return cards;
    });
}
exports.getCardsByUserId = getCardsByUserId;
;
function getCardById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield database_1.prisma.card.findFirst({ where: { id } });
        return card;
    });
}
exports.getCardById = getCardById;
;
function getCardByIdAndUserId(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield database_1.prisma.card.findFirst({ where: {
                id,
                userId
            } });
        return card;
    });
}
exports.getCardByIdAndUserId = getCardByIdAndUserId;
;
function deleteCard(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.card.delete({ where: { id } });
    });
}
exports.deleteCard = deleteCard;
;
