"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOW = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
class SOW extends sequelize_1.Model {
}
exports.SOW = SOW;
SOW.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    InvoiceEmailAddresses: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    customerId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    customerPoNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    customerSoWNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ValidityFrom: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    ValidityUpto: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    totalValue: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    currency: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db_1.default,
    tableName: "sows",
});
