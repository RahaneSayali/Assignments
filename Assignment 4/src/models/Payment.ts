import { Model, DataTypes } from "sequelize";
import sequelize from "../database/db";
import { Invoice } from "./Invoice";
export class Payment extends Model {
  public id!: number;
  public PaymentDate!: Date;
  public Amount!: number;
  public Currency!: string;
  public InvoiceId!: number;
  public isFullPayment!: boolean;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    PaymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "INR",
    },
    InvoiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isFullPayment: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "Payments",
    timestamps: true,
  }
);

export default Payment;
