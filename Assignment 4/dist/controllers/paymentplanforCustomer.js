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
exports.updateInvoice = exports.getSOWPaymentPlans = void 0;
const getpaymentplanCustomer_1 = require("../service/getpaymentplanCustomer");
const SOWLineitems_1 = require("../models/SOWLineitems");
const SOWpaymentplan_1 = require("../models/SOWpaymentplan");
const getSOWPaymentPlans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.params;
    try {
        const sowPaymentPlans = yield (0, getpaymentplanCustomer_1.getSOWPayPlanByForCustomer)(Number(customerId));
        res.status(200).json({ sowPaymentPlans });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: " error fetching payment plans" });
        }
    }
});
exports.getSOWPaymentPlans = getSOWPaymentPlans;
const updateInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sowPaymentPlanItemId } = req.params;
    const { status } = req.body;
    console.log(sowPaymentPlanItemId, status);
    try {
        const sowPaymentPlanItem = yield SOWLineitems_1.SOWPaymentPlanItem.findByPk(sowPaymentPlanItemId, {
            include: [
                {
                    model: SOWpaymentplan_1.SOWPaymentPlan,
                    // : "sowPaymentPlan",
                    //include: [{ model: Customer }],
                },
            ],
        });
        console.log("Sow paymentplan data", sowPaymentPlanItem);
        // Log the included associations (SOWPaymentPlan and Customer) to check if they are properly included
        // console.log(
        //   "SOWPaymentPlan Association:",
        //   JSON.stringify(sowPaymentPlanItem?.sowPaymentPlan, null, 2)
        // );
        if (!sowPaymentPlanItem) {
            res.status(404).json({ message: "SOW Payment Plan Item not found" });
            return;
        }
        // const customer = (sowPaymentPlanItem.sowPaymentPlan as SOWPaymentPlan)?.customer;
        //     if (!customer) {
        //       return res.status(404).json({ message: "Customer not found" });
        //     }
        //     if (!(req as any).user || customer.id !== (req as any).user.id) {
        //       return res
        //         .status(403)
        //         .json({ message: "Unauthorized to update this invoice status" });
        //     }
        sowPaymentPlanItem.status = status;
        yield sowPaymentPlanItem.save();
        res.status(200).json({
            message: "Invoice status updated successfully",
            sowPaymentPlanItem,
        });
    }
    catch (error) {
        console.error("Error updating invoice status:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.updateInvoice = updateInvoice;
