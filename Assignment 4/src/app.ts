import express, { Request, Response, NextFunction } from "express";
import authRoutes from "./routes/auth";
import bodyParser from "body-parser";
import "./models/associations";
import sowRoutes from "./routes/sowRoutes";
import { verifyAuth } from "./middlewares/authmiddleware";
import invoiceRoutes from "./routes/InvoiceRoutes"; // Import Invoice Routes

const app = express();
const PORT = 8001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use("/auth", authRoutes);

app.use("/api/sow", verifyAuth, sowRoutes);
app.use("/api/reminders", verifyAuth, sowRoutes);

app.use("/api/invoices", verifyAuth, invoiceRoutes);
//app.use("/api/payments", verifyAuth, paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
