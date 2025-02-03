"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
class Payment extends sequelize_1.Model {
}
exports.Payment = Payment;
Payment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    PaymentDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    Amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    Currency: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "INR",
    },
    InvoiceId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    isFullPayment: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "Payments",
    timestamps: true,
});
exports.default = Payment;
