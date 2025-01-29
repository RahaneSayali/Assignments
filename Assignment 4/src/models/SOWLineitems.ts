import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { SOWPaymentPlan } from "./SOWpaymentplan";

interface SOWPayLineItemContent {
  id?: number;
  sowPaymentPlanId: string;
  sowId: string;
  orderId: string;
  particular: string;
  rate: number;
  unit: String;
  total: number;
}
class SOWPaymentPlanItem
  extends Model<SOWPayLineItemContent>
  implements SOWPayLineItemContent
{
  public id!: number;
  public sowPaymentPlanId!: string;
  public sowId!: string;
  public orderId!: string;
  public particular!: string;
  public rate!: number;
  public unit!: string;
  public total!: number;
}

SOWPaymentPlanItem.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    sowPaymentPlanId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sowId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    particular: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "sow_payment_plan_items",
  }
);

export { SOWPayLineItemContent };
