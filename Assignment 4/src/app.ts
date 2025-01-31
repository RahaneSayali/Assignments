import express, { Request, Response, NextFunction } from "express";
import authRoutes from "./routes/auth";
import bodyParser from "body-parser";
import "./models/associations";
import sowRoutes from "./routes/sowRoutes";
import { verifyAuth } from "./middlewares/authmiddleware";

const app = express();
const PORT = 8001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use("/auth", authRoutes);

app.use("/api/sow", verifyAuth, sowRoutes);
app.use("/api/reminders", verifyAuth, sowRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
