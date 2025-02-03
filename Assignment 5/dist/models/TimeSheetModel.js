"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Shift extends sequelize_1.Model {
}
Shift.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    employeeId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "employees", key: "id" },
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
    },
}, { sequelize: db_1.default, modelName: "shift" });
exports.default = Shift;
