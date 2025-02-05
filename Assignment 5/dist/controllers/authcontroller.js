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
exports.logout = exports.login = exports.register = void 0;
const authservice_1 = require("../services/authservice");
const createEmp_1 = require("../services/createEmp");
const ShiftModel_1 = __importDefault(require("../models/ShiftModel"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, assignedShiftHours, role } = req.body;
        const employee = yield (0, createEmp_1.createEmployee)(name, email, password, assignedShiftHours, role);
        res
            .status(201)
            .json({ message: "Employee registered successfully", employee });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { token, employee, shift } = yield (0, authservice_1.loginEmployee)(email, password);
        res
            .status(200)
            .json({ message: "Login successful", token, employee, shift });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.employee) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(400).json({ message: "No employee ID found" });
            return;
        }
        const shift = yield ShiftModel_1.default.findOne({
            where: { employeeId: userId, endTime: null },
        });
        if (!shift) {
            res.status(400).json({ error: "Employee is not on a shift" });
            return;
        }
        const endTime = new Date();
        const startTime = new Date(shift.startTime);
        const actualHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        yield shift.update({ endTime, actualHours });
        res
            .status(200)
            .json({
            message: "Employee logged out successfully",
            endTime,
            actualHours,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
exports.logout = logout;
