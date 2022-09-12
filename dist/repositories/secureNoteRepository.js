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
exports.deleteSecureNote = exports.getSecureNoteByIdAndUserId = exports.getSecureNoteById = exports.getSecureNotesByUserId = exports.geteSecureNoteByTitle = exports.create = void 0;
const database_1 = require("../config/database");
function create(secureNote) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.secureNote.create({ data: secureNote });
    });
}
exports.create = create;
;
function geteSecureNoteByTitle(userId, title) {
    return __awaiter(this, void 0, void 0, function* () {
        const secureNote = yield database_1.prisma.secureNote.findFirst({ where: {
                userId,
                title
            } });
        return secureNote;
    });
}
exports.geteSecureNoteByTitle = geteSecureNoteByTitle;
;
function getSecureNotesByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const secureNotes = yield database_1.prisma.secureNote.findMany({ where: { userId } });
        return secureNotes;
    });
}
exports.getSecureNotesByUserId = getSecureNotesByUserId;
;
function getSecureNoteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const secureNote = yield database_1.prisma.secureNote.findFirst({ where: { id } });
        return secureNote;
    });
}
exports.getSecureNoteById = getSecureNoteById;
;
function getSecureNoteByIdAndUserId(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const secureNote = yield database_1.prisma.secureNote.findFirst({ where: {
                id,
                userId
            } });
        return secureNote;
    });
}
exports.getSecureNoteByIdAndUserId = getSecureNoteByIdAndUserId;
;
function deleteSecureNote(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.secureNote.delete({ where: { id } });
    });
}
exports.deleteSecureNote = deleteSecureNote;
;
