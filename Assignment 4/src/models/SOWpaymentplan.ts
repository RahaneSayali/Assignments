import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { SOW } from "./SOWManage";
import { Customer } from "./Customer";

interface SOWPaymentPlanContent {
  id?: number;
  sowId: number;
  CustomerId: number;
  PlannedInvoiceDate: Date;
  TotalActualAmount: number;
}

class SOWPaymentPlan
  extends Model<SOWPaymentPlanContent>
  implements SOWPaymentPlanContent
{
  public id!: number;
  public sowId!: number;
  public CustomerId!: number;
  public PlannedInvoiceDate!: Date;
  public TotalActualAmount!: number;
}
SOWPaymentPlan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    sowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CustomerId: {
      type: DataTypes.INTEGER,
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
