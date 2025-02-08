import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { authenticate } from "./middlewares/auth";
import { authRouter } from "./routes/authRoutes";
import {bookRouter} from "./routes/bookRoutes";
dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/Books",bookRouter)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
