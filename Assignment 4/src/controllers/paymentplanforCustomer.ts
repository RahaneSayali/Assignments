import { Request, Response } from "express";
import { getSOWPayPlanByForCustomer } from "../service/getpaymentplanCustomer";

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
