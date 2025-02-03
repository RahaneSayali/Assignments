import { Model, DataTypes } from "sequelize";
import sequelize from "../database/db";
import { Customer } from "./Customer";
import { SOWPaymentPlan } from "./SOWpaymentplan";
import { Payment } from "./Payment";

export class Invoice extends Model {
  public id!: number;
  public totalInvoiceValue!: number;
  public sowId!: number;
  public status!: "Drafted" | "Cancelled" | "Approved";
  public invoiceSentOn!: Date;
  public customerId!: number;
  public paymentReceivedOn!: Date | null;
  public invoiceVersionNo!: number;
  public paymentId!: number | null;
  public invoiceAmount!: number;
  public invoiceTaxAmount!: number;
}

Invoice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    totalInvoiceValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sowId: {
      type: DataTypes.INTEGER,
      references: {
        model: SOWPaymentPlan,
        key: "id",
      },
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Drafted", "Cancelled", "Approved"),
      defaultValue: "Drafted",
      allowNull: false,
    },
    invoiceSentOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Customer,
        key: "id",
      },
      allowNull: false,
    },
    paymentReceivedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    invoiceVersionNo: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    paymentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Payment,
        key: "id",
      },
      allowNull: true,
    },
    invoiceAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    invoiceTaxAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Invoice",
    tableName: "invoices",
    timestamps: true,
  }
);
