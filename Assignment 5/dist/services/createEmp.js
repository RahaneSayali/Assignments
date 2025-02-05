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
exports.createEmployee = void 0;
const EmpModel_1 = __importDefault(require("../models/EmpModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const error_1 = require("../utils/error"); // A custom error handler
const createEmployee = (name, email, password, assignedShiftHours, role) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEmployee = yield EmpModel_1.default.findOne({ where: { email } });
    if (existingEmployee) {
        throw new error_1.ErrorHandler(400, "Employee already exists.");
    }
    // Hash the password
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    // Create a new employee
    const employee = yield EmpModel_1.default.create({
        name,
        email,
        password: hashedPassword,
        assignedShiftHours,
        role,
    });
    return employee;
});
exports.createEmployee = createEmployee;
