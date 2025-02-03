"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceLineItem = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
const Invoice_1 = require("./Invoice");
class InvoiceLineItem extends sequelize_1.Model {
}
exports.InvoiceLineItem = InvoiceLineItem;
InvoiceLineItem.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    InvoiceId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    OrderNo: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    Particular: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    Rate: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    Unit: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    Total: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
}, {
    sequelize: db_1.default,
    tableName: "InvoiceLineItems",
});
InvoiceLineItem.belongsTo(Invoice_1.Invoice, { foreignKey: "InvoiceId" });
exports.default = InvoiceLineItem;
