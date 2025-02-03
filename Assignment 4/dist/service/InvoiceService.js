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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInvoiceStatus = exports.createInvoice = void 0;
const Invoice_1 = require("../models/Invoice");
const SOWpaymentplan_1 = require("../models/SOWpaymentplan");
const createInvoice = (customerId, totalValue) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the associated SOWPaymentPlan, or if needed, a default value for sowId
    const sowPaymentPlan = yield SOWpaymentplan_1.SOWPaymentPlan.findOne({
        where: { CustomerId: customerId }, // Assuming you can fetch it this way, adjust based on your logic
    });
    if (!sowPaymentPlan) {
        throw new Error("SOW Payment Plan not found for the customer");
    }
    // Invoice fields
    const invoiceAmount = totalValue * 0.9; // Just an example, calculate this based on your logic
    const invoiceTaxAmount = totalValue * 0.1; // Example, adjust tax calculation
    return yield Invoice_1.Invoice.create({
        customerId: customerId,
        sowId: sowPaymentPlan.id, // Associating with the SOW Payment Plan
        totalInvoiceValue: totalValue,
        status: "Drafted",
        invoiceSentOn: new Date(),
        invoiceAmount: invoiceAmount,
        invoiceTaxAmount: invoiceTaxAmount,
        paymentReceivedOn: null, // Initially, no payment is received
        invoiceVersionNo: 1, // Starting with version 1
        paymentId: null, // No payment ID initially
    });
});
exports.createInvoice = createInvoice;
const updateInvoiceStatus = (invoiceId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const invoice = yield Invoice_1.Invoice.findByPk(invoiceId);
    if (!invoice)
        throw new Error("Invoice not found");
    invoice.status = status;
    yield invoice.save();
    return invoice;
});
exports.updateInvoiceStatus = updateInvoiceStatus;
