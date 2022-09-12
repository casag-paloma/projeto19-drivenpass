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
exports.deleteCredential = exports.getCredentialById = exports.getCredential = exports.createCredential = void 0;
const credentialRepository = __importStar(require("../repositories/credentialRepository"));
const cryptr_1 = __importDefault(require("cryptr"));
const CRYPTR_SECRET_KEY = (_a = process.env.CRYPTR_SECRET_KEY) !== null && _a !== void 0 ? _a : ' ';
const cryptr = new cryptr_1.default(CRYPTR_SECRET_KEY);
function createCredential(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentialTitle = yield credentialRepository.getCredentialByTitle(userId, data.title);
        if (credentialTitle)
            throw { type: 'conflict' };
        const encryptPassword = cryptr.encrypt(data.password);
        const credentialData = {
            userId,
            title: data.title,
            url: data.url,
            username: data.username,
            password: encryptPassword
        };
        yield credentialRepository.create(credentialData);
    });
}
exports.createCredential = createCredential;
;
function decryptPassword(data) {
    const decryptedPassword = cryptr.decrypt(data.password);
    return {
        id: data.id,
        title: data.title,
        url: data.url,
        username: data.username,
        password: decryptedPassword
    };
}
function getCredential(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield credentialRepository.getCredentialsByUserId(userId);
        const credentials = result.map((data) => decryptPassword(data));
        return credentials;
    });
}
exports.getCredential = getCredential;
;
function getCredentialById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentialId = yield credentialRepository.getCredentialsById(id);
        if (!credentialId)
            throw { type: "not_found" };
        const credential = yield credentialRepository.getCredentialsByIdAndUserId(id, userId);
        if (!credential)
            throw { type: "unauthorized" };
        const result = decryptPassword(credential);
        return result;
    });
}
exports.getCredentialById = getCredentialById;
;
function deleteCredential(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentialId = yield credentialRepository.getCredentialsById(id);
        if (!credentialId)
            throw { type: "not_found" };
        const credential = yield credentialRepository.getCredentialsByIdAndUserId(id, userId);
        if (!credential)
            throw { type: "unauthorized" };
        yield credentialRepository.deleteCredential(id);
    });
}
exports.deleteCredential = deleteCredential;
;
