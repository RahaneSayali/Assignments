"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOW = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
const Customer_1 = require("./Customer");
class SOW extends sequelize_1.Model {
}
exports.SOW = SOW;
SOW.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    InvoiceEmailAddresses: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    customerId: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: Customer_1.Customer,
            key: 'id',
        },
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
    customerSoNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ValidityFrom: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ValidityUpto: {
        type: sequelize_1.DataTypes.STRING,
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
}, {
    sequelize: db_1.default,
    tableName: 'sows',
});
