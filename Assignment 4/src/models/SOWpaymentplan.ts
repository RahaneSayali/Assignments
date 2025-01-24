import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import {SOW} from "./SOWManage";
interface SOWPaymentPlanContent {
  id: number;
  sowId: string;
  CustomerId: string;
  PlannedInvoiceDate: Date;
  TotalActualAmount: number;
}

class SOWPaymentPlan
  extends Model<SOWPaymentPlanContent>
  implements SOWPaymentPlanContent
{
  public id!: number;
  public sowId!: string;
  public CustomerId!: string;
  public PlannedInvoiceDate!: Date;
  public TotalActualAmount!: number;
}
SOWPaymentPlan.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },

    sowId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CustomerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PlannedInvoiceDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    TotalActualAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },

  {
    sequelize,
    tableName: "sow_payment_plans",
  }
);

export { SOWPaymentPlan };
