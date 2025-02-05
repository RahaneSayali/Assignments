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
exports.ShiftService = void 0;
const ShiftModel_1 = require("../models/ShiftModel");
class ShiftService {
    static startShift(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingShift = yield ShiftModel_1.Shift.findOne({
                where: {
                    employeeId,
                    endTime: null,
                },
            });
            if (existingShift) {
                throw new Error("You already have an active shift");
            }
            // Create a new shift
            const shift = yield ShiftModel_1.Shift.create({
                employeeId,
                startTime: new Date(),
                endTime: null,
                actualHours: 0,
            });
            return shift;
        });
    }
    // End an active shift for an employee and calculate actual hours worked
    static endShift(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const shift = yield ShiftModel_1.Shift.findOne({
                where: {
                    employeeId,
                    endTime: null, // Only close the current active shift
                },
            });
            if (shift) {
                const endTime = new Date();
                const startTime = shift.startTime;
                const actualHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // Calculate hours
                // Update the shift with the end time and actual hours worked
                yield shift.update({
                    endTime,
                    actualHours,
                });
                return shift;
            }
            throw new Error("No active shift found");
        });
    }
}
exports.ShiftService = ShiftService;
