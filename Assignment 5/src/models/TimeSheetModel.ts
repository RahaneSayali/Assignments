import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
class Shift extends Model {}

Shift.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "employees", key: "id" },
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
