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
exports.createTimesheetController = void 0;
const TimeSheetService_1 = require("../services/TimeSheetService");
const ShiftModel_1 = __importDefault(require("../models/ShiftModel"));
const createTimesheetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectName, taskName, fromDate, toDate, duration } = req.body;
        const employeeId = req.employee.id;
        if (!employeeId) {
            res.status(400).json({ error: "Employee not authenticated" });
            return;
        }
        const ongoingShift = yield ShiftModel_1.default.findOne({
            where: { employeeId, endTime: null },
        });
        if (!ongoingShift) {
            res
                .status(400)
                .json({ error: "No active shift found for this employee" });
            return;
        }
        const newTimesheet = yield (0, TimeSheetService_1.createTimeSheet)({
            employeeId,
            shiftId: ongoingShift.id,
            projectName,
            taskName,
            fromDate,
            toDate,
            duration,
        });
        res.status(201).json({
            message: "Timesheet entry created successfully",
            timesheet: newTimesheet,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        return;
    }
});
exports.createTimesheetController = createTimesheetController;
