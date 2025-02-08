import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Book from "./Books";

interface AuthorAttributes {
  id: string;
  name: string;
  bio?: string;
  birthdate?: Date;
  isSystemUser: boolean;
}

interface AuthorCreationAttributes
  extends Optional<AuthorAttributes, "id" | "bio" | "birthdate"> {}

class Author
  extends Model<AuthorAttributes, AuthorCreationAttributes>
  implements AuthorAttributes
{
  public id!: string;
  public name!: string;
  public bio?: string;
  public birthdate?: Date;
  public isSystemUser!: boolean;
}
Author.init(
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
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isSystemUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Author",
    tableName: "Authors",
    timestamps: true,
  }
);

export default Author;
