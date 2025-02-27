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
exports.loginAdmin = exports.regAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AdminModel_1 = __importDefault(require("../models/AdminModel"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";
const regAdmin = (name, email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingAdmin = yield AdminModel_1.default.findOne({
            where: { email, role: "admin" },
        });
        if (existingAdmin) {
            return {
                error: "User with this email already exists",
            };
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newAdmin = yield AdminModel_1.default.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        const token = jsonwebtoken_1.default.sign({
            userId: newAdmin.id,
            email: newAdmin.email,
        }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        return {
            message: "Admin created successfully",
            adminId: newAdmin.id,
            token,
        };
    }
    catch (error) {
        throw new Error("Admin registration failed: " + error);
    }
});
exports.regAdmin = regAdmin;
const loginAdmin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield AdminModel_1.default.findOne({ where: { email } });
        if (!admin) {
            throw new Error("Admin not found");
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, admin.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
        const token = jsonwebtoken_1.default.sign({ id: admin.id, role: "admin" }, SECRET_KEY, {
            expiresIn: "1h",
        });
        return { message: "Admin login successful", token };
    }
    catch (error) {
        throw new Error("Admin login failed: " + error);
    }
});
exports.loginAdmin = loginAdmin;
//# sourceMappingURL=adminService.js.map