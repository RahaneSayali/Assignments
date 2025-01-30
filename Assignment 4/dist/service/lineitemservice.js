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
exports.createLineItemService = void 0;
const SOWLineitems_1 = require("../models/SOWLineitems");
const SOWpaymentplan_1 = require("../models/SOWpaymentplan");
const createLineItemService = (sowPaymentPlanId, sowId, orderId, particular, rate, unit, total) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Received sowPaymentPlanId:", sowPaymentPlanId);
        const sowPaymentPlan = yield SOWpaymentplan_1.SOWPaymentPlan.findByPk(sowPaymentPlanId);
        console.log("SOWPaymentPlan found:", sowPaymentPlan);
        if (!sowPaymentPlan) {
            throw new Error("SOWPaymentPlan not found");
        }
        const sowId = sowPaymentPlan.sowId;
        const LineItem = yield SOWLineitems_1.SOWPaymentPlanItem.create({
            sowPaymentPlanId,
            sowId,
            orderId,
            particular,
            rate,
            unit,
            total,
        });
        return LineItem;
    }
    catch (error) {
        console.error("Error creating line item:", error);
        throw new Error("Error creating line item");
    }
});
exports.createLineItemService = createLineItemService;
