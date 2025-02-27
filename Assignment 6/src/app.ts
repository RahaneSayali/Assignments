import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";

import { authRouter } from "./routes/authRoutes";
// import { bookRouter } from "./routes/bookRoutes";
import { BookRouter } from "./routes/bookRoutes";
import { authorRouter } from "./routes/authorRoutes";
import { reviewRouter } from "./routes/reviewRoutes";
import { authenticate } from "./middlewares/auth";
import { container } from "./config/inversify";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

const bookRoutes = container.get<BookRouter>(BookRouter);

app.use("/Books",authenticate, bookRoutes.getRouter());

app.use("/Authors", authorRouter);
app.use("/Reviews", reviewRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
