import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { v4 as uuidv4 } from "uuid";
import Employee from "./EmpModel";
import Shift from "./ShiftModel";

export interface TimeSheetAttributes {
  id?: string;
  employeeId: string;
  shiftId: string;
  projectName: string;
  taskName: string;
  fromDate: Date;
  toDate: Date;
  duration: number;
}

export class Timesheet
  extends Model<TimeSheetAttributes>
  implements TimeSheetAttributes
{
  public id!: string;
  public employeeId!: string;
  public shiftId!: string;
  public projectName!: string;
  public taskName!: string;
  public fromDate!: Date;
  public toDate!: Date;
  public duration!: number;
}

Timesheet.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    shiftId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fromDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    toDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Timesheet", tableName: "timesheets" }
);

export default Timesheet;
