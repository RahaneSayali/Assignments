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
exports.registerEmployeeController = void 0;
const createEmp_1 = require("../services/createEmp");
const registerEmployeeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, assignedShiftHours, role } = req.body;
    try {
        const employee = yield (0, createEmp_1.createEmployee)(name, email, password, assignedShiftHours, role);
        res.status(201).json({
            message: "Employee created successfully",
            employee,
        });
    }
    catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
});
exports.registerEmployeeController = registerEmployeeController;
