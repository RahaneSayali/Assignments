"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InvoiceController_1 = require("../controllers/InvoiceController");
const PaymentController_1 = require("../controllers/PaymentController");
const router = express_1.default.Router();
// Invoice Routes
router.post("/invoice", InvoiceController_1.generateInvoice);
router.patch("/invoice/:invoiceId/status", InvoiceController_1.changeInvoiceStatus);
// Payment Routes
router.post("/payment", PaymentController_1.makePayment);
exports.default = router;
