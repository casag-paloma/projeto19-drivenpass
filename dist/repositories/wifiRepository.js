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
exports.deleteWifi = exports.getWifiByIdAndUserId = exports.getwWifiById = exports.getWifisByUserId = exports.createWifi = void 0;
const database_1 = require("../config/database");
function createWifi(wifi) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.wifi.create({ data: wifi });
    });
}
exports.createWifi = createWifi;
;
function getWifisByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifis = yield database_1.prisma.wifi.findMany({ where: { userId } });
        return wifis;
    });
}
exports.getWifisByUserId = getWifisByUserId;
;
function getwWifiById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifi = yield database_1.prisma.wifi.findFirst({ where: { id } });
        return wifi;
    });
}
exports.getwWifiById = getwWifiById;
;
function getWifiByIdAndUserId(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifi = yield database_1.prisma.wifi.findFirst({ where: {
                id,
                userId
            } });
        return wifi;
    });
}
exports.getWifiByIdAndUserId = getWifiByIdAndUserId;
;
function deleteWifi(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.wifi.delete({ where: { id } });
    });
}
exports.deleteWifi = deleteWifi;
;
