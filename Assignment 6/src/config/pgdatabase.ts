import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: "postgres",
  host: process.env.DB_HOST,
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

connectDB();
export default sequelize;
