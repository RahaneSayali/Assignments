"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
class Customer extends sequelize_1.Model {
}
exports.Customer = Customer;
Customer.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    msaValidFrom: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    msaValidUpto: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    legalName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ndaSignedOn: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    shortName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ndaValidFrom: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    ndaValidUpto: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    addressId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    displayName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isNDASigned: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isMSASigned: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    msaSignedOn: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: db_1.default,
    tableName: "customers",
});
