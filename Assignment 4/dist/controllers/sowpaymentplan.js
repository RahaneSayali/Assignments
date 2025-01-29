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
exports.createPaymentPlan = void 0;
const sowpaymentplan_1 = require("../service/sowpaymentplan");
const createPaymentPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sowId } = req.params;
    const { plannedInvoiceDate, totalActualAmount } = req.body;
    try {
        const parsedSowId = Number(sowId);
        if (isNaN(parsedSowId) || parsedSowId <= 0) {
            res.status(400).json({ message: "Invalid sowId provided" });
            return;
        }
        // Validate totalActualAmount
        if (isNaN(totalActualAmount) || totalActualAmount <= 0) {
            res.status(400).json({ message: "Invalid Total Actual Amount provided" });
            return;
        }
        if (isNaN(Date.parse(plannedInvoiceDate))) {
            res
                .status(400)
                .json({ message: "Invalid Planned Invoice Date provided" });
            return;
        }
        const paymentPlan = yield (0, sowpaymentplan_1.createSOWPaymentPlan)(parsedSowId, new Date(plannedInvoiceDate), // Ensure the date is properly formatted
        totalActualAmount);
        res.status(201).json({
            message: "Payment plan created successfully!",
            data: paymentPlan,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "unknown error" });
        }
    }
});
exports.createPaymentPlan = createPaymentPlan;
