import { SOW } from "../models/SOWManage";
import { SOWPaymentPlan } from "../models/SOWpaymentplan";

export const createSOWPaymentPlan = async (
  sowId: number,
  PlannedInvoiceDate: Date,
  TotalActualAmount: number
) => {
  try {
    // Fetch the SOW by its ID (assuming the SOW model is set up and contains CustomerId)
    console.log("sowId passed:", sowId); // Check the value being passed

    if (isNaN(sowId) || sowId <= 0) {
      throw new Error("Invalid SOW ID provided");
    }

    if (isNaN(TotalActualAmount) || TotalActualAmount < 0) {
      throw new Error("Invalid Total Actual Amount provided");
    }

    const sow = await SOW.findByPk(sowId);
    if (!sow) {
      throw new Error("SOW not found");
    }

    const customerId = sow.customerId;

    const paymentPlan = await SOWPaymentPlan.create({
      sowId,
      PlannedInvoiceDate,
      TotalActualAmount,
      CustomerId: customerId, // Automatically associate the customer
    });
    return paymentPlan;
  } catch (error) {
    console.error("Error creating payment plan:", error);
    throw new Error("Error creating payment plan");
  }
};
