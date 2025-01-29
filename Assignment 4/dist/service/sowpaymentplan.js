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
exports.createSOWPaymentPlan = void 0;
const SOWManage_1 = require("../models/SOWManage");
const SOWpaymentplan_1 = require("../models/SOWpaymentplan");
const createSOWPaymentPlan = (sowId, PlannedInvoiceDate, TotalActualAmount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the SOW by its ID (assuming the SOW model is set up and contains CustomerId)
        console.log("sowId passed:", sowId); // Check the value being passed
        if (isNaN(sowId) || sowId <= 0) {
            throw new Error("Invalid SOW ID provided");
        }
        if (isNaN(TotalActualAmount) || TotalActualAmount < 0) {
            throw new Error("Invalid Total Actual Amount provided");
        }
        const sow = yield SOWManage_1.SOW.findByPk(sowId);
        if (!sow) {
            throw new Error("SOW not found");
        }
        const customerId = sow.customerId;
        const paymentPlan = yield SOWpaymentplan_1.SOWPaymentPlan.create({
            sowId,
            PlannedInvoiceDate,
            TotalActualAmount,
            CustomerId: customerId, // Automatically associate the customer
        });
        return paymentPlan;
    }
    catch (error) {
        console.error("Error creating payment plan:", error);
        throw new Error("Error creating payment plan");
    }
});
exports.createSOWPaymentPlan = createSOWPaymentPlan;
