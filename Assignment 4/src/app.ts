import express, { Request, Response, NextFunction } from "express";
import authRoutes from "./routes/auth";
import bodyParser from "body-parser";
import "./models/associations";
const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use("/auth", authRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
