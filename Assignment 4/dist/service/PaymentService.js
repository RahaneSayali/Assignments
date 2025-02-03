"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processPayment = void 0;
const Invoice_1 = require("../models/Invoice");
const Payment_1 = __importDefault(require("../models/Payment"));
const processPayment = (invoiceId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const invoice = yield Invoice_1.Invoice.findByPk(invoiceId);
    if (!invoice)
        throw new Error("Invoice not found");
    const payment = yield Payment_1.default.create({
        InvoiceId: invoiceId,
        Amount: amount,
        PaymentDate: new Date(),
    });
    const totalPaid = yield Payment_1.default.sum("Amount", {
        where: { InvoiceId: invoiceId },
    });
    if (totalPaid >= invoice.totalInvoiceValue) {
        invoice.status = "Approved";
        invoice.paymentReceivedOn = new Date();
        yield invoice.save();
    }
    return payment;
});
exports.processPayment = processPayment;
