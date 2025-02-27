import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/pgdatabase";

interface PaymentAttributes {
  id: string;
  userId: string;
  bookId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt: Date;
}

interface PaymentCreationAttributes
  extends Optional<PaymentAttributes, "id" | "createdAt"> {}

class Payment
  extends Model<PaymentAttributes, PaymentCreationAttributes>
  implements PaymentAttributes
{
  public id!: string;
  public userId!: string;
  public bookId!: string;
  public amount!: number;
  public status!: "pending" | "completed" | "failed";
  public createdAt!: Date;
}

Payment.init(
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
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "Payments",
    timestamps: true,
  }
);

export default Payment;
