import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { v4 as uuidv4 } from "uuid";

export interface ShiftAttributes {
  id?: string;
  employeeId: number;
  startTime: Date;
  endTime: Date | null;
  actualHours: number;
}

export class Shift extends Model<ShiftAttributes> implements ShiftAttributes {
  public id!: string;
  public employeeId!: number;
  public startTime!: Date;
  public endTime!: Date;
  public actualHours!: number;
}
Shift.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4(),
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    actualHours: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { sequelize, modelName: "shift" }
);
export default Shift;
