import express from "express";
import {
  generateInvoice,
  changeInvoiceStatus,
} from "../controllers/InvoiceController";
import { makePayment } from "../controllers/PaymentController";

const router = express.Router();

// Invoice Routes
router.post("/invoice", generateInvoice);
router.patch("/invoice/:invoiceId/status", changeInvoiceStatus);

// Payment Routes
router.post("/payment", makePayment);

export default router;
