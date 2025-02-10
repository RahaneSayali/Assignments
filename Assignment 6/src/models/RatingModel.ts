import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface RatingAttributes {
  id: string;
  userId: string;
  bookId: string;
  rating: number;
}

interface RatingCreationAttributes extends Optional<RatingAttributes, "id"> {}

class Rating
  extends Model<RatingAttributes, RatingCreationAttributes>
  implements RatingAttributes
{
  public id!: string;
  public userId!: string;
  public bookId!: string;
  public rating!: number;
}

Rating.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    sequelize,
    modelName: "Rating",
    tableName: "Ratings",
    timestamps: true,
  }
);

export default Rating;
