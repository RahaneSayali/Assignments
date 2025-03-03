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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.regUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";
const regUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield UserModel_1.default.findOne({ where: { email } });
        if (existingUser) {
            return {
                error: "User with this email already exists",
            };
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield UserModel_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jsonwebtoken_1.default.sign({
            userId: newUser.id,
            email: newUser.email,
        }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        return {
            message: "User created successfully",
            userId: newUser.id,
            token,
        };
    }
    catch (error) {
        console.error("Registration failed: ", error);
        return {
            error: error.message || "reg falied",
        };
    }
});
exports.regUser = regUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findOne({ where: { email } });
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: "user" }, SECRET_KEY, {
            expiresIn: "1h",
        });
        return { message: "Login successful", token };
    }
    catch (error) {
        throw new Error("Login failed: " + error);
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=userService.js.map