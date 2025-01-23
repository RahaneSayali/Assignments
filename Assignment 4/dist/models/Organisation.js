"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
class Organization extends sequelize_1.Model {
}
exports.Organization = Organization;
Organization.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    gstNo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    panNo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    legalOrganizationName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    invoiceTemplateId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    shortName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    contactName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    displayName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    addressId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "organizations",
});
