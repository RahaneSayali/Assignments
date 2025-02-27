import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/pgdatabase";

interface BookAttributes {
  id: string;
  uId: string;
  bookCode: string;
  title: string;
  author: string;
  description?: string;
  publishedYear: number;
  price: number;
  externalId?: string;
  version: number;
  isActive: boolean;
  archived: boolean;
}

interface BookCreationAttributes
  extends Optional<BookAttributes, "id" | "description" | "externalId"> {}

class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  public id!: string;
  public uId!: string;
  public bookCode!: string;
  public title!: string;
  public author!: string;
  public description?: string;
  public publishedYear!: number;
  public price!: number;
  public externalId?: string;
  public version!: number;
  public isActive!: boolean;
  public archived!: boolean;
}
Book.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    uId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bookCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    publishedYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    externalId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Book",
    tableName: "Books",
    timestamps: true,
  }
);

export default Book;
