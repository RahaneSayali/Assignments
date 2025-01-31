"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOWPaymentPlanItem = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
class SOWPaymentPlanItem extends sequelize_1.Model {
}
exports.SOWPaymentPlanItem = SOWPaymentPlanItem;
SOWPaymentPlanItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sowPaymentPlanId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    sowId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    orderId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    particular: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    rate: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    unit: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    total: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db_1.default,
    tableName: "sow_payment_plan_items",
});
