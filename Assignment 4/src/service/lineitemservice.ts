import { SOWPaymentPlanItem } from "../models/SOWLineitems";
import { SOW } from "../models/SOWManage";
import { SOWPaymentPlan } from "../models/SOWpaymentplan";

export const createLineItemService = async (
  sowPaymentPlanId: number,
  sowId: number,
  orderId: string,
  particular: string,
  rate: number,
  unit: string,
  total: number
) => {
  try {
    console.log("Received sowPaymentPlanId:", sowPaymentPlanId);

    const sowPaymentPlan = await SOWPaymentPlan.findByPk(sowPaymentPlanId);
 
    console.log("SOWPaymentPlan found:", sowPaymentPlan);

    if (!sowPaymentPlan) {
      throw new Error("SOWPaymentPlan not found");
    }
    const sowId = sowPaymentPlan.sowId;

    const LineItem = await SOWPaymentPlanItem.create({
      sowPaymentPlanId,
      sowId,
      orderId,
      particular,
      rate,
      unit,
      total,
    });

    return LineItem;
  } catch (error) {
    console.error("Error creating line item:", error);
    throw new Error("Error creating line item");
  }
};
