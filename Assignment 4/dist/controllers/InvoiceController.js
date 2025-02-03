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
exports.changeInvoiceStatus = exports.generateInvoice = void 0;
const InvoiceService_1 = require("../service/InvoiceService");
const generateInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId, totalValue } = req.body;
        // Generate the invoice
        const invoice = yield (0, InvoiceService_1.createInvoice)(customerId, totalValue);
        res.status(201).json(invoice);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.generateInvoice = generateInvoice;
const changeInvoiceStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { invoiceId } = req.params;
        const { status } = req.body;
        const updatedInvoice = yield (0, InvoiceService_1.updateInvoiceStatus)(Number(invoiceId), status);
        res.status(200).json(updatedInvoice);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.changeInvoiceStatus = changeInvoiceStatus;
