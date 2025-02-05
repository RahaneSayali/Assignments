"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shift = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const uuid_1 = require("uuid");
class Shift extends sequelize_1.Model {
}
exports.Shift = Shift;
Shift.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: (0, uuid_1.v4)(),
        primaryKey: true,
    },
    employeeId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    startTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    actualHours: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, { sequelize: db_1.default, modelName: "shift" });
exports.default = Shift;
