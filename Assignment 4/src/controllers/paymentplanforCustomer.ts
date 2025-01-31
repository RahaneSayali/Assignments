import { Request, Response } from "express";
import { getSOWPayPlanByForCustomer } from "../service/getpaymentplanCustomer";
import { Customer } from "../models/Customer";
import { SOWPaymentPlanItem } from "../models/SOWLineitems";
import { SOWPaymentPlan } from "../models/SOWpaymentplan";

export const getSOWPaymentPlans = async (req: Request, res: Response) => {
  const { customerId } = req.params;

  try {
    const sowPaymentPlans = await getSOWPayPlanByForCustomer(
      Number(customerId)
    );
    res.status(200).json({ sowPaymentPlans });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: " error fetching payment plans" });
    }
  }
};

export const updateInvoice = async (req: Request, res: Response) => {
  const { sowPaymentPlanItemId } = req.params;
  const { status } = req.body;
  console.log(sowPaymentPlanItemId, status);
  try {
    const sowPaymentPlanItem = await SOWPaymentPlanItem.findByPk(
      sowPaymentPlanItemId,

      {
        include: [
          {
            model: SOWPaymentPlan,
            // : "sowPaymentPlan",
            include: [{ model: Customer }],
          },
        ],
      }
    );
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
    await sowPaymentPlanItem.save();

    res.status(200).json({
      message: "Invoice status updated successfully",
      sowPaymentPlanItem,
    });
  } catch (error) {
    console.error("Error updating invoice status:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
