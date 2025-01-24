import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { Customer } from "./Customer";

interface SOWContents {
  id: number;
  InvoiceEmailAddresses: string[];
  customerId: string;
  customerPoNumber: string;
  title: string;
  customerSoWNumber: string;
  ValidityFrom: Date;
  ValidityUpto: Date;
  totalValue: number;
  currency: string;
}

class SOW extends Model<SOWContents> implements SOWContents {
  public id!: number;
  public InvoiceEmailAddresses!: string[];
  public customerId!: string;
  public customerPoNumber!: string;
  public title!: string;
  public customerSoWNumber!: string;
  public ValidityFrom!: Date;
  public ValidityUpto!: Date;
  public totalValue!: number;
  public currency!: string;
}

SOW.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
    },

    InvoiceEmailAddresses: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    customerId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    customerPoNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerSoWNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ValidityFrom: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ValidityUpto: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "sows",
  }
);
export { SOW };
