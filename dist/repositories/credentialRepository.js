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
exports.deleteCredential = exports.getCredentialsByIdAndUserId = exports.getCredentialsById = exports.getCredentialsByUserId = exports.getCredentialByTitle = exports.create = void 0;
const database_1 = require("../config/database");
function create(credential) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.credential.create({ data: credential });
    });
}
exports.create = create;
;
function getCredentialByTitle(userId, title) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield database_1.prisma.credential.findFirst({ where: {
                userId,
                title
            } });
        return credential;
    });
}
exports.getCredentialByTitle = getCredentialByTitle;
;
function getCredentialsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = yield database_1.prisma.credential.findMany({ where: { userId } });
        return credentials;
    });
}
exports.getCredentialsByUserId = getCredentialsByUserId;
;
function getCredentialsById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield database_1.prisma.credential.findFirst({ where: { id } });
        return credential;
    });
}
exports.getCredentialsById = getCredentialsById;
;
function getCredentialsByIdAndUserId(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield database_1.prisma.credential.findFirst({ where: {
                id,
                userId
            } });
        return credential;
    });
}
exports.getCredentialsByIdAndUserId = getCredentialsByIdAndUserId;
;
function deleteCredential(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.credential.delete({ where: { id } });
    });
}
exports.deleteCredential = deleteCredential;
;
