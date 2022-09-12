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
exports.deleteSecureNote = exports.getSecureNoteById = exports.getSecureNotes = exports.createSecureNote = void 0;
const secureNoteRepository = __importStar(require("../repositories/secureNoteRepository"));
function createSecureNote(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const secureNote = yield secureNoteRepository.geteSecureNoteByTitle(userId, data.title);
        if (secureNote)
            throw { type: 'conflict', message: 'this title is already in use' };
        const secureNoteData = Object.assign({ userId }, data);
        yield secureNoteRepository.create(secureNoteData);
    });
}
exports.createSecureNote = createSecureNote;
;
function getSecureNotes(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const secureNotes = yield secureNoteRepository.getSecureNotesByUserId(userId);
        return secureNotes;
    });
}
exports.getSecureNotes = getSecureNotes;
;
function getSecureNoteById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const secureNoteId = yield secureNoteRepository.getSecureNoteById(id);
        if (!secureNoteId)
            throw { type: "not_found" };
        const secureNote = yield secureNoteRepository.getSecureNoteByIdAndUserId(id, userId);
        if (!secureNote)
            throw { type: "unauthorized" };
        return secureNote;
    });
}
exports.getSecureNoteById = getSecureNoteById;
;
function deleteSecureNote(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const secureNoteId = yield secureNoteRepository.getSecureNoteById(id);
        if (!secureNoteId)
            throw { type: "not_found" };
        const secureNote = yield secureNoteRepository.getSecureNoteByIdAndUserId(id, userId);
        if (!secureNote)
            throw { type: "unauthorized" };
        yield secureNoteRepository.deleteSecureNote(id);
    });
}
exports.deleteSecureNote = deleteSecureNote;
;
