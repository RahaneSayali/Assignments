import { Customer } from "../models/Customer";
import { SOWPaymentPlan } from "../models/SOWpaymentplan";
import { SOWPaymentPlanItem } from "../models/SOWLineitems";

export const getSOWPayPlanByForCustomer = async (CustomerId: number) => {
  const customer = await Customer.findByPk(CustomerId);
  if (!customer) {
    throw new Error("Customer not found");
  }

  const sowPayPlan = await SOWPaymentPlan.findAll({
    where: { CustomerId },
    include: [
      {
        model: SOWPaymentPlanItem,
        required: false,
      },
    ],
    order: [["PlannedInvoiceDate", "ASC"]],
  });

  if (sowPayPlan.length === 0) {
    throw new Error("NO SOW PAY PLAN FOUND");
  }
  return { sowPayPlan };
};
