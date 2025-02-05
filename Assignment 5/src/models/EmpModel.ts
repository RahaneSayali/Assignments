import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

interface EmployeeAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  assignedShiftHours: number;
  role: string;
}

class Employee extends Model<EmployeeAttributes> implements EmployeeAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public assignedShiftHours!: number;
  public role!: string;
}
Employee.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assignedShiftHours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Employee", tableName: "employee", timestamps: true }
);
export default Employee;
