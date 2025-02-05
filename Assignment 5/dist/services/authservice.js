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
exports.loginEmployee = void 0;
const EmpModel_1 = __importDefault(require("../models/EmpModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const ShiftModel_1 = require("../models/ShiftModel");
(0, dotenv_1.config)();
const SECRET_KEY = process.env.JWT_SECRET || "default-secret-key";
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
    // console.log("Employee ID Type:", typeof employee.id);
    // console.log("Employee ID Value:", employee.id);
    const shift = yield ShiftModel_1.Shift.create({
        employeeId: employee.id,
        startTime: new Date(),
        actualHours: 0,
    });
    return { token, employee, shift };
});
exports.loginEmployee = loginEmployee;
