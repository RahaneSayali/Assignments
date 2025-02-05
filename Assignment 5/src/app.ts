import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/authroutes";
import sequelize from "./config/db";
import Employee from "./models/EmpModel";
import defineAssociations from "./models/associations";
defineAssociations();

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.use("/api/auth", routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

export default app;
