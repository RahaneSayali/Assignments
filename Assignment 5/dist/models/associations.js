"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmpModel_1 = __importDefault(require("./EmpModel"));
const ShiftModel_1 = __importDefault(require("./ShiftModel"));
const TimeSheetModel_1 = __importDefault(require("./TimeSheetModel"));
const defineAssociations = () => {
    TimeSheetModel_1.default.belongsTo(EmpModel_1.default, {
        foreignKey: "employeeId",
        as: "employee",
    });
    TimeSheetModel_1.default.belongsTo(ShiftModel_1.default, {
        foreignKey: "shiftId",
        as: "shift",
    });
    ShiftModel_1.default.hasMany(TimeSheetModel_1.default, {
        foreignKey: "shiftId",
        as: "timesheets",
    });
};
exports.default = defineAssociations;
