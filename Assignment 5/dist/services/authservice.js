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
exports.loginEmployee = exports.registerEmployee = void 0;
const EmpModel_1 = __importDefault(require("../models/EmpModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const uuid_1 = require("uuid");
(0, dotenv_1.config)();
const SECRET_KEY = process.env.JWT_SECRET || "default-secret-key";
const registerEmployee = (name, email, password, assignedShiftHours, role) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEmployee = yield EmpModel_1.default.findOne({ where: { email } });
    if (existingEmployee)
        throw new Error("Employee already exists.");
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const employee = yield EmpModel_1.default.create({
        id: (0, uuid_1.v4)(),
        name,
        email,
        password: hashedPassword,
        assignedShiftHours,
        role,
    });
    return employee;
});
exports.registerEmployee = registerEmployee;
const loginEmployee = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield EmpModel_1.default.findOne({ where: { email } });
    if (!employee)
        throw new Error("Invalid credentials");
    const isMatch = yield bcryptjs_1.default.compare(password, employee.password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ id: employee.id, role: employee.role }, SECRET_KEY, {
        expiresIn: "1d",
    });
    return { token, employee };
});
exports.loginEmployee = loginEmployee;
