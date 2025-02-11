import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { authRouter } from "./routes/authRoutes";
import { bookRouter } from "./routes/bookRoutes";
import { authorRouter } from "./routes/authorRoutes";
import { reviewRouter } from "./routes/reviewRoutes";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/Books", bookRouter);
app.use("/Authors", authorRouter);
app.use("/Reviews", reviewRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
