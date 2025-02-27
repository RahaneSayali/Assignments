import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../config/pgdatabase";

interface UserAtrritutes {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Sequelize auto-generates the UUID, so you don’t need to provide an id in the request.
// TypeScript doesn’t know this by default and would require an id unless we explicitly mark it as optional.
// Optional<AdminAttributes, 'id'> tells TypeScript that id is optional only when creating a new Admin but required in other cases (fetching, updating).

interface UserCreationAtrri extends Optional<UserAtrritutes, "id"> {}

class User
  extends Model<UserAtrritutes, UserCreationAtrri>
  implements UserAtrritutes
{
  id!: string;
  name!: string;
  email!: string;
  password!: string;
}

User.init(
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
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: true,
  }
);

export default User;
