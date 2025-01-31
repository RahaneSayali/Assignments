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
exports.createLineItem = void 0;
const lineitemservice_1 = require("../service/lineitemservice");
const createLineItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sowId } = req.params;
    const { sowPaymentPlanId, orderId, particular, rate, unit, total, status } = req.body;
    try {
        if (isNaN(Number(sowId)) || Number(sowId) <= 0) {
            res.status(400).json({ message: "Invalid SOW ID provided" });
            return;
        }
        console.log("Received line item data:", req.body);
        const lineItem = yield (0, lineitemservice_1.createLineItemService)(sowPaymentPlanId, Number(sowId), orderId, particular, rate, unit, total, status);
        res.status(201).json({
            message: "Line item created successfully",
            data: lineItem,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: " error creating line items" });
        }
    }
});
exports.createLineItem = createLineItem;
