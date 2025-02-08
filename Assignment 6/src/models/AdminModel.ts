import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../config/db";

interface AdminAtrritutes {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface AdminCreationAtrri extends Optional<AdminAtrritutes, "id"> {}

class Admin
  extends Model<AdminAtrritutes, AdminCreationAtrri>
  implements AdminAtrritutes
{
  id!: string;
  name!: string;
  email!: string;
  password!: string;
}

Admin.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Admins",
    timestamps: true,
  }
);

export default Admin;
