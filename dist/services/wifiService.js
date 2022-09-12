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
exports.deleteWifi = exports.getWifiById = exports.getWifis = exports.createWifi = void 0;
const wifiRepository = __importStar(require("../repositories/wifiRepository"));
const cryptr_1 = __importDefault(require("cryptr"));
const CRYPTR_SECRET_KEY = (_a = process.env.CRYPTR_SECRET_KEY_WIFI) !== null && _a !== void 0 ? _a : ' ';
const cryptr = new cryptr_1.default(CRYPTR_SECRET_KEY);
function createWifi(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const encryptPassword = cryptr.encrypt(data.password);
        const wifiData = {
            userId,
            title: data.title,
            name: data.name,
            password: encryptPassword
        };
        yield wifiRepository.createWifi(wifiData);
    });
}
exports.createWifi = createWifi;
;
function decryptPassword(data) {
    const decryptedPassword = cryptr.decrypt(data.password);
    return {
        id: data.id,
        title: data.title,
        name: data.name,
        password: decryptedPassword
    };
}
function getWifis(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield wifiRepository.getWifisByUserId(userId);
        const wifis = result.map((data) => decryptPassword(data));
        return wifis;
    });
}
exports.getWifis = getWifis;
;
function getWifiById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifiId = yield wifiRepository.getwWifiById(id);
        if (!wifiId)
            throw { type: "not_found" };
        const wifi = yield wifiRepository.getWifiByIdAndUserId(id, userId);
        if (!wifi)
            throw { type: "unauthorized" };
        const result = decryptPassword(wifi);
        return result;
    });
}
exports.getWifiById = getWifiById;
;
function deleteWifi(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifiId = yield wifiRepository.getwWifiById(id);
        if (!wifiId)
            throw { type: "not_found" };
        const wifi = yield wifiRepository.getWifiByIdAndUserId(id, userId);
        if (!wifi)
            throw { type: "unauthorized" };
        yield wifiRepository.deleteWifi(id);
    });
}
exports.deleteWifi = deleteWifi;
;
