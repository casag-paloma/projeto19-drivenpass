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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUser = void 0;
const userRepository = __importStar(require("../repositories/userRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userRepository.getUserByEmail(data.email);
        if (user)
            throw { type: 'conflict' };
        const encryptedPassword = bcrypt_1.default.hashSync(data.password, 10);
        const userData = {
            email: data.email,
            password: encryptedPassword
        };
        yield userRepository.create(userData);
    });
}
exports.createUser = createUser;
;
function login(data) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userRepository.getUserByEmail(data.email);
        if (!user)
            throw { type: 'not_found', message: 'email is not cadastred yet' };
        const comparePasswords = bcrypt_1.default.compareSync(data.password, user.password);
        if (!comparePasswords) {
            throw { type: 'unauthorized' };
        }
        const tokenData = { userId: user.id };
        const SECRET = (_a = process.env.TOKEN_SECRET_KEY) !== null && _a !== void 0 ? _a : '';
        const EXPIRES_IN = (_b = process.env.TOKEN_EXPIRES_IN) !== null && _b !== void 0 ? _b : '';
        const jwtConfig = {
            expiresIn: EXPIRES_IN
        };
        const token = jsonwebtoken_1.default.sign(tokenData, SECRET, jwtConfig);
        return token;
    });
}
exports.login = login;
;
