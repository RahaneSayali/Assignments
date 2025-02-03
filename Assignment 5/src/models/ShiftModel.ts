import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { v4 as uuidv4 } from 'uuid';


interface ShiftAttributes {
    id: string,
    employeeId: string,
    startTime: string,
    endTime: string,
    actualHours: string,
}

class Shift extends Model<ShiftAttributes> implements ShiftAttributes {
    public id !: string
    public employeeId !: string
    public startTime !: string
    public endTime !: string
    public actualHours !: string
}
Shift.init(
  {
    id: {
      type: DataTypes.STRING,
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
    },
  },
  { sequelize, modelName: "shift" }
);
export default Shift;
