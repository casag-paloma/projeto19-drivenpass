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
exports.getUserByEmail = exports.create = void 0;
const database_1 = require("../config/database");
function create(user) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.user.create({ data: user });
    });
}
exports.create = create;
;
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield database_1.prisma.user.findFirst({ where: { email } });
        return user;
    });
}
exports.getUserByEmail = getUserByEmail;
;
