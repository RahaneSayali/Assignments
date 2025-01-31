import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { SOWPaymentPlan } from "./SOWpaymentplan";

interface SOWPayLineItemContent {
  id?: number;
  sowPaymentPlanId: number;
  sowId: number;
  orderId: string;
  particular: string;
  rate: number;
  unit: string;
  total: number;
  status: string;
}
class SOWPaymentPlanItem
  extends Model<SOWPayLineItemContent>
  implements SOWPayLineItemContent
{
  find(arg0: (item: any) => boolean) {
    throw new Error("Method not implemented.");
  }
  public id!: number;
  public sowPaymentPlanId!: number;
  public sowId!: number;
  public orderId!: string;
  public particular!: string;
  public rate!: number;
  public unit!: string;
  public total!: number;
  public status!: string;
}

SOWPaymentPlanItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sowPaymentPlanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sowId: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "sow_payment_plan_items",
  }
);

export { SOWPaymentPlanItem };
