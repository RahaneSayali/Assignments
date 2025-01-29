import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { Customer } from "./Customer";
import { Organization } from "./Organisation";

interface SOWContents {
  id?: number;
  InvoiceEmailAddresses: string[];
  customerId: number;
  customerPoNumber: string;
  title: string;
  customerSoWNumber: string;
  ValidityFrom: Date;
  ValidityUpto: Date;
  totalValue: number;
  currency: string;
  description: string;
}

class SOW extends Model<SOWContents> implements SOWContents {
  public id!: number;
  public InvoiceEmailAddresses!: string[];
  public customerId!: number;
  public customerPoNumber!: string;
  public title!: string;
  public customerSoWNumber!: string;
  public ValidityFrom!: Date;
  public ValidityUpto!: Date;
  public totalValue!: number;
  public currency!: string;
  public description!: string;
}

SOW.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    InvoiceEmailAddresses: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    customerId: {
      type: DataTypes.INTEGER,
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "sows",
  }
);
export { SOW };
