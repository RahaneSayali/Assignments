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
exports.getSOWPayPlanByForCustomer = void 0;
const Customer_1 = require("../models/Customer");
const SOWpaymentplan_1 = require("../models/SOWpaymentplan");
const SOWLineitems_1 = require("../models/SOWLineitems");
const getSOWPayPlanByForCustomer = (CustomerId) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield Customer_1.Customer.findByPk(CustomerId);
    if (!customer) {
        throw new Error("Customer not found");
    }
    const sowPayPlan = yield SOWpaymentplan_1.SOWPaymentPlan.findAll({
        where: { CustomerId },
        include: [
            {
                model: SOWLineitems_1.SOWPaymentPlanItem,
                required: false,
            },
        ],
        order: [["PlannedInvoiceDate", "ASC"]],
    });
    if (sowPayPlan.length === 0) {
        throw new Error("NO SOW PAY PLAN FOUND");
    }
    return { sowPayPlan };
});
exports.getSOWPayPlanByForCustomer = getSOWPayPlanByForCustomer;
