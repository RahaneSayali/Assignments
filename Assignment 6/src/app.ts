import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use("/api/auth");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
