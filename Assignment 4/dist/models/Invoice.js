"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
const Customer_1 = require("./Customer");
const SOWpaymentplan_1 = require("./SOWpaymentplan");
const Payment_1 = require("./Payment");
class Invoice extends sequelize_1.Model {
}
exports.Invoice = Invoice;
Invoice.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    totalInvoiceValue: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    sowId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: SOWpaymentplan_1.SOWPaymentPlan,
            key: "id",
        },
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("Drafted", "Cancelled", "Approved"),
        defaultValue: "Drafted",
        allowNull: false,
    },
    invoiceSentOn: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    customerId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Customer_1.Customer,
            key: "id",
        },
        allowNull: false,
    },
    paymentReceivedOn: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    invoiceVersionNo: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
    paymentId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Payment_1.Payment,
            key: "id",
        },
        allowNull: true,
    },
    invoiceAmount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    invoiceTaxAmount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: "Invoice",
    tableName: "invoices",
    timestamps: true,
});
