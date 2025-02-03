import { Model, DataTypes } from "sequelize";
import sequelize from "../database/db";
import { Invoice } from "./Invoice";

export class InvoiceLineItem extends Model {
  public id!: number;
  public InvoiceId!: number;
  public OrderNo!: string;
  public Particular!: string;
  public Rate!: number;
  public Unit!: string;
  public Total!: number;
}

InvoiceLineItem.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    InvoiceId: { type: DataTypes.INTEGER, allowNull: false },
    OrderNo: { type: DataTypes.STRING, allowNull: false },
    Particular: { type: DataTypes.STRING, allowNull: false },
    Rate: { type: DataTypes.FLOAT, allowNull: false },
    Unit: { type: DataTypes.STRING, allowNull: false },
    Total: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize,
    tableName: "InvoiceLineItems",
  }
);

InvoiceLineItem.belongsTo(Invoice, { foreignKey: "InvoiceId" });
export default InvoiceLineItem;
