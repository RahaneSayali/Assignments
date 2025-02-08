import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface BookAttributes {
  id: string;
  bookCode: string;
  title: string;
  description?: string;
  publishedYear: number;
  price: number;
  externalId?: string;
}

interface BookCreationAttributes
  extends Optional<BookAttributes, "id" | "description" | "externalId"> {}

class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  public id!: string;
  public bookCode!: string;
  public title!: string;
  public description?: string;
  public publishedYear!: number;
  public price!: number;
  public externalId?: string;
}
Book.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    bookCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

    title: {
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
      unique: true,
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
